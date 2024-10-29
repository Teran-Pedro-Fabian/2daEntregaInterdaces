let maxcol
let maxfil
let condicionganar =3
const j1 = 1;
const j2 = 2;
let valorMinimo = 4;
let cuatroEnLinea

function seteoDeTamanio(valor) {
    if (valor >= valorMinimo) {
        maxcol = valor;
        maxfil = valor;
        cuatroEnLinea = new Array(maxc).fill(0).map(() => new Array(maxf).fill(valorNulo));
    }
}
function crearMatriz(valorC, valorF) {
    let columna = valorC;
    let fila = valorF;
    maxcol=valorC;
    maxfil=valorF;
    /* let valorNulo =0; */

    cuatroEnLinea = new Array(fila);
    for (let i = 0; i < fila; i++) {
        cuatroEnLinea[i] = new Array(columna);
        for (let j = 0; j < columna; j++) {
            // Genera un número aleatorio entre 0 y 2 y lo asigna a la celda actual
            cuatroEnLinea[i][j] = Math.floor(Math.random() * 3);
        }
    }

    return cuatroEnLinea;
}
let matriz = crearMatriz(4, 4)

console.table(matriz);
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
/* SECCION DE PRUEVAS DE FUNCIONES */
ganadorHorizontal(1, matriz ,condicionganar)




/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
function recorrerFila() {
    for (let i = 0; i < matriz.length; i++) {
        moverEnHorizontal(matriz[i],j1,j2);
        if(estaElJugador1(matriz,j1) && elemetoMatrizDiag(matriz, j1, j2)){
            juega(matriz[i],j1);
        }else{
            juega(matriz[i], j2);
        } 
    }
    
}
function juega(array, j1) {
    array = j1;
    
}
/* function elemetoMatrizDiag(matriz, j1,j2){
    for (let index = 0; index < array.length; index++) {
        for (let index2 = 0; index2 < array.length; index2++) {
            if () {
                
            }
        }
        
    }
} */
/* console.table(cuatroEnLinea);
console.log(cuatroEnLinea); */







/* verificacion de ganador */////////////////////////////////////////////////////////////////////////////////////////////////////


/* busca el ganador que se le pase */
function buscarganador(matriz, filAgregada, colAgregada, jugador, condicionganar){
    if(ganadorHorizontal(maxcol, filAgregada,jugador, matriz, condicionganar)){
        return jugador
    }
    if(ganadorVertical(maxfil, colAgregada,jugador, matriz, condicionganar)){
        return jugador
    }
    if(ganadorDiagonalCreciente(maxfil, colAgregada,filAgregada,jugador, matriz, condicionganar)){
        return jugador
    }
    if(ganadorDiagonalDecreciente(maxfil, colAgregada,filAgregada,jugador, matriz, condicionganar)){
        return jugador
    }

    return 0
}




/* verifica si gana horizontal, chequea todas las filas */
function ganadorHorizontal(jugador, matriz, condicionGanar) {
    let contador = 0;
    let estaSeguido = false;

    // Calcula los límites de filas y columnas de la matriz
    let maxfil = matriz.length;
    let maxcol = matriz[0].length;

    for (let fil = 0; fil < maxfil; fil++) {
        contador = 0; // Reinicia el contador para cada fila
        estaSeguido = false;

        for (let col = 0; col < maxcol; col++) {
            if (matriz[fil][col] === jugador) {
                estaSeguido = true;
                contador++;
                
                // Si se cumple la condición de ganar, retorna 1
                if (contador === condicionGanar) {
                    console.log("¡Ganó!");
                    return 1;
                }
            } else {
                // Si el jugador no está en esta posición, reinicia el contador
                estaSeguido = false;
                contador = 0;
            }
        }
    }

    return 0; // Retorna 0 si no hay ganador en ninguna fila
}






/* verifica si gana vertical */
function ganadorVertical(maxfil, colAgregada,jugador, matriz, condicionganar){

}