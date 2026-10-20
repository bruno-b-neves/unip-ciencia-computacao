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