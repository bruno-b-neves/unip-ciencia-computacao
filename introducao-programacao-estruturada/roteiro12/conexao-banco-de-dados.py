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
