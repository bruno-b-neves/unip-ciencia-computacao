# Roteiro 09 — Dicionários: agenda de contatos

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

Dicionários armazenam pares de chave e valor. As chaves são únicas e permitem localizar informações diretamente; os valores podem se repetir e podem ser outros dicionários. São estruturas mutáveis: permitem inserir, alterar e remover dados. Em Python 3.7 ou superior, preservam a ordem de inserção, sem ordenar automaticamente as chaves.

Na agenda, o nome identifica um contato e seu valor reúne endereço e telefone. A expressão `agenda['Paulo']['Telefone']` acessa um campo do registro. `in` verifica a existência da chave, `keys()` permite percorrê-las, `pop()` remove um item e `clear()` esvazia a estrutura. Telefones são armazenados como strings para preservar zeros iniciais. Dicionários organizam os dados, enquanto funções separam a leitura, a consulta, o cadastro e a remoção.

## 2. Código-fonte comentado

O programa apresenta um registro de exemplo, cadastra Paulo e demonstra consultas. Depois, um menu permite limpar a agenda, adicionar, consultar, remover e listar contatos.

### Sistema completo de agenda

Arquivo: [dicionario.py](dicionario.py).

```python
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
```

## 3. Resultados e discussão

Os testes cadastraram Ana, consultaram seu endereço e telefone e removeram o contato. Também confirmaram a mensagem `Não Localizado`, a rejeição de nome repetido ou vazio, a repetição de endereço/telefone vazios, o tratamento de opção inválida e a confirmação antes de limpar a agenda. O telefone com zero inicial foi preservado.

A prática evidencia a diferença entre a chave que identifica o contato e o dicionário interno que guarda seus dados. Verificar a existência da chave antes de acessar ou remover evita consultas a contatos ausentes. As funções reutilizam a leitura e a apresentação. A agenda permanece apenas em memória e não conserva contatos ao encerrar.

**Capturas de tela exigidas pelo item 6 — pendentes:**

- [ ] Adicionar: capturar o cadastro de Ana e a mensagem `Contato adicionado.`.
- [ ] Mostrar: consultar Ana e capturar seu endereço e telefone.
- [ ] Remover: capturar `Contato removido.` e uma nova consulta com `Não Localizado`.

Execute o cadastro inicial de Paulo antes de usar o menu. Utilize dados fictícios nas imagens. Os testes confirmam os resultados descritos, mas não substituem as capturas solicitadas.

**Referência:** UNIP — Roteiros de aulas práticas de Introdução à Programação Estruturada, roteiro 09, item 6.
