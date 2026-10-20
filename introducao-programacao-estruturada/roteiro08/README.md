# Roteiro 08 — Sequências: listas e tuplas

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

Listas e tuplas são sequências ordenadas, com indexação a partir de zero e fatiamento no formato `[início:fim:passo]`, cujo limite final é excluído. Listas são mutáveis: podem receber, perder ou substituir elementos. Tuplas são imutáveis: suas posições não podem ser alteradas após a criação, sendo úteis para agrupamentos fixos de valores.

Em listas, `append()` adiciona ao final e `insert()` insere em uma posição. `pop()` remove por índice e retorna o item; `remove()` remove por valor. A atribuição por índice modifica um elemento, `in` testa presença, `index()` localiza a primeira posição e `sort()` ordena a própria lista. `sorted()` produz uma nova lista ordenada. `len()` informa a quantidade de elementos, enquanto `sum()`, `max()` e `min()` permitem analisar valores numéricos. Os dois programas desta atividade utilizam listas.

## 2. Código-fonte comentado

O gerenciador permite adicionar, visualizar e concluir tarefas. O programa de vendas usa uma lista de valores, calcula indicadores e permite acrescentar vendas pelo menu.

### Desafio inicial — Gerenciador de tarefas

Arquivo: [programa-de-tarefas.py](programa-de-tarefas.py).

```python
# Programa de Tarefas
tarefas = []  # Lista para armazenar as tarefas do usuário
while True:
    # --- MENU PRINCIPAL --
    print("\n               MENU DE TAREFAS               \n")
    print("=============================================")
    print("\n*  1. Adicionar uma nova tarefa")
    print("*  2. Visualizar todas as tarefas")
    print("*  3. Marcar uma tarefa como concluída")
    print("*  4. Sair do programa\n")
    print("======================================")
    opcao = int(input('\nDigite o número da opção desejada:\n'))  # Lê a opção escolhida pelo usuário
    # --- OPÇÃO 1: Adicionar nova tarefa ---
    if opcao == 1:
        nova_tarefa = str(input('\nDigite a nova tarefa:\n'))  # Lê a descrição da nova tarefa
        tarefas.append(f'{nova_tarefa}')  # Adiciona a nova tarefa à lista
        print('Tarefa registrada com sucesso!\n')
    # --- OPÇÃO 2: Visualizar todas as tarefas ---
    elif opcao == 2:
        print("\n              LISTA DE TAREFAS               \n")
        for i in range(len(tarefas)):  # Percorre a lista de tarefas
            print(f'{i + 1}. {tarefas[i]}')  # Exibe cada tarefa numerada a partir de 1
    # --- OPÇÃO 3: Marcar uma tarefa como concluída ---
    elif opcao == 3:
        print("\n           MARCAR TAREFAS CONCLUÍDAS         \n")
        # Exibe todas as tarefas atuais
        for i in range(len(tarefas)):
            print(f'{i + 1}. {tarefas[i]}')
        print("\n=============================================\n")
        indice = int(input('Digite o número da tarefa concluída:\n'))  # Lê o número da tarefa a remover
        # Verifica se o número informado é válido (dentro do intervalo da lista)
        if 0 <= indice < len(tarefas):
            concluida = tarefas.pop(indice)  # Remove a tarefa selecionada da lista
            print(f"Tarefa '{concluida}' concluída e removida.")  # Confirmação ao usuário
        else:
            print('Não foi possível concluir e remover a tarefa.')  # Caso o número seja inválido
    # --- OPÇÃO 4: Sair do programa ---
    elif opcao == 4:
        print('Saindo do programa... Até mais!\n')
        break  # Encerra o loop principal (fim do programa)
```

### Ampliação — Análise de vendas

Arquivo: [analise-de-vendas.py](analise-de-vendas.py).

```python
# Programa Análise de Dados de Vendas.
vendas = [1200.50, 800.00, 950.75, 1500.00, 700.25]
# --- Loop principal do programa ---
# Mantém o menu ativo até que o usuário escolha sair.
while True:
    # --- MENU PRINCIPAL ---
    print("             MENU DE ANÁLISE DE VENDAS               ")
    print("\n1. Calcular o total de vendas")
    print("2. Exibir maior e menor venda")
    print("3. Calcular a média de vendas")
    print("4. Adicionar uma nova venda")
    print("5. Exibir todas as vendas")
    print("6. Sair do programa\n")
    print("=============================================")
    opcao = int(input("Digite o número da opção desejada:\n"))  # Lê a opção do usuário
    # 1. Calcular a venda total do período
    # Utiliza a função built-in sum() para somar todos os valores da lista.
    if opcao == 1:
        total = sum(vendas)  # Soma todas as vendas da lista
        print(f"\nO total de vendas no período é: R$ {total:.2f}")
    # 2. Encontrar a venda máxima e a venda mínima
    # Utiliza as funções built-in max() e min() para obter esses valores.
    elif opcao == 2:
        if len(vendas) > 0:  # Garante que há vendas na lista
            maior = max(vendas)
            menor = min(vendas)
            print(f"\nMaior venda: R$ {maior:.2f}")
            print(f"Menor venda: R$ {menor:.2f}")
        else:
            print("\nNão há vendas registradas para análise.")
    # 3. Calcular a média das vendas
    # Divide o total de vendas pelo número de elementos na lista.
    elif opcao == 3:
        if len(vendas) > 0:
            media = sum(vendas) / len(vendas)
            print(f"\nA média de vendas é: R$ {media:.2f}")
        else:
            print("\nNão há dados para calcular a média.")

    # 4. Permitir adicionar novas vendas à lista
    # Usa o método append() para incluir novos valores informados pelo usuário.
    elif opcao == 4:
        nova_venda = float(input("\nDigite o valor da nova venda:\nR$ "))
        vendas.append(nova_venda)  # Adiciona a nova venda à lista
        print(f"\nVenda de R$ {nova_venda:.2f} adicionada com sucesso!")

    # 5. Exibir todas as vendas registradas
    # Mostra os valores da lista com numeração usando enumerate().
    elif opcao == 5:
        if len(vendas) > 0:
            print("\nLista de vendas registradas:\n")
            for i, valor in enumerate(vendas, start=1):
                print(f"{i}. R$ {valor:.2f}")
        else:
            print("\nNenhuma venda cadastrada ainda.")

    # 6. Sair do programa
    # Encerra o loop principal e finaliza o sistema.
    elif opcao == 6:
        print("\nSaindo do programa... Até mais!")
        break  # Interrompe o while e encerra o programa
```

## 3. Verificação da solução e limitações

As cinco vendas iniciais produziram total `5151.50`, maior venda `1500.00`, menor `700.25` e média `1030.30`. Após acrescentar `100`, o total passou a `5251.50`.

**Correção pendente no gerenciador de tarefas:** a exibição começa em 1, mas pop() recebe diretamente o número digitado, como se ele fosse um índice iniciado em zero. Com duas tarefas, escolher `1` remove a segunda; com apenas uma, escolher `1` é rejeitado. É necessário converter a escolha para índice subtraindo um e validar o intervalo. Os menus também pressupõem entradas numéricas; os dados ficam somente na memória durante a execução.

**Referência:** [Roteiros de aulas práticas — Introdução à Programação Estruturada](https://drive.google.com/file/d/1wm81dvjvkJURknlRIfU1XtUoBKhSsev1/view), roteiro 08, item 6.
