# Roteiro 02 — Variáveis, tipos de dados e operações

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

Variáveis associam nomes a valores usados no programa. Em Python, o tipo pertence ao valor: `int` representa inteiros; `float`, números com parte decimal; `str`, textos; e `bool`, os valores lógicos `True` e `False`. O tipo booleano é apresentado na teoria, mas não é usado diretamente nestas soluções.

A função `input()` lê dados como texto. A conversão de tipos, ou *type casting*, usa funções como `int()` e `float()` para permitir cálculos. A função `print()` exibe os resultados, e f-strings podem formatá-los com `.2f`. Nos cálculos, `/` faz divisão, `//` obtém o quociente inteiro, `%` obtém o resto e `**` calcula uma potência. Combinar divisão inteira e resto permite separar dígitos e obter bits sem usar bibliotecas.

## 2. Código-fonte comentado

O arquivo reúne consumo médio, decomposição de um número de três dígitos, cálculo de IMC e conversão decimal para binário de 0 a 15. A solução usa operações básicas, sem funções próprias ou bibliotecas.

### Desafio inicial e ampliação

Arquivo: [variaveis-tipo-operacoes.py](variaveis-tipo-operacoes.py).

```python
# Consumo Médio de Combustível
# Este programa calcula o consumo médio de combustível de um veículo com base na
# distância percorrida e na quantidade de combustível consumida. O consumo médio
# é calculado dividindo a distância percorrida pela quantidade de combustível
# consumida.

combustivel = float(input('Digite a quantidade de combustível abastecida (em litros): ')) # Solicita ao usuário que digite a quantidade de combustível abastecida
distancia = float(input('Digite a distância percorrida (em km): ')) # Solicita ao usuário que digite a distância percorrida

medio = distancia / combustivel # Calcula o consumo médio de combustível

print(f'O consumo médio de combustível do veículo é: {medio:.2f} km/l') # Exibe o consumo médio de combustível com duas casas decimais

# Decompondo um Número de Três Dígitos
# Este programa solicita ao usuário que digite um número inteiro de três dígitos
# e, em seguida, decompõe esse número em suas centenas, dezenas e unidades. O
# programa utiliza operações matemáticas para extrair cada dígito do número e
# exibe os resultados na tela.

numero = int(input('Digite um número inteiro de três dígitos: (ex: 357) ')) # Solicita ao usuário que digite um número inteiro de três dígitos

centena = numero // 100 # Calcula a centena do número
dezena = (numero % 100) // 10 # Calcula a dezena do número
unidade = numero % 10 # Calcula a unidade do número

print(f"{'Centena':<10}| {'Dezena':<10}| {'Unidade':<10}", sep="\t") # Exibe a centena do número com alinhamento à esquerda
print("-" * 35) # Exibe uma linha separadora
print(f"{centena:<10}| {dezena:<10}| {unidade:<10}", sep="\t") # Exibe a dezena do número com alinhamento à esquerda

# * Ampliação do Desafio
# * Cálculo de IMC (Índice de Massa Corporal) *
# ? Este programa solicita ao usuário que digite seu peso (em kg) e altura
# ? (em metros) e, em seguida, calcula o Índice de Massa Corporal (IMC)
# ? utilizando a fórmula: IMC = peso / altura ** 2. O programa exibe o
# ? resultado do IMC na tela com duas casas decimais.

peso = float(input('Digite seu peso (em kg): ')) # Solicita ao usuário que digite seu peso
altura = float(input('Digite sua altura (em metros): ')) # Solicita ao usuário que digite sua altura

imc = peso / altura ** 2

print(f'Seu IMC é: {imc:.2f}') # Exibe o resultado do IMC com duas casas decimais

# * Conversão de decimal para binário (0 a 15)
# ? Este programa solicita ao usuário que digite um número inteiro decimal entre
# ? 0 e 15 e, em seguida, converte esse número para sua representação binária.
# ? O programa exibe o resultado na tela.

decimal = int(input('Digite um número inteiro decimal entre 0 e 15: ')) # Solicita ao usuário que digite um número inteiro decimal entre 0 e 15

b0 = decimal % 2 # Calcula o bit menos significativo (b0)
num = decimal // 2 # Atualiza o número dividindo por 2
b1 = num % 2 # Calcula o bit 1
num = num // 2 # Atualiza o número dividindo por 2
b2 = num % 2 # Calcula o bit 2
num = num // 2 # Atualiza o número dividindo por 2
b3 = num % 2 # Calcula o bit 3

print(f"{b3}{b2}{b1}{b0}")
```

## 3. Verificação da solução e limitações

Foram informados, em sequência, `40` litros, `480` km, o número `357`, peso `70`, altura `1.75` e decimal `13`. Os resultados foram `12.00 km/l`, dígitos `3`, `5` e `7`, IMC `22.86` e binário `1101`.

O exercício evidencia a necessidade de converter os textos de entrada antes de calcular. A versão pressupõe combustível e altura maiores que zero, número de três dígitos e decimal entre 0 e 15. Não há validação desses limites nem tratamento de entradas não numéricas. O cálculo de IMC é apenas uma atividade de operações aritméticas.

**Referência:** [Roteiros de aulas práticas — Introdução à Programação Estruturada](https://drive.google.com/file/d/1wm81dvjvkJURknlRIfU1XtUoBKhSsev1/view), roteiro 02, item 6.
