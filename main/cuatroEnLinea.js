/*EJECUCION PRINCIPAL
*El juego tiene 3 estados: 
*1-Esperando para entrar a jugar
*2-Elegir fichas y tamaño del tablero
*3-Jugando
*Estados 1 y 2 todavía no dibujan canvas (para hacerla menos complicada), pero sí interfaz
*Estado 3 tiene un botoncito de reset (que reinicia el juego: reemplaza la instancia de Juego() por una en blanco) y uno de back (que resta uno al estado)
*Transiciones:
*1=>2 al tocar el botón de play
*2=>3 al tocar uno de los botoncitos de modo de juego (4, 5, 6 o 7 en línea). Si no elegiste ficha lo lamento
*3=>2 al apretar back
*/

//seteo constantes
const j1 = 1;
const j2 = 2;
//agarro las secciones desde el DOM (algunas ocultas otras visibles)
const inicio = document.querySelector("#btnJugar"); //con el botón está bien, así se renderiza el HTML base de la página en definitiva, las otras están escondidas
const seccion2 = document.querySelector('.seccion2')
const seccion3 = document.querySelector('.seccion3')

//precargar el canvas
const miCanvas = document.getElementById("miCanvas");
console.log(`El canvas es ${miCanvas}`); //debug

//Calculo que esto es programación orientada a eventos por los eventListener sin una clase que envuelva todo. O funcional por los callbacks, qué sé yo. Arranquemos
const estado1 = ()=>{
  //ESTADO 1: ver si quieren jugar => lanzar setup
  //acá se corre todo el JS que se necesite para el juego, pero que afecte al container del juego. Lo demás, afuera se tratará
  console.log('ESTOY EN EL ESTADO 1') //debug
  //paso a estado 2:
  inicio.addEventListener("click", () => {
    inicio.classList.remove("bloque");
    inicio.classList.add("oculto");
    seccion2.classList.remove("oculto")
    seccion2.classList.add('bloque')
    console.log('PASO AL ESTADO 2') //debug
    estado2();
  });
}

const estado2 = ()=>{
  /*ESTADO 2: callback para setup => lanzo juego*/
  console.log('ESTOY EN EL ESTADO 2') //debug
  let imagenesElegidas = {
    jug1:'',
    jug2:''
  }
  /* Funcion para seleccionar ficha */
  let fichaCapitanAmerica = document.querySelectorAll("#idcap img");
  console.log(fichaCapitanAmerica.length);

  for (let index = 0; index < fichaCapitanAmerica.length; index++) {
    fichaCapitanAmerica[index].addEventListener("click", () => {
      fichaCapitanAmerica.forEach((img) => img.classList.remove("circularCapitanAmerica"));
      fichaCapitanAmerica[index].classList.add("circularCapitanAmerica");
      console.log(fichaCapitanAmerica[index].src)
      console.log(typeof fichaCapitanAmerica[index].src)
      imagenesElegidas.jug1 = fichaCapitanAmerica[index]
    });
  }
  let fichaIronMan = document.querySelectorAll("#idIron img");
  console.log(fichaCapitanAmerica.length);

  for (let index = 0; index < fichaIronMan.length; index++) {
    fichaIronMan[index].addEventListener("click", () => {
      fichaIronMan.forEach((img) => img.classList.remove("circularIronMan"));
      fichaIronMan[index].classList.add("circularIronMan");
      imagenesElegidas.jug2 = fichaIronMan[index] 
    });
  }
  /* se detencta la imagen elejida por cada uno de los jugadores con la clase que se le aplica respectivamente
  circularCapitanAmerica    y   circularIronMan*/

  /* traigo el valor de forma de ganar para poder iniciar el juego*/
  const formaGanar = 0;
  document.querySelector("btnEmpezarJuego").addEventListener("click", ()=>{
    formaGanar= document.querySelector("formaGanar").value;
    //escondo la seccion 2, muestro la 3
    seccion2.classList.remove('bloque')
    seccion2.classList.add("oculto")
    seccion3.classList.remove("oculto")
    seccion3.classList.add('bloque')
    console.log('PASO AL ESTADO 3') //debug
  })
}

const estado3 = ()=>{
  /*ESTADO 3: callback para mantener el game loop/ ir al estado 2 (con respectivos event listener)*/
  console.log('ESTOY EN EL ESTADO 3') //debug
  // Obtener el contexto del canvas
  const ctx = miCanvas.getContext("2d");
  //instancio clase Juego y lo inicio
  const juego = new Juego(
    miCanvas,
    (2*formaGanar-1),
    (2*formaGanar-1),
    imagenesElegidas.jug1,
    imagenesElegidas.jug2,
    formaGanar)
  juego.jugar()
}


//Arranco en estado (del juego) 1: esperando que quieran arrancar a jugar
estado1()

/*FIN EJECUCION, ARRANCA DECLARACION DE CLASES*/

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
    this.crearGrid()
  }
  
  //METODOS
    //INTERNOS
    //para cambiar de turno
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
    //GENERO EL TABLERO
    //crea un arreglo 2d en el que vamos a ir guardando las fichas. 0 es vacio, 1 es jug1, 2 es jug2
    crearGrid(){
      const $tablero = document.querySelector(this.selector)
      const $entrada = document.querySelector('#entrada')
      $tablero.innerHTML = ""
      this.grid = []

      for(let col = 0; col < this.columnas; col++){
        for(let fila = 0; fila < this.filas; fila++){
          this.grid[columna, fila] = 0
        }
      }
    }
    //DIBUJO (presente en estado 2, estado 3)
    //dibujo ficha en el x,y especificado
    dibujarFicha(x,y,imagen){
      ctx.drawImage(imagen, x-(img.width/2), y-(img.height/2))
    }
    //CHEQUEO CONDICIÓN DE VICTORIA (presente en estado 3)
    //reviso si ya gané, pero desde la posición en la que estoy (ver toda la matriz es más costoso en lectura). Si en ninguna de las direcciones se ganó, se sigue
    chequearVictoria(col, fila){
      return(
        this.chequearEnDireccion(col, fila, -1, -1) + this.chequearEnDireccion(col, fila, 1, 1) - 1 == this.cantGanar || //diag desc: arriba izq+abajo der
        this.chequearEnDireccion(col, fila, -1, 0) + this.chequearEnDireccion(col, fila, 1, 0) - 1 == this.cantGanar || //horizontal: izq+der
        this.chequearEnDireccion(col, fila, -1, 1) + this.chequearEnDireccion(col, fila, 1, -1) - 1 == this.cantGanar || //diag crec: der arr+abajo izq
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
    //METODO PRINCIPAL
    jugar(){
      do{
        //espero a que clickee en su ficha elegida
        //pineo la ficha al mouse hasta que clickee una columna válida
        //dejo caer la ficha
        //chequeo victoria
        //cambio de turno
      this.turno = this.turno==j1?j2:j1
      }
      //hago un do while pq hay que ejecutar el bucle antes de checkear la condición de victoria
      while(!this.chequearVictoria(colActual,filaActual && this.jugadaPosible))
    }
}

