""" 
    Ambiente de Programação & Saídas 
            
    Este roteiro tem como objetivo apresentar o ambiente de programação e as saídas de dados em Python.
    Utiliza a função print() para exibir informações na tela.
    Explora as diversas funcionalidades para exibir informações na tela, formatar saídas
    e comunicar-se efetivamente com o usuário.    
"""

nome = "Bruno" # Variável representando o nome do usuário
idade = 30 # Variável representando a idade do usuário
cidade = "São Paulo" # Variável representando a cidade do usuário
profissao = "Desenvolvedor Frontend" # Variável representando a profissão do usuário
altura = 170 # Variável representando a altura do usuário

print(nome) # Exibe o nome do usuário
print(idade) # Exibe a idade do usuário
print(cidade) # Exibe a cidade do usuário
print(profissao) # Exibe a profissão do usuário

print(f"Olá, meu nome é {nome}, tenho {idade} anos, moro em {cidade} e trabalho como {profissao}.") # Exibe uma mensagem formatada com as informações do usuário
print(f"Idade: {idade:03d}.")  # Exibe a idade com 3 dígitos, preenchendo com zero à esquerda se necessário

print('Altura: {:.2f}m'.format(altura))  # Exibe a altura com 2 casas decimais
print(nome, cidade, sep=' - ') # Exibe o nome e a cidade separados por " - "
