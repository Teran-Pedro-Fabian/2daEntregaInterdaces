let maxc = 4;
let maxf = 4;
let valorMinimo = 4;
let valorNulo = 0;
let jugador1 = 1;
let jugador2 = 2;

let cuatroEnLinea = new Array(maxc);
for (let index = 0; index < maxc; index++) {
    cuatroEnLinea[index] = new Array(maxc).fill(valorNulo);
}

function juego(){
    
}

// Establece el tamaño de la matriz, pero asegura que no sea menor al valor mínimo.
function seteoDeTamanio(valor) {
    if (valor >= valorMinimo) {
        maxc = valor;
        maxf = valor;
        cuatroEnLinea = new Array(maxc).fill(0).map(() => new Array(maxf).fill(valorNulo));
    }
}

// Verifica si el espacio ya está ocupado por el mismo jugador.
function espacioOcupado(caidaEnC, caidaEnF, valorJugador) {
    return cuatroEnLinea[caidaEnF][caidaEnC] === valorJugador;
}

// Verifica si hay 'valorMinimo' elementos en línea alrededor de la posición dada.
function turnoJugar(caidaEnC, caidaEnF, valorJugador) {
    let direcciones = [
        { dc: -1, df: 0 },  // izquierda
        { dc: 1, df: 0 },   // derecha
        { dc: 0, df: -1 },  // arriba
        { dc: 0, df: 1 },   // abajo
        { dc: -1, df: -1 }, // diagonal arriba izquierda
        { dc: 1, df: 1 },   // diagonal abajo derecha
        { dc: -1, df: 1 },  // diagonal abajo izquierda
        { dc: 1, df: -1 }   // diagonal arriba derecha
    ];

    for (let i = 0; i < direcciones.length; i++) {
        let contador = 1; // Cuenta la pieza actual
        let dc = direcciones[i].dc;
        let df = direcciones[i].df;
        
        // Recorre en la dirección especificada
        for (let j = 1; j < valorMinimo; j++) {
            let col = caidaEnC + dc * j;
            let fil = caidaEnF + df * j;
            
            // Verifica si el índice está dentro de los límites y pertenece al mismo jugador
            if (col >= 0 && col < maxc && fil >= 0 && fil < maxf && cuatroEnLinea[fil][col] === valorJugador) {
                contador++;
            } else {
                // Si encuentra un valor distinto o está fuera de los límites, termina este recorrido
                j = valorMinimo; // Fuerza la salida del bucle `for`
            }
        }
        
        if (contador >= valorMinimo) {
            console.log("Ganador!");
            return true;
        }
    }
    return false;
}
