# Roteiro 01 — Saídas e formatação com print()

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

A função `print()` apresenta textos, valores de variáveis e resultados de expressões na saída padrão, normalmente o terminal. Strings literais ficam entre aspas; variáveis são informadas pelo nome. Por padrão, vários argumentos são separados por um espaço e a saída termina com uma quebra de linha.

O parâmetro `sep` troca o separador entre argumentos, e `end` determina como a saída termina. Neste exercício, `sep=" - "` separa os dados por hífens e `end=".\n"` acrescenta ponto e quebra de linha. O método `.format()` substitui campos entre chaves; as f-strings, com prefixo `f`, inserem variáveis ou expressões diretamente na mensagem. Os formatos `.2f`, `03d` e `<15` apresentam, respectivamente, duas casas decimais, inteiro com largura mínima de três posições preenchidas com zeros e alinhamento à esquerda em quinze posições.

## 2. Código-fonte comentado

O programa apresenta dados pessoais, solicita nome, idade e cor favorita e monta mensagens e uma tabela. Os comentários explicam cada forma de saída.

### Programa completo

Arquivo: [programacao-saidas.py](programacao-saidas.py).

```python
"""Exibe dados e explora a formatação de saídas com print() em Python."""

# Dados iniciais: textos, números inteiros e altura em metros.
nome = "Bruno"
idade = 30
cidade = "São Paulo"
profissao = "Desenvolvedor Frontend"
altura = 1.70

# Cada print() exibe uma variável e termina com uma quebra de linha.
print(nome)
print(idade)
print(cidade)
print(profissao)

# A f-string insere variáveis na mensagem; 03d preenche o inteiro com zeros.
print(f"Olá, meu nome é {nome}, tenho {idade} anos, "
      f"moro em {cidade} e trabalho como {profissao}.")
print(f"Idade: {idade:03d}.")

# .format() aplica duas casas decimais; sep define o separador entre argumentos.
print("Altura: {:.2f}m".format(altura))
print(nome, cidade, sep=" - ")

# input() lê texto; int() converte a idade informada para um número inteiro.
userNome = input("Digite seu nome: ")
userIdade = int(input("Digite sua idade: "))
userCor = input("Digite sua cor favorita: ")

# end define o término da saída: um ponto seguido de quebra de linha.
print(f"Que legal, {userNome}! Então você tem {userIdade} anos "
      f"e adora a cor {userCor}", end=".\n")
print("Que legal", userNome, "!", "Então você tem", userIdade,
      "anos e adora a cor", userCor, sep=" - ", end=".\n")

# <15 alinha cada campo à esquerda em uma largura mínima de 15 caracteres.
print(f"{'Nome':<15}| {'Idade':<15}| {'Cor Favorita':<15}")
print("-" * 49)
print(f"{userNome:<15}| {userIdade:<15}| {userCor:<15}")
```

## 3. Resultados e discussão

Com as entradas `Bruno`, `30` e `Azul`, a execução exibiu idade `030`, altura `1.70m`, o texto `Bruno - São Paulo` e as informações digitadas na tabela. A execução terminou sem erro.

A prática mostra como os mesmos dados podem ser apresentados de formas diferentes. Os cuidados centrais são separar o conteúdo de sua formatação, escolher o separador e controlar a quebra de linha. A altura está expressa em metros: `.2f` apenas muda a apresentação do número. A idade digitada ainda precisa ser um inteiro válido; esse campo não tem validação de texto.

**Capturas de tela exigidas pelo item 6 — pendentes:**

- [ ] Inserir uma captura real das saídas iniciais, mostrando `030`, `1.70m` e o uso de `sep`.
- [ ] Inserir uma captura real da interação e da tabela com nome, idade e cor favorita.

As verificações descritas acima foram feitas pela execução do programa; ainda é necessário acrescentar as imagens para concluir a entrega.

**Referência:** UNIP — Roteiros de aulas práticas de Introdução à Programação Estruturada, roteiro 01, item 6.
