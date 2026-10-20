# Relatório Prático — Ambiente de Programação e Saídas em Python

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

A função `print()` exibe informações na saída padrão, normalmente o console. Ela permite apresentar textos entre aspas, valores de variáveis e resultados de expressões. Quando recebe vários argumentos, utiliza um espaço entre eles por padrão e termina a saída com uma quebra de linha.

O parâmetro `sep` altera o separador entre os argumentos, como em `print(nome, cidade, sep=" - ")`. O parâmetro `end` define como a saída termina; neste exercício, `end=".\n"` acrescenta um ponto e uma quebra de linha. O método `.format()` insere valores nos campos `{}` de uma string e permite configurar sua apresentação. Já as **f-strings**, identificadas pelo prefixo `f`, permitem inserir variáveis ou expressões diretamente entre chaves. Os formatos `.2f`, `03d` e `<15` representam, respectivamente, duas casas decimais, um inteiro com pelo menos três dígitos preenchidos com zeros e alinhamento à esquerda em uma largura mínima de 15 caracteres.

## 2. Código-fonte comentado

O programa apresenta dados cadastrados, solicita nome, idade e cor favorita e exibe uma mensagem personalizada e uma tabela. A cópia abaixo corrige a unidade da altura para metros, completa os comentários e ajusta a linha separadora à largura da tabela.

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

A execução foi validada com as entradas **Bruno**, **30** e **Azul**, sem erros. A idade cadastrada foi apresentada como `030`, a altura como `1.70m` e a combinação de nome e cidade como `Bruno - São Paulo`. O programa também exibiu duas mensagens personalizadas e uma tabela com as três informações fornecidas pelo usuário.

A prática demonstrou como `print()` pode apresentar os mesmos dados de diferentes maneiras e tornar a comunicação com o usuário mais clara. Um cuidado identificado foi distinguir a formatação numérica da unidade de medida: aplicar `.2f` ao valor `170` não o converte de centímetros para metros; por isso, a altura passou a ser representada como `1.70`. A interação com `input()` e o alinhamento da tabela complementam as saídas básicas. O campo idade ainda exige um número inteiro válido; tratar entradas incorretas é uma melhoria futura.
