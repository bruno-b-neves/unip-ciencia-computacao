# Calculo de um número fatorial e positivo

# A função recebe o parâmetro 'numero' e verifica se ele é maior ou igual a 0
def numero_positivo(numero): 
    if numero >= 0: # Verifica se o número é maior ou igual a 0
        return numero # Retorna o número se válido
    else: # Se o número for inválido (menor que 0), exibe uma mensagem de erro
        print('ERROR! O número precisa ser maior que 0 e precisa ser positivo') # Mensagem de erro para o usuário
        return None # Retorna None caso seja inválido

# Lê um número digitado pelo usuário e chama a função numero_positivo
num = numero_positivo(int(input('Digite um número: ')))

# Verifica se a variável 'num' recebeu um valor válido (diferente de None)
if num is not None:
    # Inicializa a variável 'fatorial' com 1 (valor neutro da multiplicação)
    fatorial = 1
    # Faz um laço para calcular o fatorial, multiplicando os números de 1 até 'num'
    for item in range(1, num + 1):
        fatorial *= item
    # Exibe o resultado do fatorial do número digitado pelo usuário
    print(f"O fatorial de {num} é {fatorial}")

# Ampliação do Desafio: Calculo de um números combinacionais

# A função recebe o parâmetro 'numero' e verifica se ele é maior ou igual a 0
def numero_positivo(numero):
    if numero >= 0: # Verifica se o número é maior ou igual a 0
        # Se o número for válido, define uma função interna para calcular o fatorial
        def calcular_fatorial(num): # Função para calcular o fatorial de um número inteiro e positivo
            fatorial = 1 # Inicializa a variável fatorial com 1 (valor neutro da multiplicação)
            for item in range(1, num + 1): # Itera de 1 até o número incluído
                fatorial *= item # Multiplica fatorial pelo valor atual do laço
            return fatorial # Retorna o valor do fatorial calculado
        return numero, calcular_fatorial # Retorna o número se válido
    
    else: # Se o número for inválido (menor que 0), exibe uma mensagem de erro
        print('ERROR! O número precisa ser maior que 0 e precisa ser positivo') # Mensagem de erro para o usuário
        return None # Retorna None caso seja inválido

n_input = int(input("Digite o valor de n: ")) # Solicita ao usuário que digite o valor de n
k_input = int(input("Digite o valor de k: ")) # Solicita ao usuário que digite o valor de k
# Chama a função numero_positivo
n, fatorial_n_fun = numero_positivo(n_input) # Chama a função numero_positivo para validar n e obter a função de fatorial
k, fatorial_k_fun = numero_positivo(k_input) # Chama a função numero_positivo para validar k e obter a função de fatorial
# Validação
if n is None or k is None or n < k: # Verifica se n ou k são inválidos ou se n é menor que k
    print("Erro! n e k devem ser inteiros não negativos e n ≥ k.") # Exibe uma mensagem de erro caso a validação falhe

else: # Se a validação for bem-sucedida, calcula a combinação
    # Calcula os fatoriais usando as funções retornadas
    fatorial_n = fatorial_n_fun(n) # Calcula o fatorial de n usando a função de fatorial retornada
    fatorial_k = fatorial_k_fun(k) # Calcula o fatorial de k usando a função de fatorial retornada
    fatorial_nk = fatorial_n_fun(n - k)  # reutiliza a função do n
    combinacao_result = fatorial_n // (fatorial_k * fatorial_nk) # Calcula a combinação usando a fórmula C(n, k) = n! / (k! * (n - k)!)
    print(f"C({n}, {k}) = {combinacao_result}") # Exibe o resultado da combinação calculada para os valores de n e k fornecidos pelo usuário
