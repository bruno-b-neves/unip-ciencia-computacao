/* Modelos combinacionais didáticos. Entradas e saídas usam apenas 0 e 1. */
(function (root) {
  'use strict';
  const not = x => x ^ 1;
  const bits = (value, size) => Array.from({ length: size }, (_, i) => (value >> (size - i - 1)) & 1);
  function gate(name, input) {
    const and = Number(input.every(Boolean)), or = Number(input.some(Boolean));
    const xor = input.reduce((a, b) => a ^ b, 0);
    return { AND: and, NAND: not(and), OR: or, NOR: not(or), XOR: xor, XNOR: not(xor) }[name];
  }
  const expressions = {
    'r2-a': ([A,B,C]) => (not(A)&not(B)) | (A&not(C)) | (not(A)&C),
    'r2-b': ([P,Q,R]) => (P&not(Q)) | (P&not(R&Q)) | (not(P)^R),
    'r2-c': ([A,B,C]) => not(A|B) & (B^C) & not(C),
    'r2-d': ([A,B]) => (A&B) ^ not(A&B) ^ (A|B) ^ not(A|B),
    'r2-e': ([P,Q,R]) => (P&Q) | not(Q) | (not(Q)&not(Q|R)),
    'r3-a': ([A,B]) => (A&B) | (A|B),
    'r3-b': ([M,N]) => ((M^N)^(M|N)) | (M&N),
    'r3-c': ([A,B,C]) => (not(A)&((B&C)|(not(B)&not(C)))) | (A&((not(B)&C)|(B&not(C)))),
    'r3-d': ([P,Q,R]) => (not(P)&Q) | (R^P) | (P&not(Q)&R),
    'r3-e': ([X,Y,Z]) => (X&((Y&Z)|(not(Z)&not(X)))) | (X^(not(Y)|Z)) | (X&not(Z)),
    'r4-a': ([A,B,C,D]) => (not(A)&B&(not(C)|D)) | ((not(A)|not(B))&C&not(D)) | ((A|B)&(C|not(D))) | (A&B&not(C)&not(D)),
    'r4-b': ([X,Y,W,Z]) => ((X^Y)&(Z|W)) | ((X^Z)&(Y|W)) | ((Y^Z)&(Z|W)) | ((W^Z)&(Y|X))
  };
  const sop = (input, terms) => Number(terms.some(term => term.every((value, i) => value === null || value === input[i])));
  const halfAdder = (A,B) => ({ sum: A^B, carry: A&B });
  const fullAdder = (A,B,C) => ({ sum: A^B^C, carry: (A&B)|(C&(A^B)) });
  function add2(A,B) {
    const low = halfAdder(A&1,B&1), high = fullAdder((A>>1)&1,(B>>1)&1,low.carry);
    return { low: low.sum, high: high.sum, middleCarry: low.carry, carry: high.carry, result: high.carry*4+high.sum*2+low.sum };
  }
  const halfSubtractor = (A,B) => ({ difference: A^B, borrow: not(A)&B });
  const fullSubtractor = (A,B,E) => ({ difference: A^B^E, borrow: (not(A)&B) | (not(A^B)&E) });
  function subtract2(A,B) {
    const low = halfSubtractor(A&1,B&1), high = fullSubtractor((A>>1)&1,(B>>1)&1,low.borrow);
    const remainder = high.difference*2+low.difference;
    return { low: low.difference, high: high.difference, middleBorrow: low.borrow, borrow: high.borrow, remainder, result: remainder-high.borrow*4 };
  }
  // Segmentos a, b, c, d, e, f, g; nível 1 acende o segmento.
  const segmentSets = ['abcdef','bc','abdeg','abcdg','bcfg','acdfg','acdefg','abc','abcdefg','abcdfg','abcefg','cdefg','adef','bcdeg','adefg','aefg'];
  const segments = value => [...'abcdefg'].map(s => Number(segmentSets[value].includes(s)));
  const encode = (value, size = 10) => {
    if (!Number.isInteger(value) || value < 0 || value >= size) throw new RangeError('Entrada fora do código.');
    return bits(value,4);
  };
  // Para entradas não BCD, esta demonstração bloqueia todas as saídas.
  const decode = value => Array.from({ length: 10 }, (_, i) => Number(value === i));
  const api = { not, bits, gate, expressions, sop, halfAdder, fullAdder, add2, halfSubtractor, fullSubtractor, subtract2, segmentSets, segments, encode, decode };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CircuitLogic = api;
})(typeof window === 'undefined' ? globalThis : window);
