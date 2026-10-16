-- OPERADORES ESPECIAIS: BETWEEN, IS NULL, LIKE, IN e EXISTS

USE BellaNapoli;
GO

-- 1. Inserção de Dados: 5 pizzas com preços variando de R$ 35,00 a R$ 85,00
INSERT INTO Pizza(nome, preco, descricao, categoria)
VALUES
('Mussarela', 35.00, NULL, 'Tradicional'),
('Calabresa', 40.00, NULL, 'Tradicional'),
('Frango com Catupiry', 42.50, NULL, 'Especiais'),
('Di Parma', 70.00, NULL, 'Especiais'),
('Da Casa', 70.00, NULL, 'Especiais');
GO

-- 2. Busca por Padrão (LIKE): Liste todas as pizzas cujo nome contenha "Frango"
SELECT * FROM Pizza
WHERE nome LIKE '%Frango%';
GO

-- 3. Filtro de Faixa (BETWEEN): Pizzas que custam entre R$ 40,00 e R$ 60,00
SELECT * FROM Pizza
WHERE preco BETWEEN 40.00 AND 60.00;
GO

-- 4. Seleção por Lista (IN): Clientes que moram nos bairros "Centro", "Sudoeste" ou "Jardins"
SELECT * FROM Cliente
WHERE bairro IN ('Centro', 'Sudoeste', 'Jardins');
GO

-- Inclusão da coluna data_entrega para viabilizar a gestão de pedidos pendentes
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Pedido' AND COLUMN_NAME = 'data_entrega'
)
BEGIN
    ALTER TABLE Pedido ADD data_entrega DATETIME NULL;
END
GO

-- 1. Gestão de Dados Ausentes (IS NULL): Pedidos onde o campo data_entrega ainda está nulo
SELECT * FROM Pedido
WHERE data_entrega IS NULL;
GO

-- 2. Validação de Existência (EXISTS): Nomes dos clientes que possuem registros na tabela Pedidos
SELECT nome FROM Cliente C
WHERE EXISTS (
	SELECT 1 
	FROM Pedido P
	WHERE P.id_Cliente = C.id_Cliente
);
GO

-- 3. Atualização em Lote (IN): Reajuste de 10% nas categorias ("Doces", "Especiais")
UPDATE Pizza
SET preco = preco * 1.10
WHERE categoria IN ('Doces', 'Especiais');
GO

-- 4. Limpeza Seletiva (LIKE): Remoção de registros de testes onde o nome do cliente comece com "TESTE%"
DELETE FROM Cliente 
WHERE nome LIKE 'TESTE%';
GO