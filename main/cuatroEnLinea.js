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

  for (let index = 0; index < fichaCapitanAmerica.length; index++) {
    fichaCapitanAmerica[index].addEventListener("click", () => {
      fichaCapitanAmerica.forEach((img) => img.classList.remove("circularCapitanAmerica"));
      fichaCapitanAmerica[index].classList.add("circularCapitanAmerica");
      console.log(fichaCapitanAmerica[index].src)
      console.log(typeof fichaCapitanAmerica[index].src)  //debug para ver que se esta guardando
      imagenesElegidas.jug1 = fichaCapitanAmerica[index]
    });
  }
  let fichaIronMan = document.querySelectorAll("#idIron img");

  for (let index = 0; index < fichaIronMan.length; index++) {
    fichaIronMan[index].addEventListener("click", () => {
      fichaIronMan.forEach((img) => img.classList.remove("circularIronMan"));
      fichaIronMan[index].classList.add("circularIronMan");
      console.log(fichaIronMan[index].src)
      console.log(typeof fichaIronMan[index].src) //debug para ver que se esta guardando
      imagenesElegidas.jug2 = fichaIronMan[index]
    });
  }
  /* se detencta la imagen elejida por cada uno de los jugadores con la clase que se le aplica respectivamente
  circularCapitanAmerica    y   circularIronMan*/

  /* traigo el valor de forma de ganar para poder iniciar el juego*/
  let formaGanar = 0;

  document.querySelector("#btnEmpezarJuego").addEventListener("click", ()=>{
      console.log(document.querySelector("#formaGanar").value) //debug para ver si puedo pasarlo como numero
      formaGanar= document.querySelector("#formaGanar").value;
      console.log(formaGanar)
      //escondo la seccion 2, muestro la 3
      seccion2.classList.remove('bloque')
      seccion2.classList.add("oculto")
      seccion3.classList.remove("oculto")
      seccion3.classList.add('bloque')
      console.log('PASO AL ESTADO 3') //debug
      estado3(imagenesElegidas, miCanvas, formaGanar)
    })
  }

const estado3 = (img, canvas, size)=>{
  /*ESTADO 3: callback para mantener el game loop/ ir al estado 2 (con respectivos event listener)*/
  console.log('ESTOY EN EL ESTADO 3') //debug
  // Obtener el contexto del canvas
  const ctx = canvas.getContext("2d");
  //instancio clase Juego y lo inicio
  const juego = new Juego(
    canvas,
    (2*size-2), //se hace -2 para tener una fila que sea para insertar, pero evidentemente no cuenta para la matriz del juego, la condición de victoria se revisa en el arreglo
    (2*size-1), //vimos otros 4 en línea en internet y todos manejan un 7x6... generalizamos
    img.jug1.src,
    img.jug2.src,
    size)
    console.log('CREO UNA INSTANCIA DE JUEGO')
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
  constructor(elementoDOM, //se está pasando directamente referencia al elemento HTML
    filasDesignadas, //se pasan en función del select
    colDesignadas,
    img1, //se pasan strings con las rutas de lo que cada quién eligió
    img2,
    cantGanar //se pasa en función del select
  ){
    this.filas = filasDesignadas
    console.log(this.filas)
    this.columnas = colDesignadas
    console.log(this.columnas)
    //necesitamos saber quién va
    this.turno = 1
    this.elementoDOM = elementoDOM
    //si alguien gana, jugando se vuelve false (y nuestra función que revisa quién ganó mostrará quién ganó)
    this.jugando = true
    this.cantGanar = cantGanar
    //si alguien jugó, lo disparamos desde la función "jugar" y llamamos a un callback para que sea orientado a eventos
    this.onAlguienJuega = () =>{
      this.actualizarInfoJugador()
    }
    this.imagenesElegidas= {
        jug1: img1,
        jug2: img2
    }
    let board = Array(filasDesignadas).fill().map(() => Array(colDesignadas).fill(0))
    console.table(board)
    this.board = board
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
    //crea un arreglo 2d en el que vamos a ir guardando la info de las fichas. 0 es vacio, 1 es jug1, 2 es jug2
    crearGrid(){
      const $entrada = document.querySelector('#entrada')
      this.elementoDOM.innerHTML = ""
      
      
      this.grid = grid
      //actualizar el DOM
    }
    //DIBUJO (presente en estado 2, estado 3)
    //dibujo ficha en el x,y especificado
    dibujarFicha(x,y){
      ctx.drawImage(
        this.turno==1?this.imagenesElegidas.jug1:this.imagenesElegidas.jug2,
        x-(img.width/2),
        y-(img.height/2))
    }
    //basado en lo que tiene la matriz, dibujo el canvas
    updateBoard(){

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
        let colActual = 0;
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

