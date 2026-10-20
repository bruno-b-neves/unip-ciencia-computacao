# Banco de Dados

<div align="center">
  <img src="images/database.jpeg" alt="Capa da disciplina de Banco de Dados" />
</div>

<div class="book-entry">
  <a href="https://bruno-b-neves.github.io/unip-ciencia-computacao/banco-de-dados/">📖 Ler em formato de livro</a> · Disponível após ativar o GitHub Pages.
</div>

## Apresentação

Este diretório reúne meus estudos e atividades práticas da disciplina de **Banco de Dados**, no curso de **Ciência da Computação da UNIP**. Os exercícios foram desenvolvidos em **SQL Server**, utilizando **T-SQL**, e documentam meu aprendizado desde a modelagem de dados até a criação de procedures e o controle de permissões.

As atividades exploram três contextos: um sistema de adoção de animais, uma livraria digital e a pizzaria **Bella Napoli**. A proposta é relacionar os conceitos da disciplina a situações como organizar cadastros, consultar informações, registrar pedidos e definir níveis de acesso.

## Roteiros de estudo

| Roteiro | Tema | Aplicação prática |
| --- | --- | --- |
| [01 — Modelagem de dados](roteiro01/) | Modelos conceitual, lógico e físico | Estruturação de um sistema de adoção de animais. |
| [02 — Relacionamentos](roteiro02/) | Cardinalidades, chaves e tabelas associativas | Modelagem de uma livraria digital. |
| [03 — Manipulação de dados](roteiro03/) | `INSERT`, `UPDATE` e `DELETE` | Cadastro e manutenção de informações da Bella Napoli. |
| [04 — Filtros e operadores](roteiro04/) | `SELECT`, `WHERE`, operadores lógicos e relacionais | Consultas condicionais e associação entre pedidos e pizzas. |
| [05 — Operadores especiais](roteiro05/) | `LIKE`, `BETWEEN`, `IN`, `IS NULL` e `EXISTS` | Busca por padrões, intervalos e registros relacionados. |
| [06 — Views](roteiro06/) | Criação e manutenção de visões | Organização de consultas sobre cardápio, clientes e pedidos. |
| [07 — Stored procedures](roteiro07/) | Parâmetros, condicionais e cálculos | Registro de pedidos e fechamento de contas com desconto VIP. |
| [08 — Controle de acesso](roteiro08/) | Logins, usuários, `GRANT`, `DENY` e `REVOKE` | Definição de permissões para atendente e gerente. |

## Conceitos praticados

- Modelagem de entidades, atributos e relacionamentos.
- Criação de tabelas e definição de chaves e restrições de integridade.
- Inserção, atualização, exclusão e consulta de dados.
- Uso de filtros, junções e subconsultas.
- Encapsulamento de consultas em views e de operações em procedures.
- Controle de acesso conforme as responsabilidades de cada usuário.

## Como explorar

Cada roteiro possui um README com a descrição da atividade e os scripts apresentados no relatório. As capturas disponíveis estão na pasta [`images`](images/).

Para acompanhar a evolução dos conteúdos, consulte os roteiros na ordem apresentada. Antes de executar os exemplos, confira o banco selecionado, as tabelas e os dados exigidos por cada atividade. Os exercícios da Bella Napoli reutilizam estruturas e dados de etapas anteriores e devem ser executados em um ambiente de estudos.

## Sobre este material

Este material registra minha evolução na disciplina. Os exemplos têm finalidade acadêmica e são revisados conforme avanço nos estudos e identifico melhorias na modelagem, nos scripts e na documentação.
