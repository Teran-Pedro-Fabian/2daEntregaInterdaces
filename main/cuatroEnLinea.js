let maxcol
let maxfil
let condicionganar =3
const j1 = 1;
const j2 = 2;
let valorMinimo = 4;
let cuatroEnLinea;

//escuchar al botoncito para cargar el canvas
const miCanvas = document.getElementById('miCanvas')
console.log(`El canvas es ${miCanvas}`)
let inicio = document.querySelector('#btnJugar')
//acá se lanza el juego:
inicio.addEventListener("click", ()=>{
    inicio.classList.remove('bloque')
    inicio.classList.add('oculto')
    miCanvas.classList.remove('oculto')
    miCanvas.classList.add('bloque')
    jugar()
})

// Obtener el contexto del canvas
const ctx = miCanvas.getContext('2d');

function seteoDeTamanio(valor) {
    if (valor >= valorMinimo) {
        maxcol = valor;
        maxfil = valor;
        // Crea la matriz con el nuevo tamaño
        cuatroEnLinea = new Array(maxcol).fill(0).map(() => new Array(maxfil).fill(0));
    }
}

document.querySelector("#btnJugar").addEventListener("click", function() {
    seteoDeTamanio(4); // Define el tamaño de la matriz
    /*29-10 comentado para hacer todo dentro del canvas (y esto lo vuelve invisible, tenemos que laburar dentro del canvas)
     mostrarMatriz(); */
});

/* function mostrarMatriz() {
    const matrizContainer = document.getElementById("matrizContainer");
    matrizContainer.innerHTML = ""; // Limpia el contenedor antes de mostrar la matriz

    for (let i = 0; i < maxfil; i++) {
        let fila = document.createElement("div"); // Crea un nuevo div para cada fila
        fila.className = "fila"; // Clase para estilo
        for (let j = 0; j < maxcol; j++) {
            let celda = document.createElement("div"); // Crea un nuevo div para cada celda
            celda.className = "celda"; // Clase para estilo
            celda.textContent = cuatroEnLinea[i][j]; // Añade el valor de la matriz
            fila.appendChild(celda); // Añade la celda a la fila
        }
        matrizContainer.appendChild(fila); // Añade la fila al contenedor de la matriz
    }
    document.querySelector(".juego").classList.add("oculto");
} */

const jugar = () =>{

}
    // Inicializa la matriz para depuración y pruebas
seteoDeTamanio(4);
console.table(cuatroEnLinea);

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
console.log("horizontal")
ganadorHorizontal(2, matriz ,condicionganar)
console.log("vertical")
ganadoVertical(2,matriz,condicionganar)
console.log("diagonal decreciente")
ganadorDiagonalDecreciente(2,matriz,condicionganar)
console.log("diagonal creciente")
ganadorDiagonalCreciente(2,matriz,condicionganar)

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
function buscarganador(matriz, jugador, condicionganar){
    if(ganadorHorizontal(jugador, matriz, condicionganar)){
        return jugador
    }
    if(ganadorVertical(jugador, matriz, condicionganar)){
        return jugador
    }
    if(ganadorDiagonalCreciente(jugador, matriz, condicionganar)){
        return jugador
    }
    if(ganadorDiagonalDecreciente(jugador, matriz, condicionganar)){
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
                    return jugador;
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
function ganadoVertical(jugador, matriz, condicionganar){
    let contador = 0;
    let estaSeguido = false;

    // Calcula los límites de filas y columnas de la matriz
    let maxfil = matriz.length;
    let maxcol = matriz[0].length;

    for (let col = 0; col < maxcol; col++) {
        contador = 0; // Reinicia el contador para cada fila
        estaSeguido = false;

        for (let fil = 0; fil < maxfil; fil++) {
            if (matriz[fil][col] === jugador) {
                estaSeguido = true;
                contador++;
                
                // Si se cumple la condición de ganar, retorna 1
                if (contador === condicionganar) {
                    console.log("¡Ganó!");
                    return jugador;
                }
            } else {
                // Si el jugador no está en esta posición, reinicia el contador
                estaSeguido = false;
                contador = 0;
            }
        }
    }

    return 0; // Retorna 0 si no hay ganador en ninguna columna
}

function ganadorDiagonalDecreciente(jugador, matriz, condicionGanar){

        let maxfil = matriz.length;
        let maxcol = matriz[0].length;
    
        for (let fil = 0; fil <= maxfil - condicionGanar; fil++) {
            for (let col = 0; col <= maxcol - condicionGanar; col++) {
                let contador = 0;
    
                // Verifica la diagonal creciente
                for (let i = 0; i < condicionGanar; i++) {
                    if (matriz[fil + i][col + i] === jugador) {
                        contador++;
                    } else {
                        break; // Si encuentra un número diferente, rompe el bucle
                    }
                }
                // Si el contador alcanza la condición de ganar, retorna 1
                if (contador === condicionGanar) {
                    console.log("¡Ganó en diagonal decreciente!");
                    return 1;
                }
            }
        }
    
        return 0; // Retorna 0 si no hay seguidilla en diagonal
}


function ganadorDiagonalCreciente(jugador,matriz,condicionGanar){
        let maxfil = matriz.length;
        let maxcol = matriz[0].length;
    
        for (let fil = 0; fil <= maxfil - condicionGanar; fil++) {
            for (let col = condicionGanar - 1; col < maxcol; col++) {
                let contador = 0;
    
                // Verifica la diagonal decreciente
                for (let i = 0; i < condicionGanar; i++) {
                    if (matriz[fil + i][col - i] === jugador) {
                        contador++;
                    } else {
                        break; // Si encuentra un número diferente, rompe el bucle
                    }
                }
    
                // Si el contador alcanza la condición de ganar, retorna 1
                if (contador === condicionGanar) {
                    console.log("¡Ganó en diagonal creciente!");
                    return 1;
                }
            }
        }
    
        return 0; // Retorna 0 si no hay seguidilla en diagonal
    }



    class Ficha {
        constructor(x, y, radio, imagenSrc) {
            this.x = x; // Posición en el eje X
            this.y = y; // Posición en el eje Y
            this.radio = radio; // Radio de la ficha
            this.imagen = new Image(); // Crear una nueva imagen
            this.imagen.src = imagenSrc; // Ruta de la imagen
        }
    
        // Método para dibujar la ficha en el canvas con imagen
        dibujar(ctx) {
            // Dibujar la imagen solo después de que se haya cargado
            this.imagen.onload = () => {
                // Crear un círculo de recorte
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
    
                // Dibujar la imagen dentro del área de recorte
                ctx.drawImage(
                    this.imagen,
                    this.x - this.radio, // Coordenada x para que la imagen se centre en el círculo
                    this.y - this.radio, // Coordenada y para que la imagen se centre en el círculo
                    this.radio * 2,      // Ancho de la imagen en el círculo
                    this.radio * 2       // Alto de la imagen en el círculo
                );
    
                // Restaurar el contexto a su estado original
                ctx.restore();
            };
        }
    }