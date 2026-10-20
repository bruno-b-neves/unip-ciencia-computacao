"""Exibe dados e explora a formatação de saídas com print() em Python."""

# Dados iniciais: textos, números inteiros e altura em metros.
nome = "Bruno"
idade = 30
cidade = "São Paulo"
profissao = "Desenvolvedor Frontend"
altura = 1.70

# Cada print() exibe uma variável e termina com uma quebra de linha.
print(nome)
print(idade)
print(cidade)
print(profissao)

# A f-string insere variáveis na mensagem; 03d preenche o inteiro com zeros.
print(f"Olá, meu nome é {nome}, tenho {idade} anos, "
      f"moro em {cidade} e trabalho como {profissao}.")
print(f"Idade: {idade:03d}.")

# .format() aplica duas casas decimais; sep define o separador entre argumentos.
print("Altura: {:.2f}m".format(altura))
print(nome, cidade, sep=" - ")

# input() lê texto; int() converte a idade informada para um número inteiro.
userNome = input("Digite seu nome: ")
userIdade = int(input("Digite sua idade: "))
userCor = input("Digite sua cor favorita: ")

# end define o término da saída: um ponto seguido de quebra de linha.
print(f"Que legal, {userNome}! Então você tem {userIdade} anos "
      f"e adora a cor {userCor}", end=".\n")
print("Que legal", userNome, "!", "Então você tem", userIdade,
      "anos e adora a cor", userCor, sep=" - ", end=".\n")

# <15 alinha cada campo à esquerda em uma largura mínima de 15 caracteres.
print(f"{'Nome':<15}| {'Idade':<15}| {'Cor Favorita':<15}")
print("-" * 49)
print(f"{userNome:<15}| {userIdade:<15}| {userCor:<15}")
