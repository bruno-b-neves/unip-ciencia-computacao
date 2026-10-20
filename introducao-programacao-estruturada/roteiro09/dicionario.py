# Sistema de Agenda Simples

# Registro inicial: cada informação é associada a uma chave.
dados = {}
dados['Endereço'] = 'Rua Aqui, 0'
dados['Telefone'] = '11996660000'
print('Registro de exemplo:', dados)

# Lê e retorna os dados de um contato, repetindo campos deixados vazios.
def ledados():
    dados = {}
    dados['Endereço'] = input('Endereço: ').strip()
    while dados['Endereço'] == '':
        dados['Endereço'] = input('Informe um endereço: ').strip()
    dados['Telefone'] = input('Telefone: ').strip()
    while dados['Telefone'] == '':
        dados['Telefone'] = input('Informe um telefone: ').strip()
    return dados

# Consulta o nome antes de acessar o dicionário interno do contato.
def mostraItem(chave):
    if chave in agenda:
        print(f"{chave} | Endereço: {agenda[chave]['Endereço']} | "
              f"Telefone: {agenda[chave]['Telefone']}")
    else:
        print('Não Localizado')

# Impede nomes vazios e a substituição acidental de um contato existente.
def criaItem():
    chave = input('Nome do novo contato: ').strip()
    if chave == '':
        print('O nome não pode ficar vazio.')
    elif chave in agenda:
        print('Esse contato já existe.')
    else:
        agenda[chave] = ledados()
        print('Contato adicionado.')

# pop() remove o contato somente quando sua chave existe.
def removeItem(chave):
    if chave in agenda:
        agenda.pop(chave)
        print('Contato removido.')
    else:
        print('Não Localizado')

# Cria a agenda com Paulo, acessa seu telefone e testa as duas consultas.
print('\nInforme os dados de Paulo:')
agenda = {}
agenda['Paulo'] = ledados()
print('Agenda:', agenda)
print('Telefone de Paulo:', agenda['Paulo']['Telefone'])
mostraItem('Paulo')
mostraItem('Maria')

# O menu repete até a escolha de sair; cada opção executa uma operação.
while True:
    print('\n1 - Criar agenda vazia\n2 - Mostrar item\n3 - Criar item'
          '\n4 - Remover item\n5 - Mostrar todos os itens\n6 - Sair')
    opcao = input('Escolha uma opção: ').strip()
    if opcao == '1':
        # Uma nova agenda vazia é criada após confirmação da limpeza.
        confirmar = input('Apagar os contatos e criar agenda vazia? (s/n): ')
        if confirmar.strip().lower() == 's':
            agenda.clear()
            print('Agenda vazia criada.')
        else:
            print('Operação cancelada.')
    elif opcao == '2':
        mostraItem(input('Nome para consulta: ').strip())
    elif opcao == '3':
        criaItem()
    elif opcao == '4':
        removeItem(input('Nome para remoção: ').strip())
    elif opcao == '5':
        if len(agenda) == 0:
            print('A agenda está vazia.')
        else:
            for chave in agenda.keys():
                mostraItem(chave)
    elif opcao == '6':
        print('Agenda encerrada.')
        break
    else:
        print('Opção inválida. Escolha de 1 a 6.')
