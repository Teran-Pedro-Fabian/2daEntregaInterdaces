/*EJECUCION PRINCIPAL
*El juego tiene 3 estados: 
*1-Esperando para entrar a jugar
*2-Elegir fichas y tamaño del tablero
*3-Jugando
*Estados 1 y 2 todavía no dibujan canvas (para hacerla menos complicada), pero sí por CLI
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

let info = document.querySelector('.info')

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
  //si no hacíamos esto no cazábamos que no tenías que usar .src
  console.log('img jug1: ',img.jug1)
  console.log('img jug2: ',img.jug2)

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
  //instancio clase Juego
  let juego = new Juego(
    canvas,
    (2*size-2), //se hace -2 para tener una fila que sea para insertar, pero evidentemente no cuenta para la matriz del juego, la condición de victoria se revisa en el arreglo
    (2*size-1), //vimos otros 4 en línea en internet y todos manejan un 7x6... generalizamos una fórmula para 5, 6 y 7
    img.jug1,
    img.jug2,
    size)
    console.log('CREO UNA INSTANCIA DE JUEGO')
}


//Arranco en estado 1: esperando que quieran arrancar a jugar
estado1()

/*esta clase llama a inicioJuego(), que toma la jugada 
*después reacciona a la ficha que acaban de poner en todas las posibles direcciones
*/

class Juego {
  constructor(
    elementoDOM, //paso referencia por si tengo que afectar innerHTML
    filasDesignadas,
    colDesignadas,
    img1,
    img2,
    cantGanar
  ){
    this.filas = filasDesignadas;
    this.columnas = colDesignadas;
    this.turno = 1;
    this.elementoDOM = elementoDOM;
    this.ctx = this.elementoDOM.getContext("2d");
    
    // tengo que dejarlo explicitado, capaz lo podríamos dejar en un .env... si esto fuera React o Next :( (cero ganas de hacerlo en un desarrollo vanilla)
    this.elementoDOM.width = 600;
    this.elementoDOM.height = 600;
    
    this.jugando = true;
    this.cantGanar = cantGanar;
    
    // dejo en blanco para cargarlas después
    this.imagenesElegidas ={
      jug1: new Image(),
      jug2: new Image()
    };
    
    // llevo registro de cuántas imágenes cargué
    let imgCargadas = 0;
    const imgTotales = 2;
    
    console.log(img1)
    console.log(img2)

    const onImageLoad = ()=>  {
      imgCargadas++;
      if (imgCargadas == imgTotales) {
        this.inicioJuego();
      }
    };

    // cargar imágenes revisando por errores
    this.imagenesElegidas.jug1.onload = onImageLoad;
    this.imagenesElegidas.jug1.onerror = ()=>{
      console.error("error cargando imagen jug1");
      this.imagenesElegidas.jug1 = null;
      onImageLoad();
    };

    this.imagenesElegidas.jug2.onload = onImageLoad;
    this.imagenesElegidas.jug2.onerror = () => {
      console.error("error cargando imagen jug2");
      this.imagenesElegidas.jug2 = null;
      onImageLoad();
    };

    this.imagenesElegidas.jug1.src = img1;
    this.imagenesElegidas.jug2.src = img2;
  }

  inicioJuego() {
    //dejo las condiciones de arranque: todo en blanco
    this.colActual = 0;
    this.blanqueoTablero();
    this.entrada = Array(this.columnas).fill(0);
    this.refresh();
    //este bind nos va a dejar pelados
    document.addEventListener('keydown', this.manejoTeclado.bind(this));
    this.actualizarInfoJugador();
  }

  dibujarFicha(x, y, width, height, player) {
    if (player == 0) {
      // es una celda vacía
      this.ctx.fillStyle = '0f0f0f'; //color muy Sokovia, el que tenga oídos para oír que oiga
      this.ctx.beginPath();
      this.ctx.arc(
        x + width/2,
        y + height/2,
        Math.min(width, height)/2 - 5,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
    } else { //tiene ficha de alguno de los dos
      const img = player == 1 ? this.imagenesElegidas.jug1 : this.imagenesElegidas.jug2;
      if (img) {
        // si cargó, dibujo la imagen
        this.ctx.drawImage(img, x + 5, y + 5, width - 10, height - 10);
      } else {
        // dibujo un círculo para que el juego se lance igual si por x o por y no entró 
        // sería complicado que pase, ya procuramos que incluso cuando era undefined pase algo sí o sí,
        // pero bueno... ya nos pasó que nos queda unresponsive el canvas porque no carga la imagen
        this.ctx.fillStyle = player == 1 ? 'red' : 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(
          x + width/2,
          y + height/2,
          Math.min(width, height)/2 - 5,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    }
  }

  refresh() {
    // limpio el canvas
    this.ctx.clearRect(0, 0, this.elementoDOM.width, this.elementoDOM.height);
    
    // dibujo fondo (podría ser una imagen? sí, pero ya usamos el fondo en el div.juego, ya se entendió que es temática Civil War)
    this.ctx.fillStyle = '#0066cc';
    this.ctx.fillRect(0, 100, this.elementoDOM.width, this.elementoDOM.height - 100);
    
    const anchoCelda = this.elementoDOM.width / this.columnas;
    const altoCelda = (this.elementoDOM.height - 100) / this.filas;
    
    // dibujo tablero y área de entrada
    if (this.jugando) {
      this.ctx.fillStyle = '#003366';
      this.ctx.fillRect(this.colActual * anchoCelda, 0, anchoCelda, 100);
      this.dibujarFicha(
        this.colActual * anchoCelda + 10,
        10,
        anchoCelda - 20,
        80,
        this.turno
      );
    }
    
    for (let col = 0; col < this.columnas; col++) {
      for (let row = 0; row < this.filas; row++) {
        const x = col * anchoCelda;
        const y = row * altoCelda + 100;
        this.dibujarFicha(x, y, anchoCelda, altoCelda, this.board[col][row]);
      }
    }
  }

  actualizarInfoJugador() {
    const jug1 = document.querySelector("#jug1");
    const jug2 = document.querySelector("#jug2");
    if (this.turno === 1) {
      jug1?.classList.add("activo");
      jug2?.classList.remove("activo");
    } else {
      jug2?.classList.add("activo");
      jug1?.classList.remove("activo");
    }
  }

  blanqueoTablero() {
    this.board = Array(this.columnas).fill().map(() => Array(this.filas).fill(0));
    this.jugando = true;
    this.turno = 1;
    this.colActual = 0;
    this.refresh();
    this.actualizarInfoJugador();
  }

  ponerFicha() {
    if (!this.jugando) return;
    
    // busco el lugar desocupado que más arriba quede
    for (let row = this.filas - 1; row >= 0; row--) {
      if (this.board[this.colActual][row] === 0) {
        this.board[this.colActual][row] = this.turno;
        this.refresh();
        //ganó alguien? empataron? siga siga entonces
        if (this.chequearVictoria(this.colActual, row)) {
          if(this.turno==1){
            info.innerHTML = "Todos pueden caer: el gobierno, SHIELD... y Tony Stark también. Gana Capitán América!"
            info.classList.add('jug1')
            info.classList.remove('jug2')
          }else{
            info.innerHTML = "Tendríamos que cuidar a los que no tienen nuestras posibilidades, no sabemos qué sea lo próximo a lo que nos enfrentemos. Gana Iron Man!"
            info.classList.remove('jug1')
            info.classList.add('jug2')
          }
          this.jugando = false;
        } else if (this.tableroLleno()) {
          alert("¡Empate!");
          this.jugando = false;
        } else {
          this.turno = this.turno === 1 ? 2 : 1;
          this.actualizarInfoJugador();
        }
        return;
      }
    }
  }

  tableroLleno() {
    //quedarme ese viernes mirando a midu fue una buena decisión
    return this.board.every(column => column.every(cell => cell !== 0));
  }

  manejoTeclado(e) {
    if (!this.jugando) return;
    //evito scroll
    e.preventDefault()
    //reviso qué apretó
    switch(e.key) {
      case 'ArrowLeft':
        if (this.colActual > 0) this.colActual--;
        break;
      case 'ArrowRight':
        if (this.colActual < this.columnas - 1) this.colActual++;
        break;
      case 'ArrowDown':
        this.ponerFicha();
        break;
    }
    this.refresh();
  }

  chequearVictoria(col, fila) {
    //gracias midu x2 (nerdearla 2024, creo que 18/10)
    const direcciones = [
      [0, 1],  // vertical
      [1, 0],  // horizontal
      [1, 1],  // diag der
      [1, -1]  // diag izq
    ];
    
    return direcciones.some(([dx, dy]) => {
      let count = 1;
      
      // reviso sumando
      for (let i = 1; i < this.cantGanar; i++) {
        const proxCol = col + (dx * i);
        const proxFila = fila + (dy * i);
        
        if (!this.puedoPonerAhi(proxCol, proxFila) ||
            this.board[proxCol][proxFila] !== this.turno) break;
        count++;
      }
      
      // reviso restando
      for (let i = 1; i < this.cantGanar; i++) {
        const proxCol = col - (dx * i);
        const proxFila = fila - (dy * i);
        
        if (!this.puedoPonerAhi(proxCol, proxFila) ||
            this.board[proxCol][proxFila] !== this.turno) break;
        count++;
      }
      
      /*sólo aumento la cantidad de conectadas sí y solo sí
      * 1-el lugar donde quiero chequear está ocupado
      * 2-es una ficha de las del que está jugando
      * 
      * como voy aumentando de a 1, es N-extensible
      * y puede pasar que tenga más que N como en los juegos de Facebook que conectás cosas y te da bonus
      */
      return count >= this.cantGanar;
    });
  }

  puedoPonerAhi(col, row) {
    return col >= 0 && col < this.columnas &&
           row >= 0 && row < this.filas;
  }
}