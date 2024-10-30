class Ficha {
  constructor(x, y, radio, imagenSrc) {
    this.x = x; // Posición en el eje X
    this.y = y; // Posición en el eje Y
    //0=listo, 1=clickeado, 2=colocado en columna, 3=cayendo, 4=final(quieto e inamovible). lo puse como entero para que no sea ambiguo (si me escribís cAyEnDO ya no es == a cayendo)
    this.estado = 0
    this.radio = radio; // Radio de la ficha
    this.imagen = new Image(); // Crear una nueva imagen
    this.imagen.src = imagenSrc; // Ruta de la imagen
  }
  setEstado(nuevoEstado){
    this.estado = nuevoEstado
  }
  setX(nuevoX){
    this.x = nuevoX
  }
  setY(nuevoY){
    this.y = nuevoY
  }
  //estado1: pegarme al mouse
  pin(e){
    this.setX(e.offsetX)
    this.setY(e.offsetY)
    console.log('(',this.x,',', this.y,')')
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
        this.radio * 2, // Ancho de la imagen en el círculo
        this.radio * 2 // Alto de la imagen en el círculo
      );

      // Restaurar el contexto a su estado original
      ctx.restore();
    };
  }
}

class Juego{
  //elementoDOM se usa para hacer referencia al canvas, lo vamos a llamar más tarde. X e Y se determinan cuando se decide de cuántas fichas en línea se trata
  constructor(elementoDOM, filasDesignadas, colDesignadas, img1, img2){
    this.filas = filasDesignadas
    this.columnas = colDesignadas
    //necesitamos saber quién va
    this.turno = 1
    this.tablero = document.querySelector(elementoDOM)
    //si alguien gana, jugando se vuelve false (y nuestra función que revisa quién ganó mostrará quién ganó)
    this.jugando = true
    //si alguien jugó, lo disparamos desde la función "jugar" y llamamos a un callback para que sea orientado a eventos
    this.onAlguienJuega = () =>{
      this.actualizarInfoJugador()
    }
    //el juego tiene sus imágenes y esto lo vuelve mantenible y escalable
    this.imagenesJugadores = {
      1: [
        `../images/imagenesParaFichas/capitanAmericaFicha1.jpg`,
        `../images/imagenesParaFichas/capitanAmericaFicha2.jpg`,
        `../images/imagenesParaFichas/capitanAmericaFicha3.jpg`,
        `../images/imagenesParaFichas/capitanAmericaFicha4.jpg`
      ],
      2: [
        `../images/imagenesParaFichas/ironManFicha1.jpg`,
        `../images/imagenesParaFichas/ironManFicha2.jpg`,
        `../images/imagenesParaFichas/ironManFicha3.jpg`,
        `../images/imagenesParaFichas/ironManFicha4.jpg`
      ]
    }
    this.imagenesElegidas= {
        jug1: img1,
        jug2: img2
    }
  }

  actualizarInfoJugador(){
    const jug1 = document.querySelector(".jug1")
    const jug2 = document.querySelector(".jug2")
    if(this.turno === 1){
      jug1.classList.add("activo")
      jug2.classList.remove("activo")
    } else {
      jug2.classList.add("activo")
      jug1.classList.remove("activo")
    }
  }
  //SETUP
  //configuro que clickeen en distintas zonas del canvas
  configEntradas(){
    let resetButton = document.querySelector("#reset")
    resetButton.addEventListener()
  }

  //crea un arreglo 2d en el que vamos a ir guardando las fichas. 0 es vacio, 1 es jug1, 2 es jug2
  crearGrid(){
    const $tablero = document.querySelector(this.selector)
    $tablero.innerHTML = ""
    this.grid = []

    for(let col = 0; col < this.columnas; col++){
      for(let fila = 0; fila < this.filas; fila++){
        this.grid[columna, fila] = 0
      }
    }
  }

  //DIBUJO
  //dibujo ficha en el x,y especificado
  dibujarFicha(x,y,imagen){
    ctx.drawImage(imagen, x-(img.width/2), y-(img.height/2))
  }


  //reviso si ya gané
  chequearVictoria(col, fila){
    return(
      this.chequearEnDireccion(col, fila, 0, 1) || //aumentá para la derecha
      this.chequearEnDireccion(col, fila, 1, 0) || //" " abajo
      this.chequearEnDireccion(col, fila, 1, 1) || //" " derecha, abajo (diagonal descendiente)
      this.chequearEnDireccion(col, fila, 1, 1)  //" " derecha, arriba (diagonal ascendiente)
    )
  }

  chequearEnDireccion(col, fila, varH, varV, accum){
    if (accum == 4) return true
    if (this.grid[col][fila] == this.turno) return this.chequearEnDireccion(col+varH, fila+varV, varH, varV)
  } 
}

let maxcol;
let maxfil;
let condicionganar = 3;
const j1 = 1;
const j2 = 2;
let valorMinimo = 4;
let cuatroEnLinea;

//escuchar al botoncito para cargar el canvas
const miCanvas = document.getElementById("miCanvas");
console.log(`El canvas es ${miCanvas}`);
let inicio = document.querySelector("#btnJugar");
//acá se lanza el juego:
inicio.addEventListener("click", () => {
  inicio.classList.remove("bloque");
  inicio.classList.add("oculto");
  miCanvas.classList.remove("oculto");
  miCanvas.classList.add("bloque");
  jugar();
});

// Obtener el contexto del canvas
const ctx = miCanvas.getContext("2d");

// Acá dibuja la pantalla. Estimo que vamos a darle algo como 30 FPS así que dentro de jugar(), un interval va a llamar a drawScreen 30 veces por segundo
const drawScreen = () => {

};

function seteoDeTamanio(valor) {
  if (valor >= valorMinimo) {
    maxcol = valor;
    maxfil = valor;
    // Crea la matriz con el nuevo tamaño
    cuatroEnLinea = new Array(maxcol)
      .fill(0)
      .map(() => new Array(maxfil).fill(0));
  }
}

// Inicializa la matriz para depuración y pruebas
seteoDeTamanio(4);
console.table(cuatroEnLinea);

  for (let fil = 0; fil < maxfil; fil++) {
    contador = 0; // Reinicia el contador para cada fila
    estaSeguido = false;

    for (let col = 0; col < maxcol; col++) {
      if (matriz[fil][col] === jugador) {
        estaSeguido = true;
        contador++;

        // Si se cumple la condición de ganar, retorna 1
        if (contador === condicionGanar) {
          console.log("¡Victoria!");
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


/* verifica si gana vertical */
function ganadorVertical(jugador, matriz, condicionganar) {
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

function ganadorDiagonalDecreciente(jugador, matriz, condicionGanar) {
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

function ganadorDiagonalCreciente(jugador, matriz, condicionGanar) {
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

