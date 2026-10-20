# Roteiro 11 — Módulos, pip e importações

**Disciplina:** Introdução à Programação Estruturada · **Semestre:** 1º · **Aluno:** Bruno Neves

## 1. Resumo teórico

Módulos organizam definições em unidades reutilizáveis, como arquivos .py. `import random` permite acessar recursos pelo nome do módulo, como `random.uniform()`. Já `from faker import Faker` importa diretamente a classe Faker. A primeira forma explicita a origem do recurso; a segunda permite usar seu nome diretamente, exigindo cuidado com conflitos de nomes.

O pip instala pacotes externos. Faker precisa ser instalado no mesmo ambiente Python que executa o programa; sys, random e math pertencem à biblioteca padrão. `sys.executable` informa o caminho do interpretador e `sys.path` contém os locais de busca por módulos. Arquivos .pyc, geralmente em __pycache__, guardam bytecode para acelerar carregamentos posteriores; não são o código-fonte.

Faker com localidade pt_BR gera dados fictícios em português do Brasil. `random.uniform(0, 10)` gera notas no intervalo solicitado. Na ampliação, a média geométrica de duas notas é `sqrt(nota1 × nota2)`, calculada com math.sqrt(); se uma nota é zero, a média também é zero.

## 2. Código-fonte comentado

Os arquivos abaixo reproduzem o desafio inicial e a ampliação atual. A ampliação exibe informações do ambiente e cria dez registros em uma lista, cada um com dados pessoais fictícios, uma tupla de notas e a média geométrica.

### Desafio inicial — Dados fictícios e notas

Arquivo: [desafio-inicial.py](desafio-inicial.py).

```python
# random pertence à biblioteca padrão; Faker é instalado separadamente com pip.
import random
import Faker

# Configura o gerador para produzir dados fictícios em português do Brasil.
gerador = Faker('pt_BR')
nome = gerador.name()
endereco = gerador.address().replace('\n', ', ')
email = gerador.email()

# uniform() gera números de ponto flutuante no intervalo de 0 a 10.
nota1 = random.uniform(0, 10)
nota2 = random.uniform(0, 10)

# As notas são apresentadas com duas casas decimais.
print('=== DADOS FICTÍCIOS ===')
print(f'Nome: {nome}')
print(f'Endereço: {endereco}')
print(f'E-mail: {email}')
print(f'Nota 1: {nota1:.2f} | Nota 2: {nota2:.2f}')
```

### Ampliação — Ambiente e agenda fictícia

Arquivo: [ampliacao-desafio.py](ampliacao-desafio.py).

```python
# import permite acessar os recursos pelo nome do módulo.
# from...import disponibiliza diretamente a classe Faker.
import sys
import random
import math
from faker import Faker

# Consulta o executável Python e os locais de busca por módulos.
print('Executável Python:', sys.executable)
print('Diretórios de busca por módulos:')
for diretorio in sys.path:
    print(diretorio)

# A lista armazena os dez dicionários gerados pelo laço.
gerador = Faker('pt_BR')
agenda_ficticia = []
for numero in range(10):
    nome = gerador.name()
    endereco = gerador.address().replace('\n', ', ')
    email = gerador.email()
    nota1 = random.uniform(0, 10)
    nota2 = random.uniform(0, 10)

    # A média geométrica é a raiz quadrada do produto das notas.
    # Se qualquer nota for zero, o resultado também será zero.
    if nota1 == 0 or nota2 == 0:
        media_geometrica = 0.0
    else:
        media_geometrica = math.sqrt(nota1 * nota2)

    # As notas ficam em uma tupla; append() adiciona o registro à lista.
    registro = {
        'Nome': nome,
        'Endereço': endereco,
        'Email': email,
        'Notas': (nota1, nota2),
        'Média Geométrica': media_geometrica
    }
    agenda_ficticia.append(registro)
    print(f'Registro gerado: {nome}')

# Percorre a lista e apresenta todos os campos de cada registro.
for registro in agenda_ficticia:
    print('=' * 45)
    print(f"Nome: {registro['Nome']}")
    print(f"Endereço: {registro['Endereço']}")
    print(f"E-mail: {registro['Email']}")
    print(f"Nota 1: {registro['Notas'][0]:.2f} | "
          f"Nota 2: {registro['Notas'][1]:.2f}")
    print(f"Média geométrica: {registro['Média Geométrica']:.2f}")
print(f'Total de registros: {len(agenda_ficticia)}')
```

## 3. Verificação da solução e limitações

A ampliação foi executada com Python 3.13 e Faker instalado: gerou dez registros, com notas entre 0 e 10 e médias coerentes. Foram verificados os pares `(0, 7)`, `(7, 0)`, `(0, 0)`, `(4, 9)` e `(10, 10)`, com médias `0`, `0`, `0`, `6` e `10`.

**Correção pendente no desafio inicial:** o arquivo usa `import Faker`, mas o pacote disponibiliza o módulo faker e a classe Faker. Para a chamada `Faker('pt_BR')` usada em seguida, a linha correta é `from faker import Faker`. Na execução da versão atual, ocorreu `ModuleNotFoundError: No module named 'Faker'`. O código foi mantido no relatório como está no arquivo, sem apresentar essa etapa como concluída.

Para instalar o pacote, use `python3.13 -m pip install Faker` no terminal do ambiente em que executará os arquivos. Os dados e notas gerados variam a cada execução; são informações fictícias.

**Referência:** [Roteiros de aulas práticas — Introdução à Programação Estruturada](https://drive.google.com/file/d/1wm81dvjvkJURknlRIfU1XtUoBKhSsev1/view), roteiro 11, item 6.
