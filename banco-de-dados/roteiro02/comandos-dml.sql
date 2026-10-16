CREATE DATABASE SistemaGestaoLivraria
COLLATE Latin1_General_CI_AS;
GO

USE SistemaGestaoLivraria;
GO

CREATE TABLE Editora(
  id_Editora INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(100) NOT NULL,
  cnpj VARCHAR(14) UNIQUE NOT NULL
)
GO

CREATE TABLE Livro(
  id_Livro INT PRIMARY KEY IDENTITY(1,1),
  titulo VARCHAR(100) NOT NULL,
  ano INT NOT NULL,
  id_Editora INT,

  CONSTRAINT FK_Editora
    FOREIGN KEY (id_Editora)
    REFERENCES Editora(id_Editora)
)
GO

CREATE TABLE Autor(
  id_Autor INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(100) NOT NULL
)
GO

CREATE TABLE Livro_Autor(
  id_LivroAutor INT PRIMARY KEY IDENTITY(1,1),
  id_Livro INT,
  id_Autor INT,

  CONSTRAINT FK_LIVRO
    FOREIGN KEY (id_Livro)
    REFERENCES Livro(id_livro),

  CONSTRAINT FK_AUTOR
    FOREIGN KEY (id_Autor)
    REFERENCES Autor(id_Autor)
)
GO

CREATE TABLE Detalhe_Livro(
  id_DetalheLivro INT PRIMARY KEY IDENTITY(1,1),
  resumo VARCHAR(255) NOT NULL,
  id_Livro INT UNIQUE,

  CONSTRAINT FK_DetalheLivro
    FOREIGN KEY (id_Livro)
    REFERENCES Livro(id_Livro)
)
GO

CREATE TABLE Cliente(
  id_Cliente INT PRIMARY KEY IDENTITY(1,1),
  nome VARCHAR(100) NOT NULL,
  logradouro VARCHAR(100) NOT NULL,
  numero_residencia INT NOT NULL,
  bairro VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
)
GO

CREATE TABLE Pedido(
  id_Pedido INT PRIMARY KEY IDENTITY(1,1),
  id_Cliente INT,
  valor_total DECIMAL(10,2) DEFAULT 0.00 NOT NULL,

  CONSTRAINT FK_Cliente
    FOREIGN KEY (id_Cliente)
    REFERENCES Cliente(id_Cliente),
)
GO

CREATE TABLE Item_Pedido(
  id_ItemPedido INT PRIMARY KEY IDENTITY(1,1),
  id_Livro INT,
  id_Pedido INT,
  quantidade INT DEFAULT 0 NOT NULL,
  preco_unitario DECIMAL(10,2) DEFAULT 0.00 NOT NULL,

  CONSTRAINT FK_Livro_Item_Pedido
    FOREIGN KEY (id_Livro)
    REFERENCES Livro(id_Livro),

  CONSTRAINT FK_Pedido
    FOREIGN KEY (id_Pedido)
    REFERENCES Pedido(id_Pedido)
)
GO

