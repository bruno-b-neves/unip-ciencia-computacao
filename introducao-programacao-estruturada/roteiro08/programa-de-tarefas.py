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