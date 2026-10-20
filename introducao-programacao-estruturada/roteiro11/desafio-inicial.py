# random pertence à biblioteca padrão; Faker é instalado separadamente com pip.
import random
import Faker

# Configura o gerador para produzir dados fictícios em português do Brasil.
gerador = Faker('pt_BR')
nome = gerador.name()
endereco = gerador.address().replace('\n', ', ')
email = gerador.email()

# uniform() gera números de ponto flutuante no intervalo de 0 a 10.
nota1 = random.uniform(0, 10)
nota2 = random.uniform(0, 10)

# As notas são apresentadas com duas casas decimais.
print('=== DADOS FICTÍCIOS ===')
print(f'Nome: {nome}')
print(f'Endereço: {endereco}')
print(f'E-mail: {email}')
print(f'Nota 1: {nota1:.2f} | Nota 2: {nota2:.2f}')
