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
