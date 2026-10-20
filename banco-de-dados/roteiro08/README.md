<div class="book-navigation">
  <a href="../roteiro07/README.md">← Capítulo anterior</a> ·
  <a href="../README.md">📖 Sumário</a>
</div>

---

# Relatório Prático — Controle de Acesso com DCL: Bella Napoli

## 1. Objetivo e ambiente

Aplicar o controle de acesso ao banco de dados `BellaNapoli`, no SQL Server, por meio da criação de logins e usuários e dos comandos `GRANT`, `DENY` e `REVOKE`. Foram definidos os perfis de atendente e gerente, com permissões distintas sobre as tabelas `Pizza`, `Cliente` e `Pedido`.

O login permite a autenticação na instância do SQL Server, enquanto o usuário associado representa esse acesso dentro do banco. A execução dos comandos de configuração exige uma conta com autorização para criar logins e usuários e administrar as permissões utilizadas. As tabelas devem existir previamente.

## 2. Script SQL

O código abaixo reproduz o arquivo `comando-dcl.sql` fornecido, substituindo apenas as senhas por marcadores para publicação no GitHub. Antes de executar, defina senhas locais que atendam à política da instância. Os comandos de criação pressupõem que esses logins e usuários ainda não existem.

```sql
USE BellaNapoli
GO

-- CRIANDO LOGINS E USUÁRIOS PARA GERENCIAR PERMISSÕES
CREATE LOGIN atendente_pizzaria WITH PASSWORD = '<DEFINA_UMA_SENHA_LOCAL_PARA_ATENDENTE>';
CREATE LOGIN gerente_vendas WITH PASSWORD = '<DEFINA_UMA_SENHA_LOCAL_PARA_GERENTE>';

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
```

### Interpretação das permissões

| Perfil | Após as concessões iniciais, antes dos REVOKE | Ao final do script |
| --- | --- | --- |
| Atendente | Consulta `Pizza` e `Cliente`, insere em `Pedido` e recebe `DENY DELETE` em `Pedido`. | Mantém somente a concessão direta de `UPDATE` na coluna `status` de `Pedido`. As concessões diretas anteriores de leitura e inserção são removidas, assim como o `DENY DELETE`. |
| Gerente | Consulta, insere, atualiza e exclui nas três tabelas. | Mantém as permissões concedidas nas três tabelas. |

O `REVOKE` remove uma concessão ou negação explícita; ele não equivale a uma proibição. Neste script, `REVOKE DELETE ON Pedido TO atendente_pizzaria` remove o `DENY DELETE` definido anteriormente. Em um ambiente sem outras concessões, o atendente continua sem autorização para excluir. Entretanto, permissões recebidas por funções ou outras origens devem ser verificadas. Se a intenção for manter a negação explícita ao final do exercício, o `DENY DELETE` deve ser preservado ou reaplicado depois do `REVOKE`.

## 3. Análise crítica

Restringir o comando `DELETE` é importante porque uma exclusão indevida pode comprometer o histórico de pedidos, os registros dos clientes e a confiabilidade das informações utilizadas pela empresa. Na rotina de uma pizzaria, o atendente deve receber as permissões necessárias às suas atividades, enquanto operações de exclusão devem ficar sob responsabilidade de pessoas autorizadas e seguir regras de controle. Essa separação reduz o risco de perdas causadas por enganos ou uso indevido. O exercício também mostra que revogar uma permissão não é o mesmo que proibir uma operação: para garantir o controle, é necessário verificar o acesso efetivo de cada perfil e considerar as permissões recebidas por funções e outras origens.

---

<div class="book-navigation">
  <a href="../roteiro07/README.md">← Capítulo anterior</a> ·
  <a href="../README.md">📖 Sumário</a>
</div>
