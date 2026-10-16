# Relatório Prático: Criação e Manutenção de Views (Visões Tabulares) 🍕

## 1. Introdução
Nesta etapa prática, trabalhamos com o conceito de **Views (Visões)** no SGBD SQL Server. Uma view é uma tabela virtual baseada no conjunto de resultados de uma consulta SQL. Ela permite simplificar o acesso a dados complexos, encapsular a lógica de filtros e junções (`JOIN`), além de reforçar a segurança do banco de dados ao restringir o acesso direto às tabelas físicas.

---

## 2. Scripts SQL (Criação e Manutenção de Views)

Abaixo está o script executado para a criação e atualização das views do sistema da pizzaria "Bella Napoli":

```sql
-- Seleciona o banco de dados da pizzaria
USE BellaNapoli;
GO

-- 1. View: Cardápio Econômico (Filtro simples WHERE)
CREATE VIEW vw_cardapio_economico AS
SELECT 
    nome, 
    preco 
FROM Pizza
WHERE preco < 50;
GO

-- 2. View: Contatos de Clientes (Projeção de colunas específicas)
CREATE VIEW vw_clientes_contato AS
SELECT 
    nome, 
    telefone 
FROM Cliente;
GO

-- 3. View: Pedidos Pendentes (INNER JOIN e Filtro NOT IN)
CREATE VIEW vw_pedidos_pendentes AS
SELECT 
    P.id_Pedido,
    P.status AS Status_Pedido,
    P.data_entrega AS Data_Pedido,
    C.nome AS Nome_Cliente,
    C.telefone AS Telefone_Cliente,
    Pz.nome AS Nome_Pizza,
    Pz.preco AS Preco_Pizza
FROM Pedido P
INNER JOIN Cliente C ON P.id_Cliente = C.id_Cliente
INNER JOIN Pizza Pz ON P.id_Pizza = Pz.id_Pizza
WHERE P.status NOT IN ('Finalizado', 'Cancelado');
GO

-- 4. View: Faturamento de Pizzas (Operador Aritmético)
CREATE VIEW vw_faturamento_pizzas AS
SELECT
    nome AS Nome_Pizza,
    preco AS Preco_Original,
    preco * 1.10 AS Preco_Com_Taxa_Entrega -- Cálculo de 10% de taxa
FROM Pizza;
GO

-- 5. Manutenção de View (CREATE OR ALTER VIEW)
-- Adiciona a coluna temporal data_registro mantendo a regra de cálculo
CREATE OR ALTER VIEW vw_faturamento_pizzas AS
SELECT
    nome AS Nome_Pizza,
    preco AS Preco_Original,
    preco * 1.10 AS Preco_Com_Taxa_Entrega,
    data_registro AS Data_Cadastro
FROM Pizza;
GO
```