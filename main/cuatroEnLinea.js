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
  constructor(elementoDOM, filasDesignadas, colDesignadas, img1, img2, cantGanar){
    this.filas = filasDesignadas
    this.columnas = colDesignadas
    //necesitamos saber quién va
    this.turno = 1
    this.tablero = document.querySelector(elementoDOM)
    //si alguien gana, jugando se vuelve false (y nuestra función que revisa quién ganó mostrará quién ganó)
    this.jugando = true
    this.cantGanar = cantGanar
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

  //SETUP (estado 2, estado 3)
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

  //DIBUJO (estado 2, estado 3)
  //dibujo ficha en el x,y especificado
  dibujarFicha(x,y,imagen){
    ctx.drawImage(imagen, x-(img.width/2), y-(img.height/2))
  }

  //CHEQUEO CONDICIÓN DE VICTORIA (estado 3)
  //reviso si ya gané, pero desde la posición en la que estoy (ver toda la matriz es más costoso en lectura). Si en ninguna de las direcciones se ganó, se sigue
  chequearVictoria(col, fila){
    return(
      1 - this.chequearEnDireccion(col, fila, -1, -1) + this.chequearEnDireccion(col, fila, 1, 1) == this.cantGanar || //diag desc: arriba izq+abajo der
      1 - this.chequearEnDireccion(col, fila, -1, 0) + this.chequearEnDireccion(col, fila, 1, 0) == this.cantGanar || //horizontal: izq+der
      1 - this.chequearEnDireccion(col, fila, -1, 1) + this.chequearEnDireccion(col, fila, 1, -1) == this.cantGanar || //diag crec: der arr+abajo izq
      this.chequearEnDireccion(col, fila, 0, 1) == this.cantGanar //abajo
    )
  }

  //revisa cuántas de la misma hay seguidas exclusivamente en la dirección indicada por varH y varV
  chequearEnDireccion(col, fila, varH, varV, contador){
    if (this.grid[col][fila] == this.turno){
      contador++
      //si ya gané, corto la ejecución
      if (contador == this.cantGanar) 
        return contador
    }
    //si la posición que voy a revisar es válida, reviso; de otra manera ya llegué a un límite y no puedo seguir
    if(0 <= col+varH && col+varH < this.grid.length && 0 <= fila+varV && fila+varV <this.grid[0].length)
      return this.chequearEnDireccion(col+varH, fila+varV, varH, varV, contador)
    else
      return contador
  } 
}

/*ESTADO 2: callback para entrar y saltar a estado 3/ volver a estado 1 (para que el botón de back tenga más función que sólo volver a estado 2)*/
//TODO 1 acá definiríamos un callback para esperar clic en botón y pasarle la info al constructor de Juego()+llamar al callback del estado 3
/*ESTADO 3: callback para mantener el game loop/ ir al estado 2 (con respectivos event listener)*/
//TODO 2 acá definiríamos el callback del game loop/volver 

/*EJECUCION PRINCIPAL
*El juego tiene 3 estados: 
*1-Esperando para entrar a jugar
*2-Elegir fichas y tamaño del tablero
*3-Jugando
*Estados 1 y 2 todavía no dibujan canvas (para hacerla menos complicada), pero sí interfaz
*Estado 3 tiene un botoncito de reset (que reinicia el juego: reemplaza la instancia de Juego() por una en blanco) y uno de back (que resta uno al estado)
*/

let maxcol;
let maxfil;
const j1 = 1;
const j2 = 2;

//escuchar al botoncito para cargar el canvas
const miCanvas = document.getElementById("miCanvas");
console.log(`El canvas es ${miCanvas}`); //debug
//ESTADO 1: ver si quieren jugar => lanzar juego
let inicio = document.querySelector("#btnJugar");
//acá se lanza el juego:
inicio.addEventListener("click", () => {
  inicio.classList.remove("bloque");
  document.querySelector(".seccion2").classList.remove("oculto")
  inicio.classList.add("oculto");
  miCanvas.classList.remove("oculto");
  miCanvas.classList.add("bloque");
  config();
});

// Obtener el contexto del canvas
const ctx = miCanvas.getContext("2d");

//estado 3 se dispararía con un new Juego() según lo que configuren
//y con un jugar, ver nombres