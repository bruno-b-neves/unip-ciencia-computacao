# Roteiro 04 — Laços não contados: while

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

O laço `while` repete um bloco enquanto uma condição é verdadeira. Sua estrutura é `while condição:`, seguida de instruções indentadas. Como o teste ocorre antes do bloco, ele pode não executar nenhuma vez. Uma variável de controle deve ser atualizada para que a condição possa se tornar falsa; `break` permite encerrar o laço imediatamente.

A estrutura `do-while`, existente em outras linguagens, executa o bloco antes de testar a condição, garantindo ao menos uma execução. Python não tem essa instrução, mas permite simular o comportamento com `while True`, executando o bloco e usando `if` com `break` ao final. Outra possibilidade é executar a primeira leitura antes do `while` e repetir as próximas leituras dentro dele. No login desta solução, a primeira leitura é garantida porque o contador começa em zero e o limite é três.

## 2. Código-fonte comentado

O primeiro trecho solicita números até encontrar cinco pares digitados, conforme a descrição da atividade. O segundo permite acertar uma senha em até três tentativas.

### Cinco números pares e login com tentativas limitadas

Arquivo: [lacos-nao-contados.py](lacos-nao-contados.py).

```python

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
```

## 3. Verificação da solução e limitações

Com `1, 2, 3, 4, 6, 8, 10`, apenas os cinco pares foram apresentados e contabilizados. A senha `123456` concedeu acesso e interrompeu o laço; três senhas incorretas produziram o bloqueio.

O contador de pares avança somente quando o resto da divisão por dois é zero. No login, o contador avança a cada erro. A senha fixa atende à demonstração didática, e não representa um sistema real de autenticação. Entradas não numéricas na primeira parte ainda causam erro de conversão.

**Referência:** [Roteiros de aulas práticas — Introdução à Programação Estruturada](https://drive.google.com/file/d/1wm81dvjvkJURknlRIfU1XtUoBKhSsev1/view), roteiro 04, item 6.
