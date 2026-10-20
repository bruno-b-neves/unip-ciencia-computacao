(() => {
  'use strict';
  const content = document.getElementById('catalog-content');
  const search = document.getElementById('search');
  const semester = document.getElementById('semester');
  const count = document.getElementById('result-count');
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fold = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const semesterLabel = value => value == null ? 'Semestre a definir' : `${value}º semestre`;
  let books = [];

  function render() {
    const terms = fold(search.value.trim()).split(/\s+/).filter(Boolean);
    const matches = books.filter(book => {
      const text = fold([book.title, book.description, ...book.topics].join(' '));
      return terms.every(term => text.includes(term)) &&
        (semester.value === 'all' || String(book.semester ?? 'undefined') === semester.value);
    });
    const available = matches.filter(book => book.available).length;
    count.textContent = `${matches.length} ${matches.length === 1 ? 'disciplina' : 'disciplinas'} · ${available} ${available === 1 ? 'livro disponível' : 'livros disponíveis'}`;
    if (!matches.length) {
      content.innerHTML = '<div class="empty"><h3>Nenhum caderno por aqui.</h3><p>Tente outro assunto ou selecione todos os semestres.</p></div>';
      return;
    }
    const groups = [...new Set(matches.map(book => book.semester))].sort((a,b) => a == null ? 1 : b == null ? -1 : a-b);
    content.innerHTML = groups.map(value => `<section class="semester-group" aria-label="${semesterLabel(value)}"><h3>${semesterLabel(value).toUpperCase()}</h3><div class="cards">${matches.filter(book => book.semester === value).map(book => `
      <article class="book-card ${book.available?'ready':'draft'}">
        <div class="card-top"><span class="card-number">${String(books.indexOf(book)+1).padStart(2,'0')}</span><span class="badge">${book.available?'Livro disponível':'Em preparação'}</span></div>
        <h4>${escape(book.title)}</h4><p>${escape(book.description)}</p>
        <div class="topics">${book.topics.map(topic => `<span>${escape(topic)}</span>`).join('')}</div>
        <div class="card-footer">${book.available?`<span>${book.chapters?`${book.chapters} ${book.chapters===1?'roteiro':'roteiros'}`:'Livro de estudos'}</span><a href="${escape(book.path)}/" aria-label="Ler ${escape(book.title)}">Abrir livro <span aria-hidden="true">↗</span></a>`:'<span class="draft-text">Novos capítulos serão adicionados aqui.</span>'}</div>
      </article>`).join('')}</div></section>`).join('');
  }

  async function prepareBook(book) {
    // O catálogo publicado já contém esses dados. Na pasta original, verifica os arquivos do livro.
    if (typeof book.available === 'boolean') return book;
    try {
      const page = await fetch(`${book.path}/index.html`, { method: 'HEAD', cache: 'no-cache' });
      if (!page.ok) return { ...book, available: false, chapters: 0 };
      const response = await fetch(`${book.path}/README.md`, { cache: 'no-cache' });
      const markdown = response.ok ? await response.text() : '';
      const chapterLinks = [...markdown.matchAll(/\]\((?:\.\/)?(roteiro\d+)\/(?:README\.md)?(?:[?#][^)]*)?\)/g)];
      const chapters = new Set(chapterLinks.map(match => match[1])).size;
      return { ...book, available: true, chapters };
    } catch {
      return { ...book, available: false, chapters: 0 };
    }
  }

  async function init() {
    try {
      const response = await fetch('catalogo.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const catalog = await response.json();
      books = await Promise.all(catalog.books.map(prepareBook));
      const values = [...new Set(books.map(book => book.semester))].sort((a,b)=>a==null?1:b==null?-1:a-b);
      values.forEach(value => {
        const option = document.createElement('option');
        option.value = value ?? 'undefined';option.textContent = semesterLabel(value);semester.append(option);
      });
      const featured = books.find(book => book.path === 'banco-de-dados' && book.available);
      if (featured) {
        document.getElementById('featured-meta').textContent = `${featured.chapters} roteiros · SQL Server`;
        document.getElementById('featured-semester').textContent = semesterLabel(featured.semester).toUpperCase();
      }
      else document.querySelector('.featured').hidden = true;
      render();
      search.addEventListener('input',render);semester.addEventListener('change',render);
    } catch {
      count.textContent = 'Catálogo indisponível';
      content.innerHTML = '<div class="empty"><h3>Não foi possível carregar o catálogo.</h3><p>Atualize a página ou <a href="banco-de-dados/">abra Banco de Dados</a>. Para a prévia local, prepare o site conforme o guia COMO-PUBLICAR.md.</p></div>';
    }
  }
  init();
})();
