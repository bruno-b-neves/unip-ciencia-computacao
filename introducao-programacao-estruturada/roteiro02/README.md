# Roteiro 02 — Variáveis, Tipos de Dados e Operações em Python

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

Variáveis são nomes associados a valores que podem ser utilizados e atualizados durante a execução. Em Python, o tipo pertence ao objeto associado à variável e é identificado a partir do valor atribuído. Os tipos básicos estudados foram `int`, para números inteiros, como `357`; `float`, para números de ponto flutuante, como `1.75`; `str`, para textos, como `"Bruno"`; e `bool`, para valores lógicos, `True` ou `False`, utilizados nas condições de validação.

A função `input()` lê uma entrada e retorna uma string. Para realizar cálculos, a conversão de tipos (*type casting*) transforma essa entrada com `int()` ou `float()`. Uma conversão incompatível gera `ValueError`, que pode ser tratado com `try/except`. A função `print()` apresenta os resultados, e as f-strings permitem inserir variáveis e definir a formatação, como `.2f` para duas casas decimais. Nas operações, `/` realiza divisão, `//` retorna o quociente arredondado para baixo, `%` calcula o resto e `**` representa a potenciação.

## 2. Código-fonte comentado

A versão abaixo reúne as quatro soluções e acrescenta validação às entradas do código fornecido. A função `ler_numero()` centraliza a conversão, verifica os limites e solicita uma nova tentativa quando necessário.

```python
"""Roteiro 2: variáveis, tipos de dados, entradas e operações em Python."""

# Repete a leitura até receber o tipo e o intervalo esperados.
def ler_numero(mensagem, tipo, minimo, maximo=None, incluir_minimo=True):
    while True:
        try:
            # input() retorna str; int() ou float() realiza a conversão.
            # A troca permite usar vírgula ou ponto nos números decimais.
            valor = tipo(input(mensagem).replace(",", "."))
            limite_inferior = valor >= minimo if incluir_minimo else valor > minimo
            limite_superior = maximo is None or valor <= maximo
            if limite_inferior and limite_superior:
                return valor
            print("Valor fora do intervalo solicitado. Tente novamente.")
        except ValueError:
            # Uma conversão inválida gera ValueError, tratado sem encerrar o programa.
            print("Entrada inválida. Digite um número do tipo solicitado.")


# DESAFIO INICIAL — Consumo médio: distância dividida pelos litros consumidos.
# Litros devem ser positivos; distância pode ser zero. .2f exibe duas casas decimais.
litros_consumidos = ler_numero("Combustível consumido em litros (> 0): ", float, 0, incluir_minimo=False)
distancia_km = ler_numero("Distância percorrida em km (>= 0): ", float, 0)
consumo_medio = distancia_km / litros_consumidos
print(f"Consumo médio: {consumo_medio:.2f} km/l")

# DESAFIO INICIAL — Decomposição: // obtém o quociente inteiro e % obtém o resto.
# O intervalo de 100 a 999 garante um número positivo de três dígitos.
numero = ler_numero("Número inteiro de três dígitos (100 a 999): ", int, 100, 999)
centena = numero // 100
dezena = (numero % 100) // 10
unidade = numero % 10
print(f"{'Centena':<10}| {'Dezena':<10}| {'Unidade':<10}")
print("-" * 34)
print(f"{centena:<10}| {dezena:<10}| {unidade:<10}")

# AMPLIAÇÃO — IMC: peso em kg dividido pelo quadrado da altura em metros.
# Valores positivos evitam dados negativos e divisão por zero.
peso_kg = ler_numero("Peso em kg (> 0): ", float, 0, incluir_minimo=False)
altura_m = ler_numero("Altura em metros (> 0): ", float, 0, incluir_minimo=False)
imc = peso_kg / altura_m ** 2
print(f"IMC: {imc:.2f}")

# AMPLIAÇÃO — Binário: divisões sucessivas por 2 extraem quatro bits.
# Os restos surgem do bit menos significativo para o mais significativo.
decimal = ler_numero("Número inteiro decimal (0 a 15): ", int, 0, 15)
bit_0 = decimal % 2
quociente = decimal // 2
bit_1 = quociente % 2
quociente = quociente // 2
bit_2 = quociente % 2
quociente = quociente // 2
bit_3 = quociente % 2
print(f"Binário: {bit_3}{bit_2}{bit_1}{bit_0}")
```

## 3. Verificação e aprimoramentos

A execução foi testada com os seguintes dados e resultados:

| Solução | Entradas | Resultado |
| --- | --- | --- |
| Consumo médio | 480 km e 40 litros consumidos | 12.00 km/l |
| Decomposição | 357 | Centena 3, dezena 5 e unidade 7 |
| IMC | 70 kg e 1.75 m | 22.86 |
| Decimal para binário | 13 | 1101 |

Também foram verificados os limites `100` e `999` na decomposição e `0` e `15` na conversão binária, resultando em `0000` e `1111`. As validações rejeitam textos incompatíveis, valores negativos indevidos, números não finitos e valores fora dos intervalos. Combustível, peso e altura precisam ser positivos, evitando divisão por zero. Como aprimoramentos, o programa permite nova tentativa após erros e aceita vírgula ou ponto na entrada de números decimais.
