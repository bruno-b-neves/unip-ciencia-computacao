/* Laboratórios do livro. Calculam funções lógicas; não substituem a evidência do CircuitVerse. */
(() => {
  'use strict';
  const L=window.CircuitLogic;
  const dataURL=new URL('cases.json',document.currentScript.src);
  let dataPromise;
  const colors=['#d8e9e1','#f7e5c9','#e4ddf3','#d7e8f3','#f2dce4','#e5e9c8'];
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pad=(value,size)=>value.toString(2).padStart(size,'0');
  const product=(term,vars)=>term.map((v,i)=>v===null?'':(v?'':'¬')+vars[i]).filter(Boolean).join('·')||'1';
  const output=(name,value)=>`<span class="logic-value" data-value="${value}">${esc(name)} <strong>${value}</strong></span>`;
  const select=(key,label,options,value)=>`<label>${label}<select data-select="${key}">${options.map(([id,title])=>`<option value="${id}" ${String(id)===String(value)?'selected':''}>${esc(title)}</option>`).join('')}</select></label>`;
  const bitControls=(vars,values)=>`<div class="bit-controls">${vars.map((name,i)=>`<label class="bit-control">${esc(name)}<button type="button" class="bit-button" data-bit="${i}" aria-label="Alternar ${esc(name)}" aria-pressed="${Boolean(values[i])}">${values[i]}</button></label>`).join('')}</div>`;
  const digitControls=(count,value)=>`<div class="digit-controls">${Array.from({length:count},(_,i)=>`<button type="button" class="digit-button" data-digit="${i}" aria-pressed="${value===i}">${i.toString(16).toUpperCase()}</button>`).join('')}</div>`;
  const signals=(names,values)=>`<div class="signal-row">${names.map((name,i)=>`<span class="signal-chip" data-on="${values[i]}">${esc(name)}<strong>${values[i]}</strong></span>`).join('')}</div>`;
  function table(headers,rows,current) {
    return `<div class="table-scroll"><table><thead><tr>${headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r,i)=>`<tr ${i===current?'class="current"':''}>${r.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function shell(host,title,body) {
    host.classList.add('logic-lab');
    host.innerHTML=`<div class="lab-heading"><h3>${title}</h3><span class="lab-tag">EXPLORE O CIRCUITO</span></div><div class="lab-body">${body}</div>`;
  }
  function connectBits(host,state,draw) {
    host.querySelectorAll('[data-bit]').forEach(button=>button.addEventListener('click',()=>{
      const i=Number(button.dataset.bit);state.input[i]^=1;draw();
      host.querySelector(`[data-bit="${i}"]`)?.focus({preventScroll:true});
    }));
  }
  function gateSVG(name,input,out) {
    const or=['OR','NOR','XOR','XNOR'].includes(name),inverted=['NAND','NOR','XNOR'].includes(name);
    const path=or?'M230 35 Q265 100 230 165 Q340 165 380 100 Q340 35 230 35Z':'M245 35H295A65 65 0 0 1 295 165H245Z';
    return `<svg class="gate-diagram" viewBox="0 0 600 205" role="img" aria-label="Porta ${name}, entradas ${input.join(', ')}, saída ${out}">${input.map((bit,i)=>{const y=55+i*(90/Math.max(1,input.length-1));return `<path d="M80 ${y}H245" stroke="${bit?'#bddd9c':'#53717a'}" stroke-width="3"/><text x="30" y="${y+6}" fill="#d5e5e5" font-size="18">${'ABCD'[i]}=${bit}</text>`;}).join('')}<path d="${path}" fill="#22434b" stroke="#a9c5b8" stroke-width="3"/>${['XOR','XNOR'].includes(name)?'<path d="M219 35Q254 100 219 165" stroke="#a9c5b8" fill="none" stroke-width="3"/>':''}${inverted?'<circle cx="389" cy="100" r="8" fill="#142c36" stroke="#a9c5b8" stroke-width="3"/>':''}<path d="M${inverted?397:380} 100H480" stroke="${out?'#bddd9c':'#53717a'}" stroke-width="3"/><circle cx="500" cy="100" r="25" fill="${out?'#bddd9c':'#29434b'}"/><text x="500" y="108" text-anchor="middle" fill="${out?'#153c2e':'#c7dbd9'}" font-size="23">${out}</text><text x="294" y="195" text-anchor="middle" fill="#c9dbd7" font-size="12">${name}</text></svg>`;
  }
  function gates(host,compact) {
    const state={gate:'AND',input:[0,0]};
    function draw() {
      const size=state.input.length,value=L.gate(state.gate,state.input),current=parseInt(state.input.join(''),2);
      const controls=select('gate','Porta lógica',['AND','NAND','OR','NOR','XOR','XNOR'].map(n=>[n,n]),state.gate)+select('size','Entradas',[[2,'2 entradas'],[3,'3 entradas'],[4,'4 entradas']],size);
      const rows=Array.from({length:2**size},(_,i)=>{const bits=L.bits(i,size);return [...bits,L.gate(state.gate,bits)];});
      shell(host,'Uma entrada muda. O que acontece?',`<div class="lab-controls">${controls}</div>${bitControls([...'ABCD'].slice(0,size),state.input)}${gateSVG(state.gate,state.input,value)}<p class="lab-help" role="status">Estado ${state.input.join('')} → saída ${value}. Clique nos bits para alternar entre 0 e 1.</p>${compact?'':table([...'ABCD'].slice(0,size).concat('S'),rows,current)}`);
      connectBits(host,state,draw);
      host.querySelector('[data-select="gate"]').addEventListener('change',e=>{state.gate=e.target.value;draw();host.querySelector('[data-select="gate"]').focus({preventScroll:true});});
      host.querySelector('[data-select="size"]').addEventListener('change',e=>{state.input=Array(Number(e.target.value)).fill(0);draw();host.querySelector('[data-select="size"]').focus({preventScroll:true});});
    }
    draw();
  }
  function kmap(caseData,current) {
    const n=caseData.vars.length,left=n<4?1:2,right=n-left;
    const gray=count=>Array.from({length:2**count},(_,i)=>i^(i>>1));
    const heads=`<tr><th>${caseData.vars.slice(0,left).join('')}/${caseData.vars.slice(left).join('')}</th>${gray(right).map(i=>`<th scope="col">${pad(i,right)}</th>`).join('')}</tr>`;
    const rows=gray(left).map(a=>`<tr><th scope="row">${pad(a,left)}</th>${gray(right).map(b=>{
      const i=(a<<right)|b,input=L.bits(i,n),value=caseData.rows[i].output;
      const groups=caseData.terms.map((term,j)=>term.every((v,k)=>v===null||v===input[k])?j:-1).filter(j=>j>=0);
      return `<td><button type="button" class="map-cell" data-cell="${i}" style="background:${value&&groups.length?colors[groups[0]%colors.length]:'#fff'}" aria-label="Combinação ${input.join('')}, saída ${value}${groups.length?', grupos '+groups.map(j=>j+1).join(', '):''}" aria-pressed="${current===i}">${value}<small>m${i}${groups.length?' · '+groups.map(j=>'G'+(j+1)).join(','):''}</small></button></td>`;
    }).join('')}</tr>`).join('');
    return `<div class="kmap-wrap"><div><div class="kmap-title">Código Gray: vizinhos mudam um único bit</div><table class="kmap"><thead>${heads}</thead><tbody>${rows}</tbody></table></div><ul class="group-list">${caseData.terms.map((term,i)=>`<li style="background:${colors[i%colors.length]}">G${i+1} · ${esc(product(term,caseData.vars))}</li>`).join('')}</ul></div>`;
  }
  function expressions(host,cases,chapter,maps) {
    const choices=cases.filter(c=>c.chapter===chapter);let selected=choices[0];
    const state={input:Array(selected.vars.length).fill(0)};
    function draw() {
      const a=L.expressions[selected.id](state.input),b=L.sop(state.input,selected.terms),current=parseInt(state.input.join(''),2);
      shell(host,maps?'Mapa e circuito, lado a lado':'Expressão original e equivalente',`<div class="lab-controls">${select('case','Escolha o circuito',choices.map(c=>[c.id,c.title]),selected.id)}</div><div class="lab-formula">${esc(selected.formula)}<br><strong>S simplificada = ${esc(selected.simplified)}</strong></div>${bitControls(selected.vars,state.input)}<div class="lab-output" role="status" aria-live="polite">${output('Original',a)}${output('Simplificada',b)}</div>${maps?kmap(selected,current):''}${table([...selected.vars,'Original','Simplificada'],selected.rows.map(r=>[...r.input,r.output,L.sop(r.input,selected.terms)]),current)}<p class="lab-help">As saídas são calculadas para todas as combinações. A versão simplificada mantém o mesmo comportamento lógico.</p>`);
      connectBits(host,state,draw);
      host.querySelector('[data-select="case"]').addEventListener('change',e=>{selected=choices.find(c=>c.id===e.target.value);state.input=Array(selected.vars.length).fill(0);draw();host.querySelector('[data-select="case"]').focus({preventScroll:true});});
      host.querySelectorAll('[data-cell]').forEach(button=>button.addEventListener('click',()=>{const i=Number(button.dataset.cell);state.input=L.bits(i,selected.vars.length);draw();host.querySelector(`[data-cell="${i}"]`).focus({preventScroll:true});}));
    }
    draw();
  }
  function codes(host) {
    let mode='bcd',value=0;
    function draw() {
      const decoder=mode==='decoder',size=mode==='hex'||decoder?16:10;
      const input=L.bits(value,4),result=decoder?L.decode(value):L.encode(value,size);
      shell(host,'Uma linha, um código',`<div class="lab-controls">${select('mode','Operação',[['bcd','Codificador decimal → BCD'],['hex','Codificador hexadecimal → binário'],['decoder','Decodificador BCD → decimal']],mode)}</div>${digitControls(size,value)}${decoder?signals(['C8','C4','C2','C1'],input):`<p class="lab-help">Uma única entrada ativa: E${value.toString(16).toUpperCase()}.</p>`}<div role="status" aria-live="polite">${decoder?signals(Array.from({length:10},(_,i)=>'S'+i),result):signals(['C8','C4','C2','C1'],result)}<p class="live-note">${decoder?(value<10?`Entrada ${pad(value,4)} → somente S${value} está ativa.`:'Código de 10 a 15: não representa um dígito BCD. Todas as saídas estão bloqueadas nesta demonstração.'):`E${value.toString(16).toUpperCase()} → ${result.join('')}₂ (valor ${value}).`}</p></div>`);
      host.querySelector('[data-select="mode"]').addEventListener('change',e=>{mode=e.target.value;value=0;draw();host.querySelector('[data-select="mode"]').focus({preventScroll:true});});
      host.querySelectorAll('[data-digit]').forEach(button=>button.addEventListener('click',()=>{value=Number(button.dataset.digit);draw();host.querySelector(`[data-digit="${value}"]`).focus({preventScroll:true});}));
    }
    draw();
  }
  function displaySVG(value) {
    const lines={a:[35,25,100,25],b:[112,38,112,96],c:[112,119,112,177],d:[35,190,100,190],e:[23,119,23,177],f:[23,38,23,96],g:[35,107,100,107]};
    return `<svg class="seven-segment" viewBox="0 0 140 220" role="img" aria-label="Display mostrando ${value.toString(16).toUpperCase()}">${Object.entries(lines).map(([s,c])=>`<line x1="${c[0]}" y1="${c[1]}" x2="${c[2]}" y2="${c[3]}" class="${L.segmentSets[value].includes(s)?'on':'off'}" stroke-width="13" stroke-linecap="round"/>`).join('')}<text x="70" y="217" text-anchor="middle">a · b · c · d · e · f · g</text></svg>`;
  }
  function display(host) {
    let value=0;
    function draw() {
      const mask=L.segments(value),name=value===11?'b':value===13?'d':value.toString(16).toUpperCase();
      shell(host,'Sete saídas. Dezesseis símbolos.',`${digitControls(16,value)}<div class="display-layout">${displaySVG(value)}<div><p class="lab-help">Código de entrada: ${pad(value,4)}₂</p>${signals([...'abcdefg'],mask)}<p class="live-note" role="status" aria-live="polite">${name}: segmentos ${[...'abcdefg'].filter((_,i)=>mask[i]).join(', ')}.</p></div></div><p class="lab-help">Nível 1 acende o segmento. As letras b e d aparecem em minúsculas. Esta é uma visualização lógica, sem características elétricas.</p>`);
      host.querySelectorAll('[data-digit]').forEach(button=>button.addEventListener('click',()=>{value=Number(button.dataset.digit);draw();host.querySelector(`[data-digit="${value}"]`).focus({preventScroll:true});}));
    }
    draw();
  }
  function arithmetic(host,subtract) {
    let mode='two';const state={input:[0,1,0,1]};
    function draw() {
      const two=mode==='two',full=mode==='full',names=two?['A1','A0','B1','B0']:full?['A','B',subtract?'EE':'CE']:['A','B'];
      let result,detail,rows,headers,outputs;
      if(two){
        const A=state.input[0]*2+state.input[1],B=state.input[2]*2+state.input[3];
        result=subtract?L.subtract2(A,B):L.add2(A,B);
        const carry=subtract?result.borrow:result.carry,mid=subtract?result.middleBorrow:result.middleCarry;
        outputs=signals(subtract?['ES','D1','D0']:['CS','S1','S0'],[carry,result.high,result.low]);
        detail=`<div class="arith-stage"><div class="stage-block">${subtract?'Meio subtrator':'Meio somador'}<strong>${state.input[1]} ${subtract?'−':'+'} ${state.input[3]}</strong>bit 0 → ${result.low}</div><div class="stage-arrow">${subtract?'Empréstimo':'Vai-um'}<br><strong>${mid}</strong> →</div><div class="stage-block">${subtract?'Subtrator':'Somador'} completo<strong>${state.input[0]} ${subtract?'−':'+'} ${state.input[2]} ${subtract?'−':'+'} ${mid}</strong>bit 1 → ${result.high}</div></div>`;
        detail+=`<div class="lab-summary" role="status" aria-live="polite">${pad(A,2)}₂ ${subtract?'−':'+'} ${pad(B,2)}₂ = ${result.result}₁₀${subtract?`<br>Diferença ${pad(result.remainder,2)}₂; empréstimo ${result.borrow}.<br>Valor inteiro = ${result.remainder} − 4×${result.borrow}.`:`<br>Resultado ${pad(result.result,3)}₂.`}</div>`;
        rows=Array.from({length:4},(_,a)=>[pad(a,2),...Array.from({length:4},(_,b)=>subtract?`${pad((a-b+4)%4,2)}; E=${Number(a<b)}`:pad(a+b,3))]);headers=['A / B','00','01','10','11'];
      } else {
        const [A,B,E]=state.input;result=subtract?(full?L.fullSubtractor(A,B,E):L.halfSubtractor(A,B)):(full?L.fullAdder(A,B,E):L.halfAdder(A,B));
        outputs=signals(subtract?['ES','D']:['CS','S'],subtract?[result.borrow,result.difference]:[result.carry,result.sum]);
        detail=`<p class="live-note" role="status" aria-live="polite">${A} ${subtract?'−':'+'} ${B}${full?` ${subtract?'−':'+'} ${E}`:''}: ${subtract?'diferença '+result.difference+', empréstimo '+result.borrow:'soma '+result.sum+', vai-um '+result.carry}.</p>`;
        rows=Array.from({length:2**names.length},(_,i)=>{const b=L.bits(i,names.length);const r=subtract?(full?L.fullSubtractor(...b):L.halfSubtractor(...b)):(full?L.fullAdder(...b):L.halfAdder(...b));return [...b,...(subtract?[r.borrow,r.difference]:[r.carry,r.sum])];});headers=[...names,...(subtract?['ES','D']:['CS','S'])];
      }
      shell(host,subtract?'Acompanhe o empréstimo':'Acompanhe o vai-um',`<div class="lab-controls">${select('mode','Circuito',[['half',subtract?'Meio subtrator':'Meio somador'],['full',subtract?'Subtrator completo':'Somador completo'],['two','Dois números de dois bits']],mode)}</div>${bitControls(names,state.input)}${outputs}${detail}${table(headers,rows,two?undefined:parseInt(state.input.join(''),2))}`);
      connectBits(host,state,draw);
      host.querySelector('[data-select="mode"]').addEventListener('change',e=>{mode=e.target.value;state.input=Array(mode==='two'?4:mode==='full'?3:2).fill(0);draw();host.querySelector('[data-select="mode"]').focus({preventScroll:true});});
    }
    draw();
  }
  function zoomImages(container) {
    container.querySelectorAll('img').forEach(img=>{
      if(img.closest('.logic-lab')||img.parentElement.classList.contains('image-open'))return;
      const button=document.createElement('button');button.type='button';button.className='image-open';button.setAttribute('aria-label','Ampliar imagem: '+img.alt);
      img.before(button);button.append(img);
      button.addEventListener('click',()=>{
        let dialog=document.querySelector('.image-dialog');
        if(!dialog){dialog=document.createElement('dialog');dialog.className='image-dialog';dialog.setAttribute('aria-label','Imagem ampliada');document.body.append(dialog);}
        dialog.innerHTML=`<header><span>${esc(img.alt)}</span><button type="button">Fechar ×</button></header><img src="${esc(img.src)}" alt="${esc(img.alt)}">`;
        dialog.querySelector('button').addEventListener('click',()=>dialog.close());
        dialog.showModal();
      });
    });
  }
  window.CircuitosBook={
    async mount(container) {
      zoomImages(container);
      const hosts=[...container.querySelectorAll('[data-lab]')];if(!hosts.length)return;
      if(!dataPromise)dataPromise=fetch(dataURL).then(r=>{if(!r.ok)throw new Error('Não foi possível carregar os modelos.');return r.json();});
      try {
        const cases=await dataPromise;
        for(const host of hosts){
          if(!host.isConnected)continue;
          switch(host.dataset.lab){
            case 'inicio':gates(host,true);break;
            case 'portas':gates(host,false);break;
            case 'expressoes':expressions(host,cases,2,false);break;
            case 'karnaugh3':expressions(host,cases,3,true);break;
            case 'karnaugh4':expressions(host,cases,4,true);break;
            case 'codigos':codes(host);break;
            case 'display':display(host);break;
            case 'somador':arithmetic(host,false);break;
            case 'subtrator':arithmetic(host,true);break;
          }
        }
      }catch(error){dataPromise=undefined;hosts.forEach(host=>{host.innerHTML='<p>O laboratório não carregou. Atualize a página; as tabelas e explicações continuam disponíveis abaixo.</p>';});}
    }
  };
})();
