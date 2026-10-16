-- Seleciona o banco de dados da pizzaria para execução das operações
USE BellaNapoli;
GO

-- Filtra a entidade Pizza para exibir apenas opções econômicas (Preço < 50)
CREATE VIEW vw_cardapio_economico AS
SELECT 
    nome, 
    preco 
FROM Pizza
WHERE preco < 50;
GO

-- Validação: Executa a consulta na view de cardápio econômico
SELECT * FROM vw_cardapio_economico;
GO

-- Seleciona atributos essenciais de contato (nome e telefone) da entidade Cliente
CREATE VIEW vw_clientes_contato AS
SELECT 
    nome, 
    telefone 
FROM Cliente;
GO

-- Executa a consulta na view de contatos de clientes
SELECT * FROM vw_clientes_contato;
GO


-- Relatório de Pedidos Ativos
-- Realiza a junção (INNER JOIN) entre as entidades Pedido, Cliente e Pizza.
-- Filtra apenas os pedidos que não estão concluídos ou cancelados.
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

-- Validação: Lista todos os pedidos pendentes
SELECT * FROM vw_pedidos_pendentes;
GO

-- Visão de Faturamento com Operador Aritmético
-- Aplica o cálculo de 10% sobre o preço original da pizza em tempo de execução
CREATE VIEW vw_faturamento_pizzas AS
SELECT
    nome AS Nome_Pizza,
    preco AS Preco_Original,
    preco * 1.10 AS Preco_Com_Taxa_Entrega -- Expressão aritmética para acréscimo de taxa
FROM Pizza;
GO

-- Exibe a lista de pizzas com o valor calculado da taxa
SELECT * FROM vw_faturamento_pizzas;
GO

-- Utiliza a sintaxe 'CREATE OR ALTER VIEW' (padrão SQL Server)
-- Adiciona o atributo 'data_registro' mantendo o cálculo da taxa de entrega.
CREATE OR ALTER VIEW vw_faturamento_pizzas AS
SELECT
    nome AS Nome_Pizza,
    preco AS Preco_Original,
    preco * 1.10 AS Preco_Com_Taxa_Entrega,
    data_registro AS Data_Cadastro -- Atributo temporal adicionado na manutenção
FROM Pizza;
GO

-- Exibe os dados atualizados da view com o campo de data
SELECT * FROM vw_faturamento_pizzas;
GO