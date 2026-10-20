# Roteiro 03 — Estruturas Condicionais em Python

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

As estruturas condicionais permitem tomar decisões e controlar o fluxo de execução de um programa. O comando `if` verifica uma condição e executa seu bloco quando ela é verdadeira. O `elif` verifica uma condição alternativa quando as anteriores não foram atendidas. O `else` executa o bloco final quando nenhuma condição da sequência foi satisfeita. Em uma sequência de `if`, `elif` e `else`, apenas o primeiro bloco cuja condição é verdadeira é executado; o `else` é utilizado quando nenhum deles se aplica.

Os blocos são identificados pela indentação, normalmente com quatro espaços. Operadores como `>=`, `<` e `==` permitem comparar valores. O operador `and` exige que as condições combinadas sejam verdadeiras, enquanto `or` exige que pelo menos uma seja verdadeira. No exercício, essas estruturas verificam se o aniversário já ocorreu e permitem classificar um triângulo a partir das medidas dos lados.

## 2. Código-fonte comentado

O código mantém a solução sequencial do exercício, utilizando entradas, operações e condições. Na classificação de triângulos, foi acrescentada a verificação de lados positivos e da condição de existência antes da classificação.

```python
# DESAFIO INICIAL — Verificação de idade para CNH.
# input() lê os dados; int() permite comparar e calcular os valores numéricos.
# As datas informadas devem ser válidas e o nascimento não pode estar no futuro.
dia_hoje = int(input('Digite o dia atual (1 a 31): '))
mes_hoje = int(input('Digite o mês atual (1 a 12): '))
ano_hoje = int(input('Digite o ano atual: '))
dia_nascimento = int(input('Digite o dia do seu nascimento (1 a 31): '))
mes_nascimento = int(input('Digite o mês do seu nascimento (1 a 12): '))
ano_nascimento = int(input('Digite o ano do seu nascimento: '))

# A diferença entre os anos é ajustada se o aniversário ainda não aconteceu.
idade = ano_hoje - ano_nascimento
if mes_hoje < mes_nascimento:
    idade = idade - 1
elif mes_hoje == mes_nascimento and dia_hoje < dia_nascimento:
    idade = idade - 1

# A condição separa as pessoas que atingiram 18 anos das que ainda não atingiram.
print(f'Você tem {idade} anos.')
if idade >= 18:
    print('Você tem idade suficiente para tirar a CNH.')
else:
    print('Você não tem idade suficiente para tirar a CNH.')

# AMPLIAÇÃO — Leitura das medidas com float() para aceitar casas decimais.
lado1 = float(input('Digite a medida do primeiro lado do triângulo: '))
lado2 = float(input('Digite a medida do segundo lado do triângulo: '))
lado3 = float(input('Digite a medida do terceiro lado do triângulo: '))

# Antes de classificar, verifica se os lados são positivos e formam um triângulo.
# A soma de quaisquer dois lados deve ser maior que o terceiro lado.
if lado1 <= 0 or lado2 <= 0 or lado3 <= 0:
    print('As medidas dos lados devem ser maiores que zero.')
elif lado1 + lado2 <= lado3 or lado1 + lado3 <= lado2 or lado2 + lado3 <= lado1:
    print('As medidas informadas não formam um triângulo.')
# Três lados iguais: equilátero; dois iguais: isósceles; todos diferentes: escaleno.
elif lado1 == lado2 == lado3:
    print('O triângulo é equilátero.')
elif lado1 == lado2 or lado1 == lado3 or lado2 == lado3:
    print('O triângulo é isósceles.')
else:
    print('O triângulo é escaleno.')
```

## 3. Verificação e aprimoramentos

Os testes de idade consideraram a data atual informada como **20/10/2026**:

| Situação testada | Resultado obtido |
| --- | --- |
| Nascimento em 21/10/2008 | 17 anos; ainda não atingiu a idade solicitada. |
| Nascimento em 20/10/2008 | 18 anos; atingiu a idade solicitada. |
| Lados 3, 3 e 3 | Triângulo equilátero. |
| Lados 3, 3 e 4 | Triângulo isósceles. |
| Lados 3, 4 e 5 | Triângulo escaleno. |
| Lados 1, 2 e 3 | As medidas não formam um triângulo. |
| Lados 0, 3 e 3 | Medida inválida: os lados devem ser positivos. |

O ajuste da idade por mês e dia evita considerar apenas a diferença entre os anos. Como aprimoramento, a verificação das medidas impede a classificação de figuras que não são triângulos. A execução pressupõe entradas numéricas, datas válidas e nascimento anterior ou igual à data atual; o código não faz a validação completa do calendário.
