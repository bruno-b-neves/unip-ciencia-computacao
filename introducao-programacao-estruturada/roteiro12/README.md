# Roteiro 12 — Python e banco de dados SQLite

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

SQLite é um banco de dados relacional embarcado: funciona dentro da aplicação, sem um servidor separado. Os dados podem ser armazenados em um único arquivo. O módulo sqlite3, da biblioteca padrão do Python, oferece conexão, cursores e execução de comandos SQL. `connect()` abre ou cria o arquivo, e `cursor()` fornece um objeto para realizar operações.

`SELECT` consulta registros, `INSERT` insere, `UPDATE` altera e `DELETE` remove. A cláusula WHERE limita quais registros são atingidos; `LIKE` permite buscar parte de um nome, usando `%` para representar uma sequência de caracteres. Placeholders `?` separam os valores do texto SQL, evitando montar consultas pela concatenação de dados informados pelo usuário.

Após alterações, `commit()` confirma a transação. `close()` encerra o cursor ou a conexão, mas não substitui a confirmação explícita dos dados. `executescript()` executa um conjunto de instruções SQL; nesta solução, ele prepara a tabela e os registros iniciais.

## 2. Código-fonte comentado

O primeiro arquivo cria a tabela, lista alunos e demonstra inserção e atualização. O segundo oferece listagem, cadastro, atualização de semestre, remoção, busca por nome e saída. Os comentários detalham a conexão, o SQL, os parâmetros e o menu.

### Desafio inicial — Conexão e listagem

Arquivo: [conexao-banco-de-dados.py](conexao-banco-de-dados.py).

```python
# Importa o módulo sqlite3, que permite criar e manipular bancos de dados SQLite.
import sqlite3

# Importa a função python_version para exibir a versão atual do Python.
from platform import python_version

# Exibe a versão do Python sendo utilizada.
print(python_version())

# Cria (ou abre, se já existir) um arquivo de banco de dados SQLite chamado 'banco_dados.db'.
bd = sqlite3.connect('banco_dados.db')

# Cria um objeto cursor, responsável por executar comandos SQL no banco.
Cursor = bd.cursor()

# Script SQL que cria a tabela de alunos e insere registros iniciais.
sql_script_aluno = """
DROP TABLE IF EXISTS aluno;   -- Apaga a tabela 'aluno' se ela existir.

-- Cria a tabela 'aluno' com colunas id, nome, semestre e curso.
CREATE TABLE aluno
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome CHAR(15),
  semestre INTEGER,
  curso CHAR(10)
);

-- Inserção de registros iniciais na tabela.
INSERT INTO aluno (nome, semestre, curso) VALUES ("Armando Dias", 3, "CC");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Danila Carmo", 4, "SI");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Armando Dias", 2, "CC");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Felipe Dias", 1, "SI");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Erick Dias", 2, "SI");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Emily Dias", 2, "CC");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Mirian Dias", 8, "CC");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Gilson Dias", 4, "CC");
"""

# Executa todo o bloco SQL acima (criação da tabela + inserções).
Cursor.executescript(sql_script_aluno)

# Confirma (salva) as alterações no banco de dados.
bd.commit()

print('Table criada com sucesso!')

# Realiza uma consulta que retorna todos os registros da tabela aluno.
Consulta = Cursor.execute("SELECT * from aluno")

# Exibe todos os registros da tabela aluno.
print("\n --- Dados da tabela Aluno ---")
for linha in Consulta:
    print(linha)

# Insere um novo aluno utilizando parâmetros ao invés de valores diretos (boa prática).
Cursor.execute('INSERT INTO aluno (nome, semestre, curso) VALUES (?,?,?)',
               ('Bruno Neves', 1, 'CC'))

# Confirma a inserção.
bd.commit()

# Busca especificamente o aluno com id = 9 (o recém-inserido).
Consulta = Cursor.execute("SELECT * from aluno WHERE id = 9").fetchall()
print('\n --- Novo aluno adicionado com sucesso ---')

# Exibe o novo registro inserido.
for linha in Consulta:
    print(linha)

# Atualiza o semestre do aluno com id = 1 para o valor 5.
Cursor.execute('UPDATE aluno SET semestre = ? WHERE id = ?', (5, 1))

# Confirma a alteração.
bd.commit()

# Busca o aluno atualizado.
Consulta = Cursor.execute("SELECT * from aluno WHERE id = 1").fetchall()
print('\n --- Aluno com código 1 atualizado ---')

# Exibe o registro atualizado.
for linha in Consulta:
    print(linha)

# Encerra o cursor (boa prática).
Cursor.close()

# Encerra a conexão com o banco de dados.
bd.close()

print('\n Conexão com o banco de dados encerrado')
```

### Ampliação — Gerenciamento de alunos

Arquivo: [gerenciamento-aluno.py](gerenciamento-aluno.py).

```python
# Importa o módulo sqlite3 para manipular o banco de dados SQLite.
import sqlite3

# Importa a função para exibir a versão do Python em uso.
from platform import python_version

# Exibe a versão atual do Python.
print(python_version())

# Cria (ou abre) o banco de dados 'banco_dados.db'.
bd = sqlite3.connect('banco_dados.db')

# Cria o cursor para executar comandos SQL.
Cursor = bd.cursor()

# Script SQL inicial: apaga a tabela e recria com alguns valores.
sql_script_aluno = """
DROP TABLE IF EXISTS aluno;

CREATE TABLE aluno
(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome CHAR(15),
  semestre INTEGER,
  curso CHAR(10)
);

INSERT INTO aluno (nome, semestre, curso) VALUES ("Armando Dias", 3, "CC");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Danila Carmo", 4, "SI");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Armando Dias", 2, "CC");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Felipe Dias", 1, "SI");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Erick Dias", 2, "SI");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Emily Dias", 2, "CC");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Mirian Dias", 8, "CC");
INSERT INTO aluno (nome, semestre, curso) VALUES ("Gilson Dias", 4, "CC");
"""

# Executa o script completo de criação e inserção.
Cursor.executescript(sql_script_aluno)
bd.commit()

print("\nTabela 'aluno' criada com sucesso!\n")

# -------------------------------
# FUNÇÕES DO SISTEMA
# -------------------------------

def listar_alunos():
    """Lista todos os registros da tabela aluno."""
    consulta = Cursor.execute("SELECT * FROM aluno")
    print("\n--- Lista de Alunos ---")
    for linha in consulta:
        print(linha)
    print("------------------------\n")


def adicionar_aluno():
    """Adiciona um novo aluno à tabela."""
    print("\n--- Adicionar Novo Aluno ---")
    nome = input("Digite o nome: ")
    semestre = int(input("Digite o semestre: "))
    curso = input("Digite o curso: ")

    Cursor.execute("INSERT INTO aluno (nome, semestre, curso) VALUES (?,?,?)",
                   (nome, semestre, curso))
    bd.commit()

    print("Aluno adicionado com sucesso!\n")


def atualizar_semestre():
    """Atualiza o semestre de um aluno existente."""
    print("\n--- Atualizar Semestre ---")
    codigo = int(input("Digite o código do aluno: "))
    novo_semestre = int(input("Digite o novo semestre: "))

    Cursor.execute("UPDATE aluno SET semestre = ? WHERE id = ?",
                   (novo_semestre, codigo))
    bd.commit()

    print("Semestre atualizado com sucesso!\n")


def remover_aluno():
    """Remove um aluno da tabela pelo código."""
    print("\n--- Remover Aluno ---")
    codigo = int(input("Digite o código do aluno: "))

    Cursor.execute("DELETE FROM aluno WHERE id = ?", (codigo,))
    bd.commit()

    print("Aluno removido com sucesso!\n")


def buscar_por_nome():
    """Busca alunos que contenham parte do nome informado."""
    print("\n--- Buscar Aluno por Nome ---")
    parte = input("Digite parte do nome: ")

    consulta = Cursor.execute("SELECT * FROM aluno WHERE nome LIKE ?",
                             ('%' + parte + '%',))

    print("\n--- Resultados da Busca ---")
    for linha in consulta:
        print(linha)
    print("----------------------------\n")


# -------------------------------
# MENU INTERATIVO
# -------------------------------

while True:
    print("""
===== MENU DE GERENCIAMENTO DE ALUNOS =====
1. Listar todos os alunos
2. Adicionar um novo aluno
3. Atualizar o semestre de um aluno
4. Remover um aluno
5. Buscar aluno por nome
6. Sair
""")

    opcao = input("Escolha uma opção: ")

    if opcao == "1":
        listar_alunos()
    elif opcao == "2":
        adicionar_aluno()
    elif opcao == "3":
        atualizar_semestre()
    elif opcao == "4":
        remover_aluno()
    elif opcao == "5":
        buscar_por_nome()
    elif opcao == "6":
        print("Encerrando o programa...")
        break
    else:
        print("Opção inválida. Tente novamente!")

# Fecha o cursor e a conexão ao sair.
Cursor.close()
bd.close()
print("Conexão encerrada.")
```

## 3. Verificação da solução e limitações

As execuções foram feitas em pastas temporárias, com um banco separado dos arquivos pessoais. O desafio inicial criou oito alunos, inseriu Bruno Neves como id 9 e alterou o semestre do id 1 para 5. Na ampliação, foram verificados cadastro de Aluno Teste, alteração de semestre, busca parcial por Teste e remoção do registro.

**Cuidados e diferenças em relação ao roteiro:** ambos os programas executam `DROP TABLE IF EXISTS aluno` na inicialização, apagando os registros anteriores e recriando a base; portanto, as alterações não são preservadas na próxima execução. A implementação usa `banco_dados.db` e coluna id autoincrementada, enquanto o enunciado indica Banco_Dados.db e Codigo informado no cadastro. Atualizar ou remover um id inexistente ainda exibe mensagem de sucesso, sem verificar quantas linhas foram afetadas. Esses pontos precisam de ajuste para a entrega atender integralmente às funcionalidades pedidas.

**Referência:** UNIP — Roteiros de aulas práticas de Introdução à Programação Estruturada, roteiro 12, item 6.
