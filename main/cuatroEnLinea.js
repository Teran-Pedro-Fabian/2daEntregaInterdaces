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
    miCanvas.classList.remove("oculto");
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
      const entrada = document.querySelector('#entrada')
      //RE engorroso hacer esto pero consistente hacerlo con html+css y no dibujar los controles con canvas
      switch(formaGanar){
        case 4:
          entrada.classList.add('col4')
          entrada.classList.remove('col5')
          entrada.classList.remove('col6')
          entrada.classList.remove('col7')
          break
        case 5:
          entrada.classList.remove('col4')  
          entrada.classList.add('col5')
          entrada.classList.remove('col6')
          entrada.classList.remove('col7')
          break
        case 6:
          entrada.classList.remove('col4')
          entrada.classList.remove('col5')
          entrada.classList.add('col6')
          entrada.classList.remove('col7')
          break
        case 7:
          entrada.classList.remove('col4')
          entrada.classList.remove('col5')
          entrada.classList.remove('col6')
          entrada.classList.add('col7')
          break
      }
      console.log('PASO AL ESTADO 3') //debug
      estado3(
        //pueden pasarme undefined si nunca eligen ficha... pasaré una por defecto si el valor establecido es falsy (undefined/null/''/0)
        {
          jug1: imagenesElegidas.jug1?imagenesElegidas.jug1:fichaCapitanAmerica[0].src,
          jug2: imagenesElegidas.jug2?imagenesElegidas.jug2:fichaIronMan[0].src
        }, 
        miCanvas, 
        formaGanar)
    })
  }

const estado3 = (img, canvas, size)=>{
  /*ESTADO 3: callback para mantener el game loop/ ir al estado 2 (con respectivos event listener)*/
  console.log('ESTOY EN EL ESTADO 3') //debug
  

    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', ()=>{
      juego.blanqueoTablero()
    })
    const backButton = document.querySelector('#back');
    backButton.addEventListener('click',()=>{
      seccion2.classList.remove("oculto")
      seccion2.classList.add('bloque')
      seccion3.classList.remove('bloque')
      seccion3.classList.add('oculto')

      
    })
  //instancio clase Juego y lo inicio
  let juego = new Juego(
    canvas,
    (2*size-2), //se hace -2 para tener una fila que sea para insertar, pero evidentemente no cuenta para la matriz del juego, la condición de victoria se revisa en el arreglo
    (2*size-1), //vimos otros 4 en línea en internet y todos manejan un 7x6... generalizamos para 5, 6 y 7
    img.jug1.src,
    img.jug2.src,//acá son para que SIEMPRE cargue una imagen por defecto cuando los valores que nos pasan son falsy
    size)
    console.log('CREO UNA INSTANCIA DE JUEGO')
}


//Arranco en estado (del juego) 1: esperando que quieran arrancar a jugar
estado1()

/*FIN EJECUCION, ARRANCA DECLARACION DE CLASE*/
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
    // Obtener el contexto del canvas
    this.ctx = this.elementoDOM.getContext("2d");
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
    console.log(this.imagenesElegidas.jug1)
    console.log(this.imagenesElegidas.jug2)
    this.jug1 = document.querySelector("#jug1")
    this.jug2 = document.querySelector("#jug2")
    //declaro tablero virtual e inicio en 0 todos los lugares
    this.board;
    this.blanqueoTablero()
    
    //declaro acá, los inicio y altero con el configEntradas()
    this.entrada = Array(this.colDesignadas).fill(0);
    this.colActual = 0
    //a este lo asocio después dentro de refresh()
    this.inputElement;
    //y acá empieza a tomar interacción
    console.log('Columna actual: ', this.colActual)
    console.log('Columnas totales: ', this.columnas)
    document.addEventListener('keydown', this.manejoTeclado)
  }
  
  //METODOS
    //INTERNOS
    //para cambiar de turno
    actualizarInfoJugador(){
      if(this.turno === 1){
        this.jug1.classList.add("activo")
        this.jug2.classList.remove("activo")
      } else {
        this.jug2.classList.add("activo")
        this.jug1.classList.remove("activo")
      }
    }
    cambiaTurno(){
      this.turno = this.turno==1?2:1
    }
    //vuelve el tablero al blanco
    blanqueoTablero = ()=>{
      this.board = Array(this.colDesignadas).fill().map(() => Array(this.filasDesignadas).fill(0));
      console.table(this.board)
    }
    //SETUP
    //configuro que apreten las flechitas correspondientes
    manejoTeclado = (e) => {
      switch(e.key) {
        case 'ArrowDown':
            console.log('Flecha abajo: pongo la ficha si se puede');
            this.ponerFicha()
            break;
        case 'ArrowLeft':
            console.log('Flecha izq: muevo izq si puedo');
            if(this.colActual>0) this.colActual--
            console.log('Estoy en la columna: ',this.colActual)
            break;
        case 'ArrowRight':
            console.log('Flecha der: muevo der si puedo');
            if(this.colActual+1<this.columnas) this.colActual++
            console.log('Estoy en la columna: ',this.colActual)
            break;
      }
      console.table(this.board)
      //this.refresh()
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
    //METODOS GRAFICOS:
    //refresh se llama cada vez que tocaron alguna tecla
    refresh = ()=>{
      //refresco la entrada
      this.entrada[this.colActual]=this.turno
      for (let i = 0; i < this.columnas; i++) {
        if(this.entrada[i]==this.turno){
          this.ctx.drawImage(this.turno==1?this.imagenesElegidas.jug1:this.imagenesElegidas.jug2, 600/this.columnas, 0)
        }
      }
      //refresco el tablero(canvas)
      for (let i = 0; i < this.columnas; i++) {
        for (let j = 0; j < this.filas; j++) {
          this.ctx.drawImage(
            ()=>{//contemplen, un callback cuyo switch no necesita de break porque retorna algo antes
              switch(this.board[i][j]){
                case 0:
                break
                case 1:
                  return this.imagenesElegidas.jug1
                case 2:
                  return this.imagenesElegidas.jug2
              }
            }, //acá devuelvo la ruta de la imagen
            i*(600/this.columnas)+300/this.columnas, //puse 300 porque es 600/2, math
            (j+1)*(600/this.filas)+300/this.filas //por qué j+1? factor común, necesito dejarle lugar libre a la <ul> que me hace de 'entrada' así que le resto el alto de otra columna más (600 es el alto/ancho por defecto en el CSS)
          )
        }
      }
    }
}

