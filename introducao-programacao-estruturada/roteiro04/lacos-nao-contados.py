
# * Imprimindo os Cinco Primeiros Números Pares
# ? Este programa imprime os cinco primeiros números pares.

pares_encontrados = 0 # Variável para contar os números pares encontrados

while pares_encontrados < 5: # Loop continua até encontrar 5 números pares
    numero = int(input("Digite um número inteiro: ")) # Solicita ao usuário que digite um número inteiro

    if numero % 2 == 0: # Verifica se o número é par
        print(f"-> {numero} é par.") # Imprime o número par encontrado
        pares_encontrados = pares_encontrados + 1 # Incrementa o contador de números pares encontrados

print(f"Fim do programa. Foram encontrados {pares_encontrados} números pares.") # Imprime a quantidade total de números pares encontrados

# Ampliação do Desafio: Login com Tentativas Limitadas
# O programa abaixo solicita ao usuário que digite uma senha. O usuário tem um 
# número limitado de tentativas para acertar a senha correta. Se o usuário 
# digitar a senha correta, o acesso é concedido; caso contrário, o acesso é 
# bloqueado após exceder o número máximo de tentativas.

senha_correta = "123456" # Define a senha correta que o usuário deve digitar
tentativas = 0 # Variável para contar o número de tentativas feitas pelo usuário
limite_tentativas = 3 # Define o número máximo de tentativas permitidas

while (tentativas < limite_tentativas): # Loop continua enquanto o número de tentativas for menor que o limite
  senha_digitada = input("Digite a senha: ") # Solicita ao usuário que digite a senha
  if senha_digitada == senha_correta: # Verifica se a senha digitada é igual à senha correta
    print("Senha correta! Acesso concedido.") # Imprime mensagem de acesso concedido
    break # Sai do loop quando a senha está correta
  else: # Se a senha digitada estiver incorreta
    tentativas += 1 # Incrementa o contador de tentativas
    print('Senha incorreta. Você tem mais', limite_tentativas - tentativas, "tentativas") # Informa ao usuário quantas tentativas ainda restam

    if (tentativas == limite_tentativas): # Verifica se o número de tentativas atingiu o limite
      print('Acesso bloqueado excesso de tentativas') # Informa ao usuário que o acesso foi bloqueado devido ao excesso de tentativas