/*
Utilizar o enunciado do exercício 1038 do URI para criar uma ferramenta de pedidos,
 criando uma espécie de carrinho de compras, armazenando os itens em um objeto javascript e exibindo os itens selecionados
  e o valor total quando solicitar o checkout do carrinho. a.
   Você deverá criar uma página HTML com um menu para uma boa interação do usuário.
*/

/*
Requisitos:
- Ferramenta de pedidos
- carrinho de compras
- exibir itens selecionados LISTAR
- exibir o valor total, quando estiver no checkout PROCESSAR
- página html com um menu

*/
class Produto {
    constructor(codigo, nome, valor) {
        this.codigo = codigo;
        this.nome = nome;
        this.valor = valor;
    }
}

class Carrinho {
    constructor() {
        this.produtos = [];
    }
    inserirProduto(produto) {
        this.produtos.push(produto);
    }

    listarProdutos() {
        return this.produtos;
    }

    esvaziarCarrinho() {
        this.produtos = [];
    }
}

//Instanciar um objeto (criar o objeto)
let ar = new Produto(1, "Ar condicionado", 1999.0);
let relogio = new Produto(2, "Relógio", 55.5);
let panelas = new Produto(3, "Panela", 15.5);
let telefone = new Produto(4, "Telefone", 1500.5);

//Exibir no HTML
let prateleira = [];

for (let i = 0; i < 4; i += 1) {
    prateleira.push(ar);
    prateleira.push(relogio);
    prateleira.push(panelas);
    prateleira.push(telefone);
}

function adicionarProduto(produto, quantidade) {
    for (let i = 0; i < quantidade; i += 1) {
        //N * N -> Quadrático
        carrinho.inserirProduto(produto);
    }
}

//Exibir a lista de produtos no HTML
for (let i = 0; i < 4; i += 1) {
    //N -> Linear
    //Colocar em uma <div>
    let produto = prateleira[i];

    let tagLi = document.createElement("li");
    let text = document.createTextNode(
        `Nome: ${produto.nome} Preço: ${produto.valor}`
    );

    let tagInput = document.createElement("input");
    let tagButton = document.createElement("button");
    let textoBotao = document.createTextNode("Adicionar ao Carrinho");
    tagButton.appendChild(textoBotao);
    tagButton.addEventListener("click", (evento) => {
        // Criar um botão que ao ser clicado, insere o produto no carrinho
        adicionarProduto(produto, 1);
        console.log(carrinho.listarProdutos());
    });

    tagLi.appendChild(text);
    tagLi.appendChild(tagInput);
    tagLi.appendChild(tagButton);

    let tagUL = document.getElementById("prateleira");
    tagUL.appendChild(tagLi);
}

let carrinho = new Carrinho();

// O valor vem do HTML, de um <input />
let quantidade = 5;
// Exibir no HTML
let valorTotal = 0;
/*
  for (let i = 1; i <= quantidade; i += 1) {
    carrinho.inserirProduto(ar);
    valorTotal = valorTotal + ar.valor;
  }
  */
//console.log(valorTotal);
console.log(carrinho.listarProdutos());
/*
  let carrinhoGrego = new Carrinho();
  carrinhoGrego.inserirProduto(arroz);
  
  console.log(carrinhoJanderson.listarProdutos());
  
  console.log(carrinhoGrego.listarProdutos());
  */
