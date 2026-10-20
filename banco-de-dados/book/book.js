/* Leitor estático: os READMEs continuam sendo a fonte de conteúdo. */
(() => {
  'use strict';
  const REPO = 'https://github.com/bruno-b-neves/unip-ciencia-computacao';
  const root = new URL('./', location.href);
  const chapters = [
    {slug:'', title:'Apresentação', description:'Um percurso de estudos em modelagem, consultas, automação e controle de acesso.', file:'README.md'},
    {slug:'roteiro01', title:'Modelagem de dados', description:'Do conceito ao modelo físico: um sistema de adoção de animais.', group:'FUNDAMENTOS', file:'introducao-fundamentacao.sql'},
    {slug:'roteiro02', title:'Relacionamentos', description:'Cardinalidades, chaves e tabelas associativas em uma livraria digital.', file:'comandos-ddl.sql'},
    {slug:'roteiro03', title:'Manipulação de dados', description:'Cadastro e manutenção de informações da pizzaria Bella Napoli.', group:'CONSULTAS E DADOS', file:'comandos-dml.sql'},
    {slug:'roteiro04', title:'Filtros e operadores', description:'Consultas condicionais com operadores lógicos e relacionais.', file:'comandos-dml.sql'},
    {slug:'roteiro05', title:'Operadores especiais', description:'Padrões, intervalos, valores ausentes e subconsultas.', file:'operadores-especiais.sql'},
    {slug:'roteiro06', title:'Views', description:'Consultas reutilizáveis para organizar o acesso às informações.', group:'AUTOMAÇÃO E ACESSO', file:'criacao-de-views.sql'},
    {slug:'roteiro07', title:'Stored procedures', description:'Registro de pedidos e fechamento de contas com desconto VIP.', file:'store-procedure.sql'},
    {slug:'roteiro08', title:'Controle de acesso', description:'Logins, usuários e permissões para os perfis de atendente e gerente.', file:'comando-dcl.sql'}
  ];
  const $ = id => document.getElementById(id);
  const cache = new Map();
  let active = chapters[0], renderId = 0;
  const esc = s => String(s).replace(/[&<>"']/g, x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const readme = c => c.slug ? `${c.slug}/README.md` : 'README.md';
  const route = c => '#/' + c.slug;
  const fold = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const slugify = s => fold(s).replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');

  $('chapters').innerHTML = chapters.map((c,i) => `${c.group?`<p class="group-label">${c.group}</p>`:''}<a class="chapter-link" href="${route(c)}" data-slug="${c.slug}"><span class="chapter-number">${i ? String(i).padStart(2,'0') : '⌂'}</span><span>${esc(c.title)}</span></a>`).join('');

  async function load(c) {
    if (!cache.has(c.slug)) {
      const pending = fetch(new URL(readme(c),root)).then(r=>{
        if(!r.ok) throw new Error(`Não foi possível carregar ${readme(c)} (HTTP ${r.status}).`);
        return r.text();
      });
      cache.set(c.slug,pending);
      pending.catch(()=>cache.delete(c.slug));
    }
    return cache.get(c.slug);
  }

  function openMenu(open) {
    $('sidebar').classList.toggle('open',open);
    $('menu').setAttribute('aria-expanded',String(open));
    $('menu').setAttribute('aria-label',open?'Fechar sumário':'Abrir sumário');
    $('shade').hidden=!open;
  }
  $('menu').addEventListener('click',()=>openMenu(!$('sidebar').classList.contains('open')));
  $('shade').addEventListener('click',()=>openMenu(false));

  function highlightSQL(code) {
    const regex=/(--[^\n]*|\/\*[\s\S]*?\*\/)|((?:N)?'(?:''|[^'])*')|\b(SELECT|FROM|WHERE|CREATE|ALTER|DROP|DATABASE|TABLE|VIEW|PROCEDURE|AS|BEGIN|END|GO|USE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|IF|ELSE|DECLARE|EXEC|EXECUTE|GRANT|REVOKE|DENY|ON|TO|FOR|LOGIN|USER|WITH|PASSWORD|INNER|LEFT|RIGHT|JOIN|AND|OR|NOT|NULL|IS|IN|EXISTS|LIKE|BETWEEN|PRIMARY|KEY|FOREIGN|REFERENCES|CONSTRAINT|DEFAULT|UNIQUE|IDENTITY|NOT|INT|VARCHAR|DATETIME|DECIMAL|BIT|THROW|ORDER|BY|DESC|TOP|RETURN|NOCOUNT)\b/gi;
    let html='',last=0;
    for(const match of code.matchAll(regex)) {
      html+=esc(code.slice(last,match.index));
      html+=`<span class="${match[1]?'comment':match[2]?'str':'kw'}">${esc(match[0])}</span>`;
      last=match.index+match[0].length;
    }
    return html+esc(code.slice(last));
  }

  async function render() {
    const version=++renderId;
    const [path,query='']=location.hash.slice(1).split('?');
    const requested=(path||'/').replace(/^\//,'').replace(/\/$/,'');
    const chapter=chapters.find(c=>c.slug===requested);
    if(!chapter){location.replace('#/');return;}
    active=chapter;
    const index=chapters.indexOf(chapter);
    document.body.classList.toggle('home',index===0);
    document.title=`${index?chapter.title:'Banco de Dados'} · Bruno Neves`;
    $('crumb').textContent=chapter.title;
    $('source').href=`${REPO}/blob/main/banco-de-dados/${readme(chapter)}`;
    document.querySelectorAll('.chapter-link').forEach(a=>{
      if(a.dataset.slug===chapter.slug)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    $('chapter-header').innerHTML=`<p class="eyebrow">${index?`CAPÍTULO ${String(index).padStart(2,'0')} / 08`:'CIÊNCIA DA COMPUTAÇÃO · UNIP'}</p><h1>${index?esc(chapter.title):'Banco de Dados'}</h1><p class="chapter-description">${esc(chapter.description)}</p>${!index?'<a class="start" href="#/roteiro01">Começar a leitura <span aria-hidden="true">→</span></a>':''}<div class="chapter-meta"><span>SQL SERVER</span><span>T-SQL</span>${index?`<a href="${esc(new URL(chapter.slug+'/'+chapter.file,root).href)}" download>Baixar script SQL ↓</a>`:'<span>08 CAPÍTULOS</span>'}<span id="read-time"></span></div>`;
    $('page-navigation').innerHTML=`${index?`<a href="${route(chapters[index-1])}"><small>← ANTERIOR</small>${esc(chapters[index-1].title)}</a>`:''}${index<chapters.length-1?`<a class="next" href="${route(chapters[index+1])}"><small>PRÓXIMO →</small>${esc(chapters[index+1].title)}</a>`:'<a class="next" href="#/"><small>LEITURA CONCLUÍDA</small>Voltar ao sumário ↗</a>'}`;
    $('content').innerHTML='<p>Carregando capítulo…</p>';
    $('outline').replaceChildren();
    openMenu(false);closeSearch();
    try {
      const markdown=await load(chapter);
      if(version!==renderId)return;
      $('content').innerHTML=DOMPurify.sanitize(marked.parse(markdown,{gfm:true}),{ADD_ATTR:['target']});
      $('content').querySelector('h1')?.remove();
      $('content').querySelectorAll('.book-navigation,.book-entry').forEach(n=>n.remove());
      if(!index) $('content').querySelector('img[src="images/database.jpeg"]')?.closest('div')?.remove();
      const usedIds=new Set();
      const headings=[...$('content').querySelectorAll('h2,h3')];
      headings.forEach(h=>{
        let id=slugify(h.textContent)||'secao', n=2;
        const base=id;while(usedIds.has(id))id=base+'-'+n++;
        usedIds.add(id);h.id=id;
      });
      $('outline').innerHTML=headings.filter(h=>h.tagName==='H2'||!headings.some(x=>x.tagName==='H2')).map(h=>`<a href="#${h.id}" data-section="${h.id}">${esc(h.textContent)}</a>`).join('');
      $('content').querySelectorAll('img').forEach(img=>{
        img.src=new URL(img.getAttribute('src'),new URL(readme(chapter),root)).href;
        img.loading='lazy';img.decoding='async';
      });
      $('content').querySelectorAll('a').forEach(a=>{
        const href=a.getAttribute('href');if(!href)return;
        if(href.startsWith('#')){a.dataset.section=href.slice(1);return;}
        const url=new URL(href,new URL(readme(chapter),root));
        const local=chapters.find(c=>url.origin===root.origin&&[new URL(readme(c),root).pathname,new URL(c.slug?c.slug+'/':'./',root).pathname].includes(url.pathname));
        a.href=local?route(local):url.href;
        if(local&&url.hash)a.href+='?sec='+encodeURIComponent(url.hash.slice(1));
        if(!local&&url.origin===root.origin&&url.pathname.endsWith('/'))a.href=REPO+'/tree/main/banco-de-dados/'+url.pathname.slice(root.pathname.length);
        if(url.origin!==root.origin){a.target='_blank';a.rel='noopener noreferrer';}
      });
      $('content').querySelectorAll('table').forEach(table=>{
        const wrapper=document.createElement('div');wrapper.className='table-scroll';
        table.before(wrapper);wrapper.append(table);
      });
      $('content').querySelectorAll('pre').forEach(pre=>{
        const code=pre.querySelector('code');if(!code)return;
        const raw=code.textContent;
        const isSQL=code.classList.contains('language-sql');
        if(isSQL)code.innerHTML=highlightSQL(raw);
        const frame=document.createElement('div');frame.className='code-frame';
        const toolbar=document.createElement('div');toolbar.className='code-tools';
        const label=document.createElement('span');label.textContent=isSQL?'SQL · T-SQL':'CÓDIGO';
        const copy=document.createElement('button');copy.className='copy';copy.type='button';copy.textContent='Copiar';copy.setAttribute('aria-label','Copiar código');
        copy.addEventListener('click',async()=>{
          try{await navigator.clipboard.writeText(raw);copy.textContent='Copiado ✓';}
          catch{const range=document.createRange();range.selectNodeContents(code);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);copy.textContent='Código selecionado';}
          setTimeout(()=>copy.textContent='Copiar',1800);
        });
        toolbar.append(label,copy);pre.before(frame);frame.append(toolbar,pre);
      });
      const words=$('content').textContent.trim().split(/\s+/).length;
      $('read-time').textContent=`~${Math.max(1,Math.ceil(words/180))} MIN DE LEITURA`;
      const section=new URLSearchParams(query).get('sec');
      if(section)requestAnimationFrame(()=>document.getElementById(section)?.scrollIntoView());
      else window.scrollTo({top:0,behavior:'instant'});
      progress();
      if(index===0)chapters.slice(1).forEach(c=>load(c).catch(()=>{}));
    }catch(e){
      if(version!==renderId)return;
      $('content').innerHTML=`<div class="error-box"><p>${esc(e.message)}</p><p>Use um servidor local ou publique a pasta no GitHub Pages. Você também pode <a href="${REPO}/blob/main/banco-de-dados/${readme(chapter)}">ler este capítulo no GitHub</a>.</p></div>`;
    }
  }

  function progress(){
    const max=document.documentElement.scrollHeight-innerHeight;
    const ratio=max>0?Math.min(1,Math.max(0,scrollY/max)):0;
    $('progress').style.width=`calc((100% - var(--sidebar)) * ${ratio})`;
  }
  window.addEventListener('scroll',progress,{passive:true});
  window.addEventListener('resize',progress);
  window.addEventListener('hashchange',render);
  $('back-top').addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});
  document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();$('reading').focus();$('reading').scrollIntoView();});
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[data-section]');if(!a)return;
    e.preventDefault();const id=a.dataset.section;
    const target=document.getElementById(id)||[...$('content').querySelectorAll('[id]')].find(n=>slugify(n.textContent)===slugify(id));
    if(target){target.scrollIntoView();history.replaceState(null,'',route(active)+'?sec='+encodeURIComponent(target.id));}
  });
  function closeSearch(){ $('search').value='';$('search-results').hidden=true; }
  let searchVersion=0;
  $('search').addEventListener('input',async()=>{
    const query=$('search').value.trim(),version=++searchVersion;
    if(query.length<2){$('search-results').hidden=true;return;}
    const results=await Promise.all(chapters.map(async c=>{
      try{
        const raw=await load(c),text=raw.replace(/<!--[\s\S]*?-->/g,'').replace(/<[^>]*>/g,' ').replace(/[#*`|\n]/g,' ').replace(/\s+/g,' ');
        const found=fold(text).indexOf(fold(query));
        const titleMatch=fold(c.title).includes(fold(query));
        if(found<0&&!titleMatch)return null;
        const start=Math.max(0,found-55),snippet=text.slice(start,start+190);
        return {c,snippet:(start?'…':'')+snippet+'…',score:titleMatch?2:1};
      }catch{return null;}
    }));
    if(version!==searchVersion||$('search').value.trim()!==query)return;
    const matches=results.filter(Boolean).sort((a,b)=>b.score-a.score);
    $('search-results').innerHTML=`<button type="button" id="close-search" aria-label="Fechar busca">×</button><h2>${matches.length} ${matches.length===1?'capítulo encontrado':'capítulos encontrados'}</h2>${matches.length?matches.map(({c,snippet})=>`<a href="${route(c)}"><strong>${esc(c.title)}</strong><p>${esc(snippet)}</p></a>`).join(''):'<p>Nenhum resultado. Tente outro assunto, como “permissões”, “JOIN” ou “pedido”.</p>'}`;
    $('close-search').addEventListener('click',closeSearch);
    $('search-results').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{closeSearch();openMenu(false);}));
    $('search-results').hidden=false;
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeSearch();openMenu(false);$('menu').focus();}
    if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){
      e.preventDefault();if(innerWidth<=760)openMenu(true);$('search').focus();
    }
  });
  render();
})();
