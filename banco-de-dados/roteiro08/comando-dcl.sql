USE BellaNapoli
GO

-- CRIANDO LOGINS E USUÁRIOS PARA GERENCIAR PERMISSÕES
CREATE LOGIN atendente_pizzaria WITH PASSWORD = 'SenhaForteAtendente123!';
CREATE LOGIN gerente_vendas WITH PASSWORD = 'SenhaForteGerente123!';

-- * CRIANDO USUÁRIOS ASSOCIADOS AOS LOGINS
CREATE USER atendente_pizzaria FOR LOGIN atendente_pizzaria;
CREATE USER gerente_vendas FOR LOGIN gerente_vendas;
GO

-- * CONCEDENDO PERMISSÕES DE LEITURA AO USUÁRIO (ATENDENTE)
GRANT SELECT ON Pizza TO atendente_pizzaria;
GRANT SELECT ON Cliente TO atendente_pizzaria;
GO

-- * CONCEDENDO PERMISSÕES DE OPERAÇÕES AO USUÁRIO (ATENDENTE)
GRANT INSERT ON PEDIDO TO atendente_pizzaria;

-- ? Como boa prática, apliquei o DENY para garantir que o atendente jamais tenha permissão para DELETAR
-- ? mesmo que participe de outros grupos
DENY DELETE ON Pedido TO atendente_pizzaria;
GO

/* ====================================================================
*   AMPLIAÇÃO DO DESAFIO - GESTÃO AVANÇADA DE SEGURANÇA
==================================================================== */

-- * CONCEDENDO PERMISSÕES DE LEITURA E ESCRITA AO USUÁRIO (GERENTE)
GRANT SELECT, INSERT, UPDATE, DELETE ON Pizza TO gerente_vendas;
GRANT SELECT, INSERT, UPDATE, DELETE ON Cliente TO gerente_vendas;
GRANT SELECT, INSERT, UPDATE, DELETE ON Pedido TO gerente_vendas;
GO

-- * REVOGANDO PERMISSÕES DE LEITURA E ESCRITA AO USUÁRIO (ATENDENTE)
REVOKE SELECT ON Pizza TO atendente_pizzaria;
REVOKE SELECT ON Cliente TO atendente_pizzaria;
REVOKE INSERT ON Pedido TO atendente_pizzaria;
GO

-- * REVOGANDO PERMISSÕES DE DELEÇÃO AO USUÁRIO (ATENDENTE)
REVOKE DELETE ON Pedido TO atendente_pizzaria;
GO

-- * CONCEDENDO PERMISSÕES DE ATUALIZAÇÃO AO USUÁRIO (ATENDENTE)
GRANT UPDATE (status) ON Pedido TO atendente_pizzaria;
GO
