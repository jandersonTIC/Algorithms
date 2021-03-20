/**
 * PerifaCode
 * Plantão JavaScript
 * 20/03/2021 17h as 20h20
 */

//Entrada
const altura = 1.6;
const peso = 72;

//Processamento
let resultado;

function calcularPesoIdeal() {
    const imc = peso / altura ** 2;
    if (imc <= 18.5) {
        resultado = "Abaixo do peso";
    } else if (imc <= 24.9) {
        resultado = "Peso ideal";
    } else {
        resultado = "Acima do peso";
    }
}

calcularPesoIdeal();

//Saida
console.log(resultado);
