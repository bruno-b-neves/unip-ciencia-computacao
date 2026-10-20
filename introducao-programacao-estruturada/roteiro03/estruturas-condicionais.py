
# * Verificação de Idade para CNH
# ? Este programa verifica se uma pessoa pode tirar a carteira de habilitação (CNH) com base em sua idade.
# ? Se a idade for maior ou igual a 18, o programa informa que a pessoa pode tirar a CNH.
# ? Caso contrário, informa que não pode.

# Leitura da data de hoje
dia_hoje = int(input('Digite o dia atual (1 a 31): ')) # Solicita ao usuário que digite o dia atual
mes_hoje = int(input('Digite o mês atual (1 a 12): ')) # Solicita ao usuário que digite o mês atual
ano_hoje = int(input('Digite o ano atual (ex: 2024): ')) # Solicita ao usuário que digite o ano atual

# Leitura da data de nascimento
dia_nascimento = int(input('Digite o dia do seu nascimento (1 a 31): ')) # Solicita ao usuário que digite o dia do seu nascimento
mes_nascimento = int(input('Digite o mês do seu nascimento (1 a 12): ')) # Solicita ao usuário que digite o mês do seu nascimento
ano_nascimento = int(input('Digite o ano do seu nascimento (ex: 2000): ')) # Solicita ao usuário que digite o ano do seu nascimento

idade = ano_hoje - ano_nascimento # Calcula a idade com base no ano atual e no ano de nascimento

# Desconta um ano se a pessoa ainda não fez aniversário neste ano
if mes_hoje < mes_nascimento:
    idade = idade - 1 # Se o mês atual for menor que o mês de nascimento, subtrai 1 da idade
elif mes_hoje == mes_nascimento and dia_hoje < dia_nascimento:
    idade = idade - 1 # Se o mês atual for igual ao mês de nascimento e o dia atual for menor que o dia de nascimento, subtrai 1 da idade

print(f"Você tem {idade} anos.") # Exibe a idade calculada

if idade >= 18:
    print("Você tem idade suficiente para tirar a CNH.") # Informa que a pessoa pode tirar a CNH
else:
    print("Você não tem idade suficiente para tirar a CNH.") # Informa que a pessoa não pode tirar a CNH

# * Ampliação do Desafio
# * Classificação de Triângulos
# ? Este programa solicita ao usuário que digite as medidas dos três lados de um 
# ? triângulo e, em seguida, classifica o triângulo com base nessas medidas.

lado1 = float(input('Digite a medida do primeiro lado do triângulo: ')) # Solicita ao usuário que digite a medida do primeiro lado
lado2 = float(input('Digite a medida do segundo lado do triângulo: ')) # Solicita ao usuário que digite a medida do segundo lado
lado3 = float(input('Digite a medida do terceiro lado do triângulo: ')) # Solicita ao usuário que digite a medida do terceiro lado

if lado1 == lado2 == lado3:
    print("O triângulo é equilátero.") # Informa que o triângulo é equilátero
elif lado1 == lado2 or lado1 == lado3 or lado2 == lado3:
    print("O triângulo é isósceles.") # Informa que o triângulo é isósceles
else:
    print("O triângulo é escaleno.") # Informa que o triângulo é escaleno