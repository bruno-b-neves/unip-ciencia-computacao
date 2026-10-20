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