# AMPLIAÇÃO — Gerenciamento de arquivos com Cifra de César.
# Crie os arquivos antes de ler/inserir. As operações usam open() e close().

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

# Desloca apenas A-Z e a-z. Acentos, números e pontuação são preservados.
def cifra_cesar(texto, chave):
    resultado = ''
    for caractere in texto:
        if 'a' <= caractere <= 'z':
            inicio = ord('a')
        elif 'A' <= caractere <= 'Z':
            inicio = ord('A')
        else:
            resultado = resultado + caractere
            continue
        # % 26 faz o deslocamento voltar ao início do alfabeto após Z ou z.
        posicao = (ord(caractere) - inicio + chave) % 26
        resultado = resultado + chr(inicio + posicao)
    return resultado

# A mesma operação serve para cifrar e decifrar, invertendo o sinal da chave.
def transformar_arquivo(operacao):
    entrada = input('Arquivo de entrada .txt: ').strip()
    saida = input('Arquivo de saída .txt: ').strip()
    if entrada == saida:
        print('Use nomes diferentes para os arquivos de entrada e saída.')
        return
    chave = input('Chave de deslocamento (número inteiro): ').strip()
    # Aceita um inteiro positivo, zero ou um inteiro com sinal negativo.
    while not (chave.isdecimal() or (chave.startswith('-') and chave[1:].isdecimal())):
        chave = input('Chave inválida. Digite um número inteiro: ').strip()
    chave = int(chave)
    if operacao == 'descriptografar':
        chave = -chave
    arquivo = open(entrada, 'r', encoding='utf-8')
    texto = arquivo.read()
    arquivo.close()
    resultado = cifra_cesar(texto, chave)
    arquivo = open(saida, 'w', encoding='utf-8')
    arquivo.write(resultado)
    arquivo.close()
    print(f'Arquivo gerado: {saida}')

# As cinco funcionalidades da ampliação ficam disponíveis no mesmo menu.
def menu_criptografia():
    print('\n1 - Criar arquivo\n2 - Inserir texto\n3 - Ler arquivo'
          '\n4 - Criptografar\n5 - Descriptografar\n6 - Sair')
    return input('Escolha uma opção: ').strip()

while True:
    opcao = menu_criptografia()
    if opcao == '1':
        criar_arquivo()
    elif opcao == '2':
        adicionar_ao_arquivo()
    elif opcao == '3':
        ler_arquivo()
    elif opcao == '4':
        transformar_arquivo('criptografar')
    elif opcao == '5':
        transformar_arquivo('descriptografar')
    elif opcao == '6':
        print('Programa encerrado.')
        break
    else:
        print('Opção inválida. Escolha de 1 a 6.')
