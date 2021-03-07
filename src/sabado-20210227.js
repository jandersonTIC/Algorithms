/*
const tiposPrimitivos = 1;
const tiposPrimitivos2 = "1";
const tiposPrimitivos = 1.4;

let vtiposPrimitivos = 1;
let vtiposPrimitivos2 = "1";
let vtiposPrimitivos = 1.4;

//        C1, C2,
// Linha: 1, 2, 3, 4
// Linha: 1, 2, 3, 4
const vetor = [1, 2, 3, 4]; //O(n) Linear
const vetor = [
    //O(N²)
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
];

let array = [];

for (let i = 0; i < 10; i++) {
    array.push(`Amige ${i}`);
}

for (let i = 0; i < 10; i++) {
    //console.log(array[i]);
}

let matriz = new Map();
//alimentar a matriz
for (let linha = 0; linha < 10; linha++) {
    let coluna = [];
    //insere itens em colunas da linha atual
    for (let itens = 0; itens < 10; itens++) {
        coluna.push(itens);
    }
    //criando novas linhas
    matriz.set(linha, coluna);
}
*/
class Automovel {
    marca;
    modelo;
    cor;
    quantidadePortas;
    potenciaMotor;

    constructor(marca, modelo, cor, quantidadePortas, potenciaMotor) {
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.quantidadePortas = quantidadePortas;
        this.potenciaMotor = potenciaMotor;
    }

    Ligar() {}

    Desligar() {}

    BaixarVidros() {}
}


var int carro = "fdsfds";
var carro = 1

const carro1 = new Automovel("Fiat", "Uno", "Azul", 4, 1.5);
const carro2 = new Automovel("Fiat", "Uno", "Azul", 4, 1.5);
const carro3 = new Automovel("Fiat", "Uno", "Rosa", 5, 2.0);

const carro4 = {
    marca: "Honda",
    modelo: "Fit",
    cor: "Vermelha",
    quantidadePortas: 2,
    potenciaMotor: 1.5,
};

console.log(carro1, carro2, carro3);
