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