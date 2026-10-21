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

  function initFeatured() {
    const featured = document.getElementById('featured');
    const ready = books.filter(book => book.available);
    const first = ready.findIndex(book => book.path === 'banco-de-dados');
    if (first > 0) ready.unshift(ready.splice(first, 1)[0]);
    featured.hidden = ready.length === 0;
    if (!ready.length) return;

    const styles = {
      'banco-de-dados': {
        title: 'Banco\nde Dados', subject: 'SQL Server',
        description: 'Modelagem, consultas SQL, automação e controle de acesso.',
        icon: '<ellipse cx="50" cy="26" rx="28" ry="11"/><path d="M22 26v48c0 15 56 15 56 0V26M22 42c0 15 56 15 56 0M22 58c0 15 56 15 56 0"/>'
      },
      'introducao-programacao-estruturada': {
        title: 'Introdução à\nProgramação\nEstruturada', subject: 'Python',
        description: 'Os primeiros passos em Python: lógica, funções, coleções e arquivos.',
        icon: '<path d="M35 27 12 50l23 23m30-46 23 23-23 23M59 17 41 83" stroke-linecap="round" stroke-linejoin="round"/>'
      },
      'circuitos-logicos': {
        title: 'Circuitos\nLógicos', subject: 'CircuitVerse',
        description: 'Portas, Karnaugh e operações binárias, com laboratórios interativos.',
        icon: '<path d="M35 20h15a30 30 0 0 1 0 60H35ZM9 35h26M9 65h26M80 50h14"/><circle cx="9" cy="35" r="4"/><circle cx="9" cy="65" r="4"/>'
      }
    };
    const fallbackIcon = '<path d="M18 15h54v70H18zM27 15v70M39 34h22M39 46h22M39 58h16" stroke-linejoin="round"/>';
    const slide = document.getElementById('featured-slide');
    const dots = document.getElementById('featured-dots');
    const controls = document.getElementById('featured-controls');
    const previous = document.getElementById('featured-prev');
    const next = document.getElementById('featured-next');
    let current = 0;
    dots.replaceChildren();
    ready.forEach((book, index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'featured-dot';
      button.setAttribute('aria-label', `Mostrar ${book.title}`);
      button.setAttribute('aria-controls', 'featured-slide');
      button.addEventListener('click', () => show(index));
      dots.append(button);
    });

    function show(index, animate = true) {
      current = (index + ready.length) % ready.length;
      const book = ready[current], style = styles[book.path];
      featured.dataset.book = book.path;
      document.getElementById('featured-title').textContent = style?.title || book.title;
      featured.classList.toggle('featured-long-title', book.title.length > 24);
      document.getElementById('featured-symbol').innerHTML = `<g fill="none" stroke="currentColor" stroke-width="2.5">${style?.icon || fallbackIcon}</g>`;
      document.getElementById('featured-semester').textContent = semesterLabel(book.semester).toUpperCase();
      document.getElementById('featured-description').textContent = style?.description || book.description;
      const chapterLabel = book.chapters ? `${book.chapters} ${book.chapters === 1 ? 'roteiro' : 'roteiros'}` : 'Livro de estudos';
      document.getElementById('featured-meta').textContent = `${chapterLabel} · ${style?.subject || book.topics[0] || 'Leitura'}`;
      const link = document.getElementById('featured-link');
      link.setAttribute('href', `${book.path}/`);
      link.setAttribute('aria-label', `Abrir o livro ${book.title}`);
      slide.setAttribute('aria-label', `${current + 1} de ${ready.length}: ${book.title}`);
      document.getElementById('featured-position').textContent = `${String(current + 1).padStart(2,'0')} / ${String(ready.length).padStart(2,'0')}`;
      document.getElementById('featured-announcement').textContent = `${book.title}. ${semesterLabel(book.semester)}. Livro ${current + 1} de ${ready.length}.`;
      [...dots.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
      if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        slide.animate?.([{opacity:0.4, transform:'translateX(8px)'},{opacity:1, transform:'translateX(0)'}], {duration:200, easing:'ease-out'});
      }
    }

    controls.hidden = ready.length < 2;
    previous.disabled = next.disabled = ready.length < 2;
    previous.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    featured.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const destinations = {ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: ready.length - 1};
      if (!(event.key in destinations) || ready.length < 2) return;
      event.preventDefault(); show(destinations[event.key]);
    });
    let touchStart;
    const art = document.getElementById('featured-art');
    art.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') touchStart = {x:event.clientX, y:event.clientY};
    });
    art.addEventListener('pointerup', event => {
      if (!touchStart) return;
      const dx = event.clientX - touchStart.x, dy = event.clientY - touchStart.y;
      touchStart = undefined;
      if (Math.abs(dx) > 40 && Math.abs(dy) < Math.abs(dx) * 0.65 && ready.length > 1) show(current + (dx < 0 ? 1 : -1));
    });
    art.addEventListener('pointercancel', () => { touchStart = undefined; });
    show(current, false);
  }

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
      initFeatured();
      render();
      search.addEventListener('input',render);semester.addEventListener('change',render);
    } catch {
      count.textContent = 'Catálogo indisponível';
      content.innerHTML = '<div class="empty"><h3>Não foi possível carregar o catálogo.</h3><p>Atualize a página ou <a href="banco-de-dados/">abra Banco de Dados</a>. Para a prévia local, prepare o site conforme o guia COMO-PUBLICAR.md.</p></div>';
    }
  }
  init();
})();
