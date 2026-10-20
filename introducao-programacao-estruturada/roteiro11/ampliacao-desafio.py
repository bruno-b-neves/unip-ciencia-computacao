# import permite acessar os recursos pelo nome do módulo.
# from...import disponibiliza diretamente a classe Faker.
import sys
import random
import math
from faker import Faker

# Consulta o executável Python e os locais de busca por módulos.
print('Executável Python:', sys.executable)
print('Diretórios de busca por módulos:')
for diretorio in sys.path:
    print(diretorio)

# A lista armazena os dez dicionários gerados pelo laço.
gerador = Faker('pt_BR')
agenda_ficticia = []
for numero in range(10):
    nome = gerador.name()
    endereco = gerador.address().replace('\n', ', ')
    email = gerador.email()
    nota1 = random.uniform(0, 10)
    nota2 = random.uniform(0, 10)

    # A média geométrica é a raiz quadrada do produto das notas.
    # Se qualquer nota for zero, o resultado também será zero.
    if nota1 == 0 or nota2 == 0:
        media_geometrica = 0.0
    else:
        media_geometrica = math.sqrt(nota1 * nota2)

    # As notas ficam em uma tupla; append() adiciona o registro à lista.
    registro = {
        'Nome': nome,
        'Endereço': endereco,
        'Email': email,
        'Notas': (nota1, nota2),
        'Média Geométrica': media_geometrica
    }
    agenda_ficticia.append(registro)
    print(f'Registro gerado: {nome}')

# Percorre a lista e apresenta todos os campos de cada registro.
for registro in agenda_ficticia:
    print('=' * 45)
    print(f"Nome: {registro['Nome']}")
    print(f"Endereço: {registro['Endereço']}")
    print(f"E-mail: {registro['Email']}")
    print(f"Nota 1: {registro['Notas'][0]:.2f} | "
          f"Nota 2: {registro['Notas'][1]:.2f}")
    print(f"Média geométrica: {registro['Média Geométrica']:.2f}")
print(f'Total de registros: {len(agenda_ficticia)}')
