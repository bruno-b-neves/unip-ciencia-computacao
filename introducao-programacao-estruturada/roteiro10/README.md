# Roteiro 10 — Manipulação de arquivos de texto

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

Arquivos permitem conservar dados após encerrar o programa. A função `open()` abre o arquivo no modo escolhido: `r` lê um arquivo existente, `w` cria ou substitui o conteúdo e `a` acrescenta ao final. Embora o modo a possa criar um arquivo, a função de inserção desta solução primeiro o abre em r; portanto, é necessário criá-lo antes.

`write()` grava uma string; `\n` indica uma nova linha. `readlines()` retorna uma lista de linhas, preservando as quebras existentes, e `read()` obtém o texto completo. A apresentação usa `rstrip('\n')` para retirar a quebra final. `close()` fecha o arquivo e libera o recurso. `encoding='utf-8'` define a codificação usada na leitura e na escrita, permitindo conservar caracteres acentuados.

Na Cifra de César, cada letra é deslocada por uma chave inteira. ord() e chr() fazem a conversão entre letras e códigos, e `% 26` mantém o resultado dentro do alfabeto. A descriptografia usa o deslocamento oposto. A implementação transforma A–Z e a–z e preserva acentos, números e pontuação.

## 2. Código-fonte comentado

O desafio inicial reúne criação, leitura e inserção em arquivos. A ampliação acrescenta criptografia e descriptografia com chave. **Divergência no enunciado:** o item 6 menciona “Jogo da Forca”, mas a seção 4.2 descreve Cifra de César. Este relatório documenta os programas existentes, alinhados à seção 4.2; não há implementação de Forca.

### Desafio inicial — Gerenciamento de arquivos

Arquivo: [gerenciamento-de-arquivos.py](gerenciamento-de-arquivos.py).

```python
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
```

### Ampliação — Cifra de César

Arquivo: [criptografia-de-arquivos.py](criptografia-de-arquivos.py).

```python
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
```

## 3. Verificação da solução e limitações

Em arquivos temporários, foram confirmadas criação, inserção, leitura em UTF-8 e preservação do conteúdo ao acrescentar uma linha, inclusive quando o texto anterior não terminava em quebra de linha. Com chave `3`, `Abc XyZ! çá 123` tornou-se `Def AbC! çá 123`; a descriptografia recuperou o original. As chaves `0`, `3`, `26`, `29` e `-3` também foram verificadas.

Os menus tratam opções inválidas, e a ampliação repete chaves não inteiras e rejeita nomes de entrada e saída escritos de forma idêntica. Não há try/except; arquivos inexistentes ou caminhos inválidos ainda interrompem o programa. O modo w substitui arquivos existentes. A Cifra de César serve à demonstração didática de manipulação de texto.

**Referência:** UNIP — Roteiros de aulas práticas de Introdução à Programação Estruturada, roteiro 10, item 6.
