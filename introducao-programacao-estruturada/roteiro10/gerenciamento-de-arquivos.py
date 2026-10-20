# DESAFIO INICIAL — Criar, ler e adicionar conteúdo a arquivos de texto.
# Crie o arquivo antes de ler ou inserir conteúdo. Não é utilizado try/except.

# Cria um arquivo vazio. O modo w substitui o conteúdo se ele já existir.
def criar_arquivo():
    nome = input('Nome do arquivo .txt: ').strip()
    arquivo = open(nome, 'w', encoding='utf-8')
    arquivo.close()
    print(f'Arquivo criado: {nome}')

# readlines() retorna as linhas; rstrip remove a quebra sem apagar espaços finais.
def ler_arquivo():
    nome = input('Nome do arquivo .txt: ').strip()
    arquivo = open(nome, 'r', encoding='utf-8')
    linhas = arquivo.readlines()
    arquivo.close()
    print('--- CONTEÚDO DO ARQUIVO ---')
    for linha in linhas:
        print(linha.rstrip('\n'))

# Consulta a última linha antes de acrescentar o texto no modo a.
def adicionar_ao_arquivo():
    nome = input('Nome do arquivo .txt: ').strip()
    texto = input('Texto a adicionar: ')
    arquivo = open(nome, 'r', encoding='utf-8')
    linhas = arquivo.readlines()
    arquivo.close()
    arquivo = open(nome, 'a', encoding='utf-8')
    # Garante uma nova linha mesmo se o arquivo existente terminar sem \n.
    if len(linhas) > 0 and not linhas[-1].endswith('\n'):
        arquivo.write('\n')
    arquivo.write(texto + '\n')
    arquivo.close()
    print('Texto adicionado.')

# Mostra as opções; a leitura como texto permite tratar uma opção inválida.
def menu_sistema_gerenciamento_arquivo():
    print('\n1 - Criar arquivo\n2 - Ler arquivo\n3 - Inserir conteúdo\n4 - Sair')
    return input('Escolha uma opção: ').strip()

# O programa continua até que o usuário escolha a opção 4.
while True:
    opcao = menu_sistema_gerenciamento_arquivo()
    if opcao == '1':
        criar_arquivo()
    elif opcao == '2':
        ler_arquivo()
    elif opcao == '3':
        adicionar_ao_arquivo()
    elif opcao == '4':
        print('Programa encerrado.')
        break
    else:
        print('Opção inválida. Escolha de 1 a 4.')
