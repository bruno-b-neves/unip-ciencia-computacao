<div class="book-navigation">
  <a href="../roteiro01/README.md">← Capítulo anterior</a> ·
  <a href="../README.md">📖 Sumário</a> ·
  <a href="../roteiro03/README.md">Próximo capítulo →</a>
</div>

---

# Relatório Prático: Sistema de Gestão de Livraria Digital 📚

## 1. Teoria de Relacionamentos e Cardinalidade
Na modelagem de bancos de dados relacionais, a cardinalidade define o número de ocorrências de uma entidade que podem estar associadas a outra. Neste projeto, aplicamos os três tipos fundamentais:

* **Relacionamento 1:N (Um para Muitos):** Uma entidade de um lado pode se relacionar com várias do outro, mas o inverso não é verdadeiro. No sistema, uma **Editora** publica vários **Livros**, mas um Livro pertence a apenas uma Editora. A chave estrangeira (`id_Editora`) fica na tabela `Livro` (o lado "N"). Outro exemplo clássico é o **Cliente** que pode fazer vários **Pedidos**.
* **Relacionamento N:N (Muitos para Muitos):** Ocorre quando várias entidades de um lado se relacionam com várias do outro. Um **Livro** pode ter vários **Autores**, e um Autor escreve vários livros. Como bancos relacionais não implementam isso diretamente, criamos uma *tabela associativa* (ex: `Livro_Autor` e `Item_Pedido`) que quebra a relação N:N em duas relações 1:N.
* **Relacionamento 1:1 (Um para Um):** Cada ocorrência de uma entidade se relaciona com exatamente uma ocorrência de outra. Utilizamos isso para otimizar o banco, separando os **Detalhes do Livro** (como resumos e metadados) na tabela `Detalhe_Livro`. Para garantir essa cardinalidade no SQL, utilizamos a restrição `UNIQUE` na chave estrangeira, impedindo que um livro tenha mais de um resumo.

---

## 2. Scripts de Implementação (DDL)
Abaixo estão os scripts desenvolvidos no SQL Server que implementam a teoria das cardinalidades apresentadas, incluindo as correções de integridade (como limites de caracteres e restrições únicas).

```sql
CREATE DATABASE SistemaGestaoLivraria COLLATE Latin1_General_CI_AS;
GO

USE SistemaGestaoLivraria;
GO

-- Lado "1" do relacionamento 1:N
CREATE TABLE Editora(
  id_Editora INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(100) NOT NULL,
  cnpj VARCHAR(14) NOT NULL
);
GO

-- Lado "N" do relacionamento 1:N
CREATE TABLE Livro(
  id_Livro INT PRIMARY KEY IDENTITY(1,1),
  titulo VARCHAR(100) NOT NULL,
  ano INT NOT NULL,
  id_Editora INT,
  CONSTRAINT FK_Editora FOREIGN KEY (id_Editora) REFERENCES Editora(id_Editora)
);
GO

CREATE TABLE Autor(
  id_Autor INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(100) NOT NULL
);
GO

-- Resolução do relacionamento N:N (Tabela Associativa)
CREATE TABLE Livro_Autor(
  id_LivroAutor INT PRIMARY KEY IDENTITY(1,1),
  id_Livro INT,
  id_Autor INT,
  CONSTRAINT FK_LIVRO FOREIGN KEY (id_Livro) REFERENCES Livro(id_livro),
  CONSTRAINT FK_AUTOR FOREIGN KEY (id_Autor) REFERENCES Autor(id_Autor)
);
GO

-- Relacionamento 1:1 garantido pela restrição UNIQUE
CREATE TABLE Detalhe_Livro(
  id_DetalheLivro INT PRIMARY KEY IDENTITY(1,1),
  resumo VARCHAR(255) NOT NULL,
  id_Livro INT UNIQUE, 
  CONSTRAINT FK_DetalheLivro FOREIGN KEY (id_Livro) REFERENCES Livro(id_Livro)
);
GO

CREATE TABLE Cliente(
  id_Cliente INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(100) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero_residencia INT NOT NULL,
  bairro VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);
GO

-- Relacionamento 1:N (Cliente -> Pedido)
CREATE TABLE Pedido(
  id_Pedido INT PRIMARY KEY IDENTITY(1,1),
  id_Cliente INT,
  valor_total DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
  CONSTRAINT FK_Cliente FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente)
);
GO

-- Resolução do relacionamento N:N entre Livro e Pedido (Desafio Ampliado)
CREATE TABLE Item_Pedido(
  id_ItemPedido INT PRIMARY KEY IDENTITY(1,1),
  id_Livro INT,
  id_Pedido INT,
  quantidade INT DEFAULT 0 NOT NULL,
  preco_unitario DECIMAL(10,2) DEFAULT 0.00 NOT NULL,
  CONSTRAINT FK_Livro_Item_Pedido FOREIGN KEY (id_Livro) REFERENCES Livro(id_Livro),
  CONSTRAINT FK_Pedido FOREIGN KEY (id_Pedido) REFERENCES Pedido(id_Pedido)
);
GO
```

---

<div class="book-navigation">
  <a href="../roteiro01/README.md">← Capítulo anterior</a> ·
  <a href="../README.md">📖 Sumário</a> ·
  <a href="../roteiro03/README.md">Próximo capítulo →</a>
</div>
