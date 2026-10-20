<div class="book-navigation">
  <a href="../roteiro03/README.md">← Capítulo anterior</a> ·
  <a href="../README.md">📖 Sumário</a> ·
  <a href="../roteiro05/README.md">Próximo capítulo →</a>
</div>

---

# Relatório Prático: Comandos DML (Parte II) - Filtros e Operadores 🍕

## 1. Introdução
Esta etapa aprofunda o uso da linguagem DML (Data Manipulation Language) no banco de dados da Bella Napoli. O foco principal é a recuperação de dados de forma condicional e precisa, utilizando o comando `SELECT` em conjunto com a cláusula `WHERE` e os operadores lógicos (`AND`, `OR`) e relacionais (`>`, `!=`).

Também implementamos uma melhoria estrutural (Integridade Referencial) ao criar a tabela `Item_Pedido`, normalizando a relação de muitos-para-muitos entre os pedidos e as pizzas do cardápio.

---

## 2. Scripts SQL (DML e Consultas)
Abaixo está o script executado no SQL Server. Foram utilizados telefones distintos para os novos clientes para respeitar a restrição `UNIQUE` da tabela.

```sql
USE BellaNapoli;
GO

-- ==========================================
-- TAREFA 1: INSERÇÃO E OPERADOR RELACIONAL (>)
-- ==========================================
-- Populando o cardápio com novas pizzas de valores variados
INSERT INTO Pizza(nome, preco, descricao, categoria)
VALUES
('Di Parma', 75.00, NULL, 'Especiais'),
('Camarão', 65.00, NULL, 'Especiais');
GO

-- Verificação: Lista apenas as pizzas que custam mais de R$ 50,00
SELECT * FROM Pizza 
WHERE preco > 50.00;
GO

-- ==========================================
-- AMPLIAÇÃO: CADASTRO E OPERADORES LÓGICOS
-- ==========================================
-- Cadastro de clientes em bairros distintos (Telefones inéditos gerados para evitar erro de UNIQUE)
INSERT INTO Cliente(nome, logradouro, numero, bairro, telefone)
VALUES
('Erick', 'Rua Qualquer', 55, 'Norte', '(11) 8888-5678'),
('Felipe', 'Rua das Alamedas', 115, 'Centro', '(11) 7777-5678');
GO

-- Consulta com AND: Busca o cliente do Centro com ID específico
SELECT * FROM Cliente
WHERE bairro = 'Centro' AND id_Cliente = 5;
GO

-- Consulta com OR: Lista todos os clientes que moram no Sul ou Norte
SELECT * FROM Cliente
WHERE bairro = 'Oeste' OR bairro = 'Norte';
GO

-- ==========================================
-- TAREFA 3: VENDA CONDICIONAL E RELAÇÃO N:N
-- ==========================================
-- Criação da tabela associativa Item_Pedido para normalizar o banco
CREATE TABLE Item_Pedido(
	id_Item_Pedido INT PRIMARY KEY IDENTITY,
	id_Pizza INT,
	id_Pedido INT,
	quantidade INT NOT NULL,
	observacao VARCHAR(100),
	data_registro DATETIME DEFAULT GETDATE() NOT NULL,

	CONSTRAINT FK_Id_Pedido FOREIGN KEY (id_Pedido) REFERENCES Pedido(id_Pedido),
	CONSTRAINT FK_Id_Pizza FOREIGN KEY (id_Pizza) REFERENCES Pizza(id_Pizza)
);
GO

-- Registro do Pedido e vínculo dos itens
INSERT INTO Pedido(id_cliente, status, total, observacao)
VALUES(1, 'EM PREPARO', 140.00, NULL);
GO

INSERT INTO Item_Pedido(id_Pizza, id_Pedido, quantidade, observacao)
VALUES(1, 1, 2, NULL);
GO

-- Verificação de Status com operador relacional Diferente De (!=)
SELECT * FROM Pedido
WHERE status != 'Finalizado';
GO
```

---

<div class="book-navigation">
  <a href="../roteiro03/README.md">← Capítulo anterior</a> ·
  <a href="../README.md">📖 Sumário</a> ·
  <a href="../roteiro05/README.md">Próximo capítulo →</a>
</div>
