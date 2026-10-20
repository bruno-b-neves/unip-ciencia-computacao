const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const root = path.resolve(__dirname,'..');
const L = require(path.join(root,'circuitos-logicos/book/logic.js'));
const cases = require(path.join(root,'circuitos-logicos/book/cases.json'));

test('seis portas, duas a quatro entradas: todas as combinações', () => {
  for(let n=2;n<=4;n++) for(let i=0;i<2**n;i++) {
    const input=L.bits(i,n),count=input.filter(Boolean).length;
    const expected={AND:Number(count===n),NAND:Number(count!==n),OR:Number(count>0),NOR:Number(count===0),XOR:count%2,XNOR:Number(count%2===0)};
    for(const [gate,result] of Object.entries(expected)) assert.equal(L.gate(gate,input),result,`${gate} ${input}`);
  }
});

test('meio somador e somador completo conservam a soma aritmética', () => {
  for(let a=0;a<2;a++)for(let b=0;b<2;b++){
    const half=L.halfAdder(a,b);assert.equal(half.carry*2+half.sum,a+b);
    for(let c=0;c<2;c++){
      const full=L.fullAdder(a,b,c);assert.equal(full.carry*2+full.sum,a+b+c);
    }
  }
});

test('meio subtrator e completo conservam a diferença com empréstimo', () => {
  for(let a=0;a<2;a++)for(let b=0;b<2;b++){
    const half=L.halfSubtractor(a,b);assert.equal(half.difference-half.borrow*2,a-b);
    for(let e=0;e<2;e++){
      const full=L.fullSubtractor(a,b,e);assert.equal(full.difference-full.borrow*2,a-b-e);
    }
  }
});

test('cascata de dois bits: todas as somas e diferenças', () => {
  for(let a=0;a<4;a++)for(let b=0;b<4;b++){
    const sum=L.add2(a,b);assert.equal(sum.result,a+b);assert.equal(sum.carry*4+sum.high*2+sum.low,a+b);
    const diff=L.subtract2(a,b);assert.equal(diff.result,a-b);assert.equal(diff.borrow,Number(a<b));assert.equal(diff.remainder,((a-b)%4+4)%4);
  }
});

test('codificadores BCD e hexadecimal e saídas exclusivas do decodificador', () => {
  for(let value=0;value<16;value++){
    const bits=L.encode(value,16);assert.equal(bits.reduce((a,b)=>a*2+b,0),value);
    const decoded=L.decode(value);assert.equal(decoded.reduce((a,b)=>a+b,0),value<10?1:0);
    if(value<10){assert.deepEqual(L.encode(value),bits);assert.equal(decoded[value],1);}
  }
  assert.throws(()=>L.encode(10),RangeError);assert.throws(()=>L.encode(-1),RangeError);
});

test('display: máscaras dos dezesseis símbolos, na ordem a…g', () => {
  const masks=[0x7e,0x30,0x6d,0x79,0x33,0x5b,0x5f,0x70,0x7f,0x7b,0x77,0x1f,0x4e,0x3d,0x4f,0x47];
  for(let n=0;n<16;n++) assert.equal(L.segments(n).reduce((a,b)=>a*2+b,0),masks[n],String(n));
});

test('tabelas, modelos originais e grupos de Karnaugh são equivalentes', () => {
  assert.equal(cases.length,12);
  for(const c of cases){
    assert.equal(c.rows.length,2**c.vars.length);
    c.rows.forEach((r,i)=>{
      assert.deepEqual(r.input,L.bits(i,c.vars.length));
      assert.equal(L.expressions[c.id](r.input),r.output,c.id);
      assert.equal(L.sop(r.input,c.terms),r.output,c.id+' simplificação');
    });
  }
});

test('barras de negação e ordem das variáveis seguem a conferência do roteiro', () => {
  const check=(id,expected)=>{
    const c=cases.find(c=>c.id===id);
    assert.deepEqual(c.rows.map((r,i)=>r.output?i:-1).filter(i=>i>=0),expected,id);
  };
  check('r2-b',[0,2,4,5,6,7]); // P + ¬R, com a negação de todo R·Q no original.
  check('r2-c',[]); // NOR(A,B) · XOR(B,C) · ¬C.
  check('r2-d',[]); // Cada saída é combinada com seu complemento.
  check('r3-c',[0,3,5,6]); // Paridade par de três bits.
  check('r4-a',[2,4,5,6,7,8,10,11,12,14,15]);
  check('r4-b',[1,3,5,6,7,9,10,11,12,13,14]);
});

test('oito relatórios, imagens locais e ausência de links privados', () => {
  for(let i=1;i<=8;i++){
    const dir=path.join(root,'circuitos-logicos','roteiro'+String(i).padStart(2,'0'));
    const md=fs.readFileSync(path.join(dir,'README.md'),'utf8');
    assert.ok(md.includes('## Conceito'));assert.ok(!/drive\.google\.com|docs\.google\.com|RA:\s*\d/.test(md));
    for(const match of md.matchAll(/(?:src="|\]\()([^"\s)]+\.(?:svg|png|jpg|jpeg))/g)) assert.ok(fs.existsSync(path.resolve(dir,match[1])),match[1]);
  }
  const sources=require(path.join(root,'circuitos-logicos/images/fontes.json'));
  assert.equal(Object.values(sources).flat().length,37);
});
