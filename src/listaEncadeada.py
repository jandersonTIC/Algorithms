class No(object):
    def __init__(self, valor, proximo=None):
        self.valor = valor
        self.proximo = proximo


class Cliente(object):
    def __init__(self, funcionarioID, nome, telefone, dataNascimento):
        self.funcionarioID = funcionarioID
        self.nome = nome
        self.telefone = telefone
        self.dataNascimento = dataNascimento


def inicializacao(valor=None):
    return No(valor)


def inicializaCliente(funcionarioID, nome, telefone, dataNascimento):
    cliente = Cliente(funcionarioID, nome, telefone, dataNascimento)
    return No(cliente)


def procurarPorNome(lista, valor):
    no = lista
    while (no != None and no.valor.nome != valor):
        no = no.proximo

    if (no != None):
        return no.valor

    return None


cliente = inicializacao()
print(cliente.valor)

cliente = inicializaCliente(
    7, "Fellipe", "1145678942", "08/03/1994")

cliente.proximo = inicializaCliente(
    14, "Herley", "1198745132", "14/07/1997")

cliente.proximo.proximo = inicializaCliente(
    21, "Andresson", "1198745145", "21/07/1997")

print(cliente.valor.nome)

print(cliente.proximo.valor.nome)

print(cliente.proximo.proximo.valor.nome)

print("Procurando Janderson")
encontrado = procurarPorNome(cliente, "Andresson")

if (encontrado != None):
    print(encontrado.nome, encontrado.dataNascimento)


# lista = No(1)
# lista.proximo = No(2)
# lista.proximo.proximo = No(3)

# print(lista.valor)
# print(lista.proximo.valor)
# print(lista.proximo.proximo.valor)
# print(lista.proximo.proximo.proximo)
