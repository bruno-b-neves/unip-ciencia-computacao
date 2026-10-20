"""Prepara o catálogo e os livros disponíveis para o GitHub Pages, sem dependências."""

import argparse
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import tempfile


def build_site(root, output=None):
    root = Path(root).resolve()
    output = Path(output).resolve() if output else root / "_site"
    catalog = json.loads((root / "catalogo.json").read_text(encoding="utf-8"))
    seen = set()
    sources = []
    for book in catalog["books"]:
        path = book["path"]
        parts = PurePosixPath(path).parts
        if (not re.fullmatch(r"[a-z0-9][a-z0-9_/-]*", path)
                or any(part in {".", ".."} for part in parts)
                or not (root / path).resolve().is_relative_to(root)
                or path in seen):
            raise ValueError(f"Pasta de livro inválida ou repetida: {path}")
        seen.add(path)
        semester = book["semester"]
        if semester is not None and (type(semester) is not int or semester < 1):
            raise ValueError(f"Informe um semestre inteiro positivo ou null: {path}")
        if not book.get("title") or not isinstance(book.get("topics"), list):
            raise ValueError(f"Título e assuntos obrigatórios: {path}")
        folder = root / path
        available = (folder / "index.html").is_file()
        book["available"] = available
        book["chapters"] = len(list(folder.glob("roteiro*/README.md"))) if available else 0
        if available:
            sources.append(folder)

    protected = [root / "assets", root / "scripts", root / "tests", *[root / path for path in seen]]
    if (output == root or root.is_relative_to(output)
            or any(output.is_relative_to(path) or path.is_relative_to(output) for path in protected)):
        raise ValueError("A pasta de saída deve ser separada dos arquivos do projeto.")

    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix=".site-build-", dir=output.parent) as temporary:
        stage = Path(temporary) / "site"
        stage.mkdir()
        shutil.copy2(root / "index.html", stage / "index.html")
        shutil.copytree(root / "assets", stage / "assets")
        for folder in sources:
            destination = stage / folder.relative_to(root)
            shutil.copytree(folder, destination, ignore=shutil.ignore_patterns(
                ".git", ".DS_Store", "__pycache__", "*.pyc"))
        (stage / "catalogo.json").write_text(
            json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        (stage / ".nojekyll").touch()
        if output.exists():
            shutil.rmtree(output)
        shutil.move(str(stage), str(output))

    return {"output": str(output), "books": len(catalog["books"]), "available": len(sources)}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, help="Pasta de saída (padrão: _site).")
    arguments = parser.parse_args()
    result = build_site(Path(__file__).resolve().parent.parent, arguments.output)
    print(f"Catálogo preparado: {result['available']} livro(s) disponível(is) "
          f"em {result['books']} disciplinas. Saída: {result['output']}")
