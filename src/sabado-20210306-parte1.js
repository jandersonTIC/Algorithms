/**
 * itens em um objeto javascript (banco de dados em memória) INSERIR, LISTAR
 *
 * 1. Criar u
 */
// Declarando uma variável, do tipo array
let produtos = [];

/**
 * Recebe Nome, Descrição e Valor
 * Insere esses parâmetros em um objeto
 * Insere o objeto em um array
 */
// Declarando uma função
function inserirProduto(nome, descricao, valor) {
    let produto = {
        nome: nome,
        descricao: descricao,
        valor: valor,
    };
    produtos.push(produto);
}

/**
 * Retorna um array de produtos
 */
function listarProdutos() {
    return produtos;
}

//Chamar função
inserirProduto("Produto1", "Descrição do produto 1", 100);
inserirProduto("Produto2", "Descrição do produto 2", 300);

console.log(listarProdutos());
