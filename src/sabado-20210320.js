/**
 * PerifaCode
 * Plantão JavaScript
 * 20/03/2021 17h as 20h20
 */

//Entrada
const altura = 1.6;
const peso = 30;

//Processamento
function calcularPesoIdeal(peso, altura) {
    const imc = peso / altura ** 2;
    let resultado;
    if (imc <= 18.5) {
        resultado = "Abaixo do peso";
    } else if (imc <= 24.9) {
        resultado = "Peso ideal";
    } else {
        resultado = "Acima do peso";
    }
    return resultado;
}

let resultado1 = calcularPesoIdeal(peso, altura);
let resultado2 = calcularPesoIdeal(100, 1.5);
let resultado3 = calcularPesoIdeal(70, 1.69);

//Saida
console.log(resultado1);
console.log(resultado2);
console.log(resultado3);
