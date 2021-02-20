const nota1 = 10;
const nota2 = 5;
const nota3 = 10;
const nota4 = 5;

const media = (nota1 + nota2 + nota3 + nota4) / 4;
//REQUISITOS
//SE MEDIA FOR MAIOR QUE 7 ENTÃO APROVADO
//SE MEDIA FOR MAIOR QUE 5 E MENOR QUE 7 ENTÃO RECUPERAÇÃO
//SE MEDIA FOR MENOR QUE 5 ENTÃO REPROVADO

//SE (ARGUMENTO LOGICO FOR VERDADE) ENTÃO FAZ ALGUMA COIS
// SENAO FAZ OUTRA
if (media > 7) {
    console.log("Aprovado");
}

if (media > 5 && media <= 7) {
    //true && false => false
    //AND é verdadeiro se todos os argumentos forem verdadeiros
    //se
    console.log("Recuperação"); //então
} else {
    //senão
    console.log("Reprovado"); //então
}

/*
AND -> E -> &&
OR -> OU-> ||
NOT -> NÃO -> !
*/
/**
 * > maior
 * < menor
 * >= maior ou igual
 * <= menor ou igual
 */
