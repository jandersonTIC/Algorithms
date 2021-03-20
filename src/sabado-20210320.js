/**
 * PerifaCode
 * Plantão JavaScript
 * 20/03/2021 17h as 20h20
 */

//HTML src/sabado-20210320.html
/*
<input name="peso" id="inputPeso" />
<input name="altura" id="inputAltura" />
<button id="botaoCalcular">Calcular peso ideal</button>
<div id="resultado"></div>
*/

//Entrada
document.getElementById("botaoCalcular").addEventListener("click", () => {
    const peso = document.getElementById("inputPeso").value;
    const altura = document.getElementById("inputAltura").value;
    const resultado = calcularPesoIdeal(peso, altura);
    document.getElementById("resultado").innerText = resultado;
});

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
