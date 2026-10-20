# Publicar e manter a biblioteca de aprendizados

O site tem uma página inicial com o catálogo de disciplinas e uma página independente para cada livro. A publicação é feita por um único fluxo, **Publicar biblioteca de aprendizados**, em `.github/workflows/banco-de-dados-pages.yml`. O nome do arquivo foi mantido para aproveitar o fluxo existente.

## Ativar o GitHub Pages

1. Envie as alterações locais para a branch `main`, incluindo os arquivos da raiz, `assets`, `scripts`, os livros e o workflow.
2. No repositório, abra **Settings → Pages**. Em **Build and deployment → Source**, selecione **GitHub Actions**. Não é necessário configurar outro workflow de Static HTML ou Jekyll.
3. Abra **Actions → Publicar biblioteca de aprendizados → Run workflow**, selecione `main` e execute. Aguarde a conclusão com sucesso.

Endereços previstos após publicar:

- [Catálogo de aprendizados](https://bruno-b-neves.github.io/unip-ciencia-computacao/)
- [Livro de Banco de Dados](https://bruno-b-neves.github.io/unip-ciencia-computacao/banco-de-dados/)

O envio de alterações para `main` atualiza todo o site. Não há uma publicação separada para cada disciplina: todos os livros disponíveis são incluídos no mesmo site, em subpastas. A disponibilidade efetiva depende da execução bem-sucedida do GitHub Actions.

## Organizar por semestre

Edite `catalogo.json`. No campo `semester` de cada disciplina, substitua `null` pelo número do semestre, sem aspas. Exemplo: `"semester": 2` para o segundo semestre. O valor `null` mantém a indicação **Semestre a definir**.

Os livros são agrupados pelo semestre no catálogo, e o filtro acompanha os valores cadastrados. Não é necessário mover as pastas para alterar essa organização.

## Adicionar um novo livro

1. Crie a pasta da disciplina, por exemplo `nova-disciplina`.
2. Coloque um `index.html` funcional nessa pasta, com seus textos, capítulos, imagens e arquivos de navegação. O catálogo não cria o conteúdo do livro automaticamente.
3. Acrescente uma entrada à lista `books` de `catalogo.json`, com `path`, `title`, `semester`, `description` e `topics`. Use como referência uma das entradas existentes e preserve o JSON válido.
4. Inclua um link para `../` na página do livro, permitindo voltar ao catálogo.
5. Envie os arquivos para `main`.

O fluxo inclui automaticamente as pastas cadastradas que tenham `index.html`. Disciplinas sem essa página são mostradas como **Em preparação**, sem um link de leitura que leve a uma página inexistente. A página não depende de o Git rastrear pastas vazias.

Não preencha `available` ou `chapters` manualmente: a preparação do site calcula esses campos. A contagem de roteiros considera as pastas `roteiro*/README.md` de cada livro.

## Prévia local

Na raiz do repositório, execute:

```sh
python3 scripts/build_site.py
python3 -m http.server 8000 --directory _site
```

Abra [a biblioteca local](http://localhost:8000/). Para encerrar o servidor, use `Ctrl+C`. Ao alterar textos ou o catálogo, execute novamente o primeiro comando e atualize o navegador.

`_site` é a saída gerada para publicação e não deve ser editada ou enviada ao Git. O código de preparação usa apenas a biblioteca padrão do Python.

## Livro de Banco de Dados

Os textos continuam nos READMEs de `banco-de-dados/roteiro01` até `roteiro08`. Edite esses arquivos para atualizar os capítulos e mantenha as imagens em `banco-de-dados/images`. Para acrescentar capítulos a esse livro, atualize também sua lista em `banco-de-dados/book/book.js` e a navegação dos READMEs.

## Verificação

Para verificar a seleção dos livros para publicação:

```sh
python3 -m unittest discover -s tests
```

Referência: [GitHub Pages com GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
