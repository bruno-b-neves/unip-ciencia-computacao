# Roteiro 01 — Portas lógicas e CircuitVerse

**Bruno Neves · Ciência da Computação · UNIP · 1º semestre**

## Conceito

Uma porta lógica transforma uma ou mais entradas binárias em uma saída. O CircuitVerse permite ligar entradas, portas e saídas para observar esse comportamento. Testar todas as combinações evita concluir o funcionamento de uma porta a partir de um único exemplo.

## Experimente as portas

Escolha a porta, defina a quantidade de entradas e alterne os bits. A linha destacada corresponde ao estado atual do circuito.

<div data-lab="portas"></div>

## Como ler os símbolos

`0` e `1` representam os níveis lógicos. `¬A` inverte A; `A·B` significa AND; `A+B` significa OR; `A ⊕ B` significa XOR. O sinal + nas expressões booleanas não é uma soma aritmética. Uma tabela com n entradas tem 2ⁿ combinações.
## Funcionamento das seis portas

| Porta | Regra de saída 1 |
| --- | --- |
| AND | Todas as entradas são 1. |
| NAND | Pelo menos uma entrada é 0; é a inversa de AND. |
| OR | Pelo menos uma entrada é 1. |
| NOR | Todas as entradas são 0; é a inversa de OR. |
| XOR | A quantidade de entradas em 1 é ímpar. Com duas entradas, elas são diferentes. |
| XNOR / NXOR | A quantidade de entradas em 1 é par; é a inversa de XOR. Com duas entradas, elas são iguais. |

## Tabelas-verdade conferidas

As tabelas de algumas portas no relatório original repetem a coluna de saída de AND. As tabelas abaixo usam a função de cada porta; as capturas são mantidas como registro da atividade.

### 2 entradas

| A | B | AND | NAND | OR | NOR | XOR | XNOR |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 1 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |

### 3 entradas

| A | B | C | AND | NAND | OR | NOR | XOR | XNOR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 1 |
| 0 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 | 1 | 0 | 1 | 0 |

### 4 entradas

| A | B | C | D | AND | NAND | OR | NOR | XOR | XNOR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 1 |
| 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 0 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 1 | 0 | 1 | 0 | 0 | 1 |

## Registros da atividade

As imagens abaixo preservam as capturas do relatório original. Clique em uma imagem no livro para ampliá-la.

<div class="figure-gallery">
<figure><img src="../images/roteiro01/and-p02-01.png" alt="AND — registro original, página 2, imagem 1." width="234" height="526" loading="lazy"><figcaption>AND — registro original, página 2, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/and-p02-02.png" alt="AND — registro original, página 2, imagem 2." width="362" height="324" loading="lazy"><figcaption>AND — registro original, página 2, imagem 2.</figcaption></figure>
<figure><img src="../images/roteiro01/and-p03-01.png" alt="AND — registro original, página 3, imagem 1." width="442" height="307" loading="lazy"><figcaption>AND — registro original, página 3, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/and-p03-02.png" alt="AND — registro original, página 3, imagem 2." width="442" height="312" loading="lazy"><figcaption>AND — registro original, página 3, imagem 2.</figcaption></figure>
<figure><img src="../images/roteiro01/nand-p04-01.png" alt="NAND — registro original, página 4, imagem 1." width="307" height="272" loading="lazy"><figcaption>NAND — registro original, página 4, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/nand-p04-02.png" alt="NAND — registro original, página 4, imagem 2." width="509" height="301" loading="lazy"><figcaption>NAND — registro original, página 4, imagem 2.</figcaption></figure>
<figure><img src="../images/roteiro01/nand-p05-01.png" alt="NAND — registro original, página 5, imagem 1." width="412" height="298" loading="lazy"><figcaption>NAND — registro original, página 5, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/nand-p05-02.png" alt="NAND — registro original, página 5, imagem 2." width="393" height="248" loading="lazy"><figcaption>NAND — registro original, página 5, imagem 2.</figcaption></figure>
<figure><img src="../images/roteiro01/or-p06-01.png" alt="OR — registro original, página 6, imagem 1." width="260" height="293" loading="lazy"><figcaption>OR — registro original, página 6, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/or-p06-02.png" alt="OR — registro original, página 6, imagem 2." width="388" height="317" loading="lazy"><figcaption>OR — registro original, página 6, imagem 2.</figcaption></figure>
<figure><img src="../images/roteiro01/or-p06-03.png" alt="OR — registro original, página 6, imagem 3." width="245" height="275" loading="lazy"><figcaption>OR — registro original, página 6, imagem 3.</figcaption></figure>
<figure><img src="../images/roteiro01/or-p07-01.png" alt="OR — registro original, página 7, imagem 1." width="148" height="204" loading="lazy"><figcaption>OR — registro original, página 7, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/or-p07-02.png" alt="OR — registro original, página 7, imagem 2." width="175" height="255" loading="lazy"><figcaption>OR — registro original, página 7, imagem 2.</figcaption></figure>
<figure><img src="../images/roteiro01/or-p07-03.png" alt="OR — registro original, página 7, imagem 3." width="171" height="243" loading="lazy"><figcaption>OR — registro original, página 7, imagem 3.</figcaption></figure>
<figure><img src="../images/roteiro01/or-p07-04.png" alt="OR — registro original, página 7, imagem 4." width="171" height="249" loading="lazy"><figcaption>OR — registro original, página 7, imagem 4.</figcaption></figure>
<figure><img src="../images/roteiro01/nor-p08-01.png" alt="NOR — registro original, página 8, imagem 1." width="341" height="349" loading="lazy"><figcaption>NOR — registro original, página 8, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/nor-p09-01.png" alt="NOR — registro original, página 9, imagem 1." width="316" height="396" loading="lazy"><figcaption>NOR — registro original, página 9, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/xor-p10-01.png" alt="XOR — registro original, página 10, imagem 1." width="373" height="371" loading="lazy"><figcaption>XOR — registro original, página 10, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/xor-p11-01.png" alt="XOR — registro original, página 11, imagem 1." width="322" height="400" loading="lazy"><figcaption>XOR — registro original, página 11, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/xnor-p12-01.png" alt="XNOR — registro original, página 12, imagem 1." width="380" height="382" loading="lazy"><figcaption>XNOR — registro original, página 12, imagem 1.</figcaption></figure>
<figure><img src="../images/roteiro01/xnor-p13-01.png" alt="XNOR — registro original, página 13, imagem 1." width="278" height="343" loading="lazy"><figcaption>XNOR — registro original, página 13, imagem 1.</figcaption></figure>
</div>
## O que observar na prática

Conectar uma entrada a várias portas não altera o valor do sinal. Em NAND e NOR, a bolha no terminal representa a inversão da saída. Para mais de duas entradas, XOR expressa paridade ímpar; não significa apenas “uma entrada ligada”. Por exemplo, XOR(1,1,1) = 1.

**Consulta técnica:** [documentação oficial das portas do CircuitVerse](https://docs.circuitverse.org/chapter4/chapter4-gates/) e [implementação oficial da porta XOR](https://github.com/CircuitVerse/CircuitVerse/blob/master/simulator/src/modules/XorGate.js).

**Referências:** UNIP, Circuitos Lógicos Digitais, roteiro 1. Capturas: relatório de aulas práticas fornecido pelo autor. As tabelas do livro foram calculadas a partir das expressões indicadas; as visualizações interativas são demonstrações didáticas.
