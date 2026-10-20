# Roteiro 05 — Laços contados: for e range()

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

O laço `for` percorre os elementos de uma sequência e executa um bloco indentado para cada elemento. A função `range(início, fim, passo)` produz uma sequência de inteiros: o início é incluído e o fim é excluído. Quando omitidos, o início vale zero e o passo vale um. Para incluir `N`, usa-se um limite final igual a `N + 1`.

Um acumulador, iniciado em zero, guarda a soma dos números visitados. Para verificar primalidade, procuram-se divisores de 2 até o número menos um com o operador `%`. `break` interrompe a busca quando um divisor é encontrado. O `else` associado ao `for` executa quando o laço termina sem `break`, inclusive se o intervalo estiver vazio. Pela definição matemática, um número primo é inteiro maior que um e possui exatamente dois divisores positivos.

## 2. Código-fonte comentado

O arquivo contém a soma dos inteiros até N e a tentativa de identificação de números primos. O código completo abaixo corresponde à versão atual, incluindo os pontos a corrigir identificados nos testes.

### Soma e verificação de número primo

Arquivo: [lacos-contados.py](lacos-contados.py).

```python
# Soma dos N Primeiros Números Inteiros:

# 1. Entrada dos dados
# Recebe um número N inteiro positivo do usuário.
numeros_inteiros = int(input('Digite um número inteiro positivo N: '))
# Inicializa a variável para armazenar o total da soma.
soma = 0

# Laço 'for' para iterar de 0 até N (o '+ 1' inclui N na contagem).
for x in range(numeros_inteiros + 1):
    # Adiciona o número atual (x) ao total da soma (soma = soma + x).
    soma += x

# Exibe o resultado da soma dos números inteiros para o usuário.
print(f'A soma dos primeiros {numeros_inteiros} números inteiros é: {soma}')

# Ampliação do Desafio: Verificação de Número Primo

# Solicita e armazena um número natural (inteiro) na variável 'numero'.
numero = int(input('Digite um número natural maior que 0: '))

# Laço for e range(), para quando um usuário digitar um numero verificar
# Inicia a busca por divisores, começando por 2 até o número digitado - 1.
for i in range(2, numero):
    # Condição: verifica se o número tem algum divisor (resto da divisão é 0).
    if (numero % i == 0):
        # Se um divisor for encontrado, o número não é primo.
        print(f'O número {numero} não é primo pois é divisivel por {i}.')
        # Para o laço imediatamente, pois já sabemos que não é primo.
        break
# O 'else' do 'for' é executado SOMENTE se o laço terminar naturalmente (ou seja, sem o 'break').
else:
    # Se o laço terminou sem encontrar divisores, o número é primo.
    print(f'O número {numero} é primo pois é divisivel por {i}')
```

## 3. Verificação da solução e limitações

Para `N = 5`, a soma resultou em `15`; começar a contagem em zero não altera esse resultado. O teste de `9` encontrou o divisor `3` e informou que o número não é primo.

**Correções pendentes no programa:** os valores `1` e `2` geram `NameError`, porque `range(2, numero)` fica vazio e `i` é usado sem ter recebido valor. É necessário tratar números menores que dois e retirar a referência a `i` da mensagem de número primo. Para `7`, a decisão de primalidade é correta, mas a mensagem diz incorretamente que ele é divisível por `6`, último valor testado. A entrada N também não é validada como positiva.

**Referência:** UNIP — Roteiros de aulas práticas de Introdução à Programação Estruturada, roteiro 05, item 6.
