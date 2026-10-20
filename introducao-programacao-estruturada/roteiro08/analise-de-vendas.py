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