# Roteiro 07 — Manipulação de strings

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

Strings são sequências imutáveis de caracteres: uma operação gera outra string em vez de alterar o texto original. A indexação começa em zero, índices negativos contam a partir do final e o fatiamento seleciona trechos. `+` concatena, `*` repete e `len()` informa o tamanho. `replace()` substitui trechos, `count()` conta ocorrências não sobrepostas, `find()` retorna a posição de uma ocorrência ou `-1`, `split()` divide o texto e `upper()`/`lower()` alteram a caixa.

`ord()` retorna o código Unicode de um caractere e `chr()` faz a operação inversa. A tabela ASCII é um conjunto de 128 códigos, incluído no Unicode, que padroniza caracteres básicos como letras sem acento, dígitos e sinais. Esses conceitos ajudam a entender comparações e transformações de texto; ord() e chr() não são usados nos dois desafios deste arquivo.

## 2. Código-fonte comentado

O primeiro trecho remove espaços e ignora diferenças de caixa para verificar palíndromos. O segundo percorre as palavras e compara fatias para contar ocorrências, inclusive sobrepostas, sem usar count().

### Palíndromos e contador de ocorrências

Arquivo: [manipulacao-strings.py](manipulacao-strings.py).

```python
# Verificador de Palíndromos
# --- Entrada de dados ---
frase = str(input('Digite uma frase: '))  # Solicita ao usuário uma palavra ou frase
frase = frase.lower().replace(" ", "")    # Converte tudo para minúsculo e remove espaços em branco
inverter = ''                             # Variável usada para armazenar a frase invertida (precisa ser string)
# --- Inversão da frase ---
# Percorre cada posição da string original de trás para frente
for n in range(len(frase)):
    inverter += frase[(len(frase) - 1) - n]  # Concatena os caracteres em ordem inversa
# Exibe a frase invertida (sem quebra de linha após)
print(inverter, end="")
# --- Verificação do palíndromo ---
# Compara a frase original (sem espaços e minúscula) com sua versão invertida
if frase in inverter:
    print(f'\n\nA frase "{frase}" é um palíndromo!')
else:
    print(f'\n\nA frase "{frase}" não é um palíndromo!')

# Ampliação do Desafio: Contador de Ocorrências de Palavras

# --- Entrada de dados ---
frase = str(input('Digite uma frase:')).upper()   # Lê uma frase e converte para maiúsculas (ignora diferenças entre maiúsculas/minúsculas)
palavra = str(input('Digite uma palavra:')).upper()  # Lê a palavra a ser buscada e converte para maiúsculas

contador = 0  # Variável que armazenará o total de ocorrências encontradas
# --- Contagem das ocorrências ---
# Percorre cada palavra da frase separada por espaços
for item in frase.split():
    # Percorre cada posição dentro da palavra atual, permitindo encontrar a palavra mesmo dentro de outra
    for i in range(len(item) - len(palavra) + 1):
        # Verifica se o trecho atual da palavra é igual à palavra buscada
        if item[i:i + len(palavra)] == palavra:
            contador += 1  # Incrementa o contador caso haja correspondência
# --- Saída de dados ---
# Exibe o total de vezes que a palavra aparece na frase
print(f"A palavra '{palavra}' ocorre {contador} vezes na frase.")
```

## 3. Verificação da solução e limitações

A frase `Roma me tem amor` foi identificada como palíndromo e `Python` como não palíndromo. Na frase `ANA E MARIANA GOSTAM DE BANANA`, a busca por `ANA` encontrou quatro ocorrências, conforme o exemplo do roteiro: uma em ANA, uma em MARIANA e duas sobrepostas em BANANA.

A contagem busca trechos internos, e não apenas palavras inteiras. O teste de palíndromo usa `in`; como o texto e sua inversão têm o mesmo tamanho, ele funciona para os exemplos, embora `==` expresse a intenção com mais clareza. Entradas vazias não são rejeitadas; pontuação e acentos não são normalizados.

**Referência:** UNIP — Roteiros de aulas práticas de Introdução à Programação Estruturada, roteiro 07, item 6.
