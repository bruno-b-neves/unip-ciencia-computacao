USE BellaNapoli;
GO

/* CRIA A STORED PROCEDURE PARA REGISTRAR PEDIDOS */
CREATE PROCEDURE sp_registrar_pedido
    @p_id_cliente INT,
    @p_id_pizza INT
AS
BEGIN
    INSERT INTO Pedido (id_Cliente, id_Pizza, status, total, data_entrega)
    VALUES (@p_id_cliente, @p_id_pizza, 'Em Preparação', 0.00, GETDATE());
END;
GO

/* EXECUTA A STORED PROCEDURE PARA REGISTRAR PEDIDOS */
EXEC sp_registrar_pedido @p_id_cliente = 1, @p_id_pizza = 2;
EXEC sp_registrar_pedido @p_id_cliente = 2, @p_id_pizza = 7;
EXEC sp_registrar_pedido @p_id_cliente = 1, @p_id_pizza = 3;

-- VALIDANDO O RESULTADO: CONSULTA NA PROCEDURE DE SP_REGISTRAR_PEDIDO PARA CONFIRMAR A INSERÇÃO DOS PEDIDOS
SELECT TOP 3 *
FROM Pedido
ORDER BY data_entrega DESC;
GO

/* AMPLIAÇÃO DO DESAFIO: GESTÃO FINANCEIRA */
CREATE PROCEDURE sp_fechar_conta
    @p_id_pedido INT,
    @p_is_vip BIT = 0 -- 1 para VIP (10% de desconto), 0 para Normal
AS
BEGIN
    SET NOCOUNT ON;

    -- Declara variáveis para armazenar o preço da pizza e o total do pedido
    DECLARE @v_preco DECIMAL(10, 2);
    DECLARE @v_total DECIMAL(10, 2);

    -- Busca o preço da pizza associada ao pedido
    SELECT @v_preco = p.preco
    FROM Pedido ped
    INNER JOIN Pizza p ON ped.id_Pizza = p.id_Pizza
    WHERE ped.id_Pedido = @p_id_pedido;

    -- Calcula o desconto de 10% usando operador aritmético, se o cliente for VIP
    IF @p_is_vip = 1
    BEGIN
        SET @v_total = @v_preco * 0.90; -- Desconto de 10% para clientes VIP
    END
    ELSE
    BEGIN
        SET @v_total = @v_preco; -- Sem desconto para clientes normais
    END

    -- Atualiza o status do pedido para 'Finalizado' e registra o total calculado
    UPDATE Pedido
    SET status = 'Finalizado',
        total = @v_total -- Atualiza o total do pedido com o valor calculado
    WHERE id_Pedido = @p_id_pedido; -- Filtra pelo ID do pedido fornecido como parâmetro
END;
GO

-- EXECUTA A STORED PROCEDURE PARA FECHAR A CONTA DE UM PEDIDO
EXEC sp_fechar_conta @p_id_pedido = 7, @p_is_vip = 0;
GO

-- EXECUTA A STORED PROCEDURE PARA FECHAR A CONTA DE UM PEDIDO COM DESCONTO VIP
EXEC sp_fechar_conta @p_id_pedido = 8, @p_is_vip = 1;
GO

-- VALIDAÇÃO: CONSULTA PARA CONFIRMAR O FECHAMENTO DAS CONTAS E O CÁLCULO DO TOTAL
SELECT 
    ped.id_Pedido,
    ped.id_Cliente,
    p.nome AS pizza,
    p.preco AS preco_original,
    ped.total AS total_pago,
    ped.status
FROM dbo.Pedido ped
INNER JOIN dbo.Pizza p ON ped.id_Pizza = p.id_Pizza
WHERE ped.id_Pedido IN (7, 8);

SELECT * FROM Pizza;
GO