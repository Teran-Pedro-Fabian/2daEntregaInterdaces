const j1 = 1;
const j2 = 2;

function crearMatriz(valorC, valorF){
    let columna = valorC;
    let fila = valorF;
    let valorNulo = 0;
    let cuatroEnLinea = new Array(fila)
    for (let index = 0; index < fila; index++) {
        cuatroEnLinea[index] = new Array(columna).fill(valorNulo);
        
        
    }
    console.table(cuatroEnLinea);
    return cuatroEnLinea;

}
let matriz = crearMatriz(4, 4)

console.log(crearMatriz(4,4));
for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      console.log(matriz[i][j]);
    }
  }

function recorrerFila() {
    for (let i = 0; i < matriz.length; i++) {
        moverEnHorizontal(matriz[i],j1,j2);
    }
    
}
function moverEnHorizontal(matriz, j1, j2) {
    for (let index = 0; index < matriz.length; index++) {
        
        if (matriz[index] == j1 || matriz[index] == j2 && noHayFichaDiagonal(matriz,j1,j2)) {

            puedoColocarFicha(matriz, j1, j2);
        }
        
    }
}


/* console.table(cuatroEnLinea);
console.log(cuatroEnLinea); */