# Roteiro 06 — Display de sete segmentos

**Bruno Neves · Ciência da Computação · UNIP · 1º semestre**

## Conceito

Um display de sete segmentos representa símbolos acendendo combinações de sete barras. As saídas a,b,c,d,e,f,g indicam, respectivamente, a barra superior, superior direita, inferior direita, inferior, inferior esquerda, superior esquerda e central. Neste livro, 1 significa segmento aceso.

O circuito proposto usa entradas decimais E0…E9 e sete saídas, uma para cada segmento. O laboratório também mostra o código binário de quatro bits correspondente ao símbolo selecionado. As letras b e d são minúsculas para evitar confusão com 8 e 0.

## Acenda os segmentos

<div data-lab="display"></div>

## Tabela-verdade: números e ampliação hexadecimal

| Símbolo | 8 | 4 | 2 | 1 | a | b | c | d | e | f | g |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 2 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |
| 3 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
| 4 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 5 | 0 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |
| 6 | 0 | 1 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 1 | 1 |
| 7 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 8 | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 9 | 1 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |
| A | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | 1 | 1 |
| b | 1 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | 1 | 1 | 1 |
| C | 1 | 1 | 0 | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 0 |
| d | 1 | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 1 | 0 | 1 |
| E | 1 | 1 | 1 | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 1 |
| F | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 | 1 | 1 |

## Codificador decimal de dez entradas

Com uma única entrada E ativa, cada saída de segmento é uma OR das entradas dos dígitos que o utilizam:

**Segmento a:** `E0 + E2 + E3 + E5 + E6 + E7 + E8 + E9`.

**Segmento b:** `E0 + E1 + E2 + E3 + E4 + E7 + E8 + E9`.

**Segmento c:** `E0 + E1 + E3 + E4 + E5 + E6 + E7 + E8 + E9`.

**Segmento d:** `E0 + E2 + E3 + E5 + E6 + E8 + E9`.

**Segmento e:** `E0 + E2 + E6 + E8`.

**Segmento f:** `E0 + E4 + E5 + E6 + E8 + E9`.

**Segmento g:** `E2 + E3 + E4 + E5 + E6 + E8 + E9`.

Ligue cada uma dessas sete saídas ao terminal do segmento correspondente. Não conecte o código BCD de quatro bits diretamente aos sete terminais: é necessário realizar a decodificação.

## Ampliação: letras A, b, C, d, E e F

| Letra | Segmentos acesos |
| --- | --- |
| A | a, b, c, e, f, g |
| b | c, d, e, f, g |
| C | a, d, e, f |
| d | b, c, d, e, g |
| E | a, d, e, f, g |
| F | a, e, f, g |

## Registro da prática

O relatório fornecido não contém capturas desta atividade. O display deste capítulo é uma visualização didática criada para o livro. Para completar a evidência no CircuitVerse, monte as sete saídas e registre os dígitos 0…9 e as seis letras, comparando-os com a tabela.

**Referências:** UNIP, Circuitos Lógicos Digitais, roteiro 6. As tabelas do livro foram calculadas a partir das expressões indicadas; as visualizações interativas são demonstrações didáticas.
