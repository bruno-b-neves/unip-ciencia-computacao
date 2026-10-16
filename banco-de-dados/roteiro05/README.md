# Relatório Prático: Roteiro 05 - Operadores Especiais (DML) 🍕

## 1. Introdução
Nesta etapa, focamos na otimização das consultas e manipulação de dados utilizando operadores especiais do SQL no SGBD SQL Server. O objetivo foi realizar filtros avançados sem a necessidade de criar blocos lógicos complexos com múltiplos `AND`/`OR`. 

Os operadores aplicados foram:
* **LIKE:** Para buscas de padrões textuais (strings) com caracteres de prefixo/sufixo (`%`).
* **BETWEEN:** Para filtrar intervalos numéricos compreendidos entre dois valores.
* **IN:** Para validação de dados contidos em uma lista finita de valores.
* **IS NULL:** Para localizar dados ausentes ou campos sem preenchimento.
* **EXISTS:** Para validar a existência de registros correlacionados através de subconsultas (integridade referencial).

---

## 2. Scripts SQL (Operadores Especiais)

```sql
USE BellaNapoli;
GO

-- ==========================================
-- DESAFIO INICIAL: Inserção e Filtros Básicos
-- ==========================================
-- 1. Inserção de Dados: 5 pizzas com preços variando de R$ 35,00 a R$ 85,00
INSERT INTO Pizza(nome, preco, descricao, categoria)
VALUES
('Mussarela', 35.00, NULL, 'Tradicional'),
('Calabresa', 40.00, NULL, 'Tradicional'),
('Frango com Catupiry', 42.50, NULL, 'Especiais'),
('Di Parma', 70.00, NULL, 'Especiais'),
('Da Casa', 70.00, NULL, 'Especiais');
GO

-- 2. Busca por Padrão (LIKE): Pizzas que contenham "Frango" no nome
SELECT * FROM Pizza
WHERE nome LIKE '%Frango%';
GO

-- 3. Filtro de Faixa (BETWEEN): Pizzas custando entre R$ 40,00 e R$ 60,00
SELECT * FROM Pizza
WHERE preco BETWEEN 40.00 AND 60.00;
GO

-- 4. Seleção por Lista (IN): Clientes residentes em bairros específicos
SELECT * FROM Cliente
WHERE bairro IN ('Centro', 'Sudoeste', 'Jardins');
GO

-- ==========================================
-- AMPLIAÇÃO DO DESAFIO: Gestão de Dados
-- ==========================================
-- Garantia estrutural: Adicionando a coluna data_entrega caso ainda não exista
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Pedido' AND COLUMN_NAME = 'data_entrega'
)
BEGIN
    ALTER TABLE Pedido ADD data_entrega DATETIME NULL;
END
GO

-- 1. Gestão de Dados Ausentes (IS NULL): Identifica pedidos pendentes
SELECT * FROM Pedido
WHERE data_entrega IS NULL;
GO

-- 2. Validação de Existência (EXISTS): Clientes que possuem pedidos registrados
SELECT nome FROM Cliente C
WHERE EXISTS (
	SELECT 1 
	FROM Pedido P
	WHERE P.id_Cliente = C.id_Cliente
);
GO

-- 3. Atualização em Lote (IN): Reajuste de 10% nas categorias específicas
UPDATE Pizza
SET preco = preco * 1.10
WHERE categoria IN ('Doces', 'Especiais');
GO

-- 4. Limpeza Seletiva (LIKE): Remoção de registros de teste
DELETE FROM Cliente 
WHERE nome LIKE 'TESTE%';
GO