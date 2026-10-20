<div class="book-navigation">
  <a href="../roteiro02/README.md">← Capítulo anterior</a> ·
  <a href="../README.md">📖 Sumário</a> ·
  <a href="../roteiro04/README.md">Próximo capítulo →</a>
</div>

---

# Relatório Prático: Comandos DML - Bella Napoli 🍕

## 1. Introdução à Manipulação de Dados (DML)
Nesta etapa prática, aplicamos os conceitos fundamentais de DML (Data Manipulation Language) no banco de dados da pizzaria Bella Napoli, utilizando o SGBD SQL Server. Os comandos utilizados foram:
* **INSERT:** Para popular as tabelas recém-criadas com clientes, opções de pizzas e o primeiro pedido.
* **UPDATE:** Para aplicar regras de negócio, como reajustes de preços e atualização de endereços.
* **DELETE:** Para realizar a higienização do banco, removendo pedidos cancelados.

---

## 2. Script Completo (DDL e DML)
Abaixo está o script contendo a criação das estruturas corrigidas e a execução dos desafios propostos no roteiro.

```sql
-- ==========================================
-- 1. CRIAÇÃO DO BANCO E TABELAS (DDL)
-- ==========================================
CREATE DATABASE BellaNapoli COLLATE Latin1_General_CI_AS;
GO

USE BellaNapoli;
GO

CREATE TABLE Pizza(
	id_Pizza INT PRIMARY KEY IDENTITY,
	nome VARCHAR(100) NOT NULL,
	preco DECIMAL(10,2) NOT NULL,
	data_registro DATETIME DEFAULT GETDATE(),
	categoria VARCHAR(100),
	descricao VARCHAR(100)
);
GO

CREATE TABLE Cliente(
	id_Cliente INT PRIMARY KEY IDENTITY,
	nome VARCHAR(100) NOT NULL,
	logradouro VARCHAR(100) NOT NULL,
	numero INT NOT NULL,
	bairro VARCHAR(100) NOT NULL,
	telefone VARCHAR(20) UNIQUE NOT NULL,
	data_registro DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Pedido(
	id_Pedido INT PRIMARY KEY IDENTITY,
	status VARCHAR(100) DEFAULT 'Aguardando' NOT NULL,
	total DECIMAL(10,2) NOT NULL,
	observacao VARCHAR(100),
	id_Cliente INT,
	id_Pizza INT,
	
	CONSTRAINT FK_Id_Cliente FOREIGN KEY (id_Cliente) REFERENCES Cliente(id_Cliente),
	CONSTRAINT FK_Id_Pizza FOREIGN KEY (id_Pizza) REFERENCES Pizza(id_Pizza)
);
GO

-- ==========================================
-- 2. DESAFIO INICIAL (INSERT)
-- ==========================================
-- Inserção das Pizzas
INSERT INTO Pizza(nome, preco, data_registro, categoria, descricao)
VALUES 
('Mussarela', 35.00, '2026-05-29', 'Salgada', NULL),
('Calabresa', 38.50, '2026-05-29', 'Salgada', NULL),
('Portuguesa', 42.50, '2026-05-29', 'Salgada', NULL);
GO

-- Inserção dos Clientes
INSERT INTO Cliente(nome, logradouro, numero, bairro, telefone, data_registro)
VALUES 
('Bruno', 'Rua dos Bobos', 0, 'Sul', '(11) 91234-5678', '2026-05-29'),
('Caroline', 'Rua da Casinha Torta', 10, 'Oeste', '(11) 1234-5678', '2026-05-29');
GO

-- Inserção do Pedido vinculando cliente e pizza
INSERT INTO Pedido(id_Cliente, id_Pizza, status, total, observacao)
VALUES(1, 1, 'EM PREPARO', 35.00, NULL);
GO

-- ==========================================
-- 3. AMPLIAÇÃO DO DESAFIO (UPDATE e DELETE)
-- ==========================================
-- 1. Reajuste de Preços: Aumenta todas as pizzas em 10%
UPDATE Pizza
SET preco = preco * 1.10;
GO

-- 2. Fidelidade: Atualiza o logradouro do cliente específico
UPDATE Cliente
SET logradouro = 'Rua Teste'
WHERE id_Cliente = 1;
GO

-- 3. Cancelamento: Inserimos um pedido cancelado para testar a remoção
INSERT INTO Pedido(id_Cliente, id_Pizza, status, total, observacao)
VALUES(2, 2, 'CANCELADO', 42.35, 'Cliente desistiu');
GO

-- Limpa os pedidos cancelados
DELETE FROM Pedido
WHERE status = 'CANCELADO';
GO

-- 4. Promoção Relâmpago: Cadastro e atualização da Pizza da Casa
INSERT INTO Pizza(nome, preco, data_registro, categoria, descricao)
VALUES('Pizza da Casa', 55.00, '2026-05-29', 'Especiais', NULL);
GO

UPDATE Pizza
SET nome = 'Super Promoção', preco = preco / 1.15
WHERE nome = 'Pizza da Casa';
GO
```

---

<div class="book-navigation">
  <a href="../roteiro02/README.md">← Capítulo anterior</a> ·
  <a href="../README.md">📖 Sumário</a> ·
  <a href="../roteiro04/README.md">Próximo capítulo →</a>
</div>
