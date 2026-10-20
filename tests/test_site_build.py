"""Verifica a inclusão de livros e a organização do catálogo publicado."""

import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

SPEC = importlib.util.spec_from_file_location(
    "site_build", Path(__file__).resolve().parents[1] / "scripts/build_site.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name) / "repository"
        self.root.mkdir()
        (self.root / "assets").mkdir()
        (self.root / "index.html").write_text("Catálogo", encoding="utf-8")
        self.books = [
            {"path": "primeiro-livro", "title": "Primeiro", "semester": 2, "topics": []},
            {"path": "proximo-livro", "title": "Próximo", "semester": None, "topics": []},
        ]
        ready = self.root / "primeiro-livro"
        (ready / "roteiro01").mkdir(parents=True)
        (ready / "index.html").write_text("Livro", encoding="utf-8")
        (ready / "roteiro01/README.md").write_text("Capítulo", encoding="utf-8")
        (self.root / ".git").mkdir()
        (self.root / ".git/config").write_text("Não publicar", encoding="utf-8")

    def build(self):
        (self.root / "catalogo.json").write_text(json.dumps({"books": self.books}), encoding="utf-8")
        return MODULE.build_site(self.root)

    def test_publish_ready_book_and_keep_draft_without_broken_link(self):
        self.build()
        output = self.root / "_site"
        published = json.loads((output / "catalogo.json").read_text())["books"]
        self.assertTrue(published[0]["available"])
        self.assertEqual(published[0]["chapters"], 1)
        self.assertEqual(published[0]["semester"], 2)
        self.assertFalse(published[1]["available"])
        self.assertFalse((output / "proximo-livro").exists())
        self.assertTrue((output / "primeiro-livro/index.html").is_file())
        self.assertFalse((output / ".git").exists())

    def test_new_book_is_published_without_another_workflow(self):
        self.build()
        folder = self.root / "proximo-livro"
        folder.mkdir()
        (folder / "index.html").write_text("Novo livro", encoding="utf-8")
        result = self.build()
        self.assertEqual(result["available"], 2)
        self.assertTrue((self.root / "_site/proximo-livro/index.html").is_file())

    def test_reject_paths_outside_catalog(self):
        self.books[0]["path"] = "../outro-local"
        with self.assertRaises(ValueError):
            self.build()
        self.assertFalse((self.root / "_site").exists())


if __name__ == "__main__":
    unittest.main()
