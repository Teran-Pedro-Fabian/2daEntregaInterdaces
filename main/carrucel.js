
/* carrucel 1 */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
let pos = 0;
let increment = 0 ;
let btn_izq = document.querySelector("#botonCarrouselIzq");
let btn_der = document.querySelector("#botonCarrouselDer");
let btn_der_flecha= document.querySelector("#fechaDer");
let btn_izq_flecha= document.querySelector("#fechaIzq");
let cards = document.querySelectorAll("#card");

/* carrucel 2 */
/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
let pos2 = 0;
let increment2 = 0 ;
let btn_izq2 = document.querySelector("#botonCarrouselIzq2");
let btn_der2 = document.querySelector("#botonCarrouselDer2");
let btn_der_flecha2= document.querySelector("#fechaDer2");
let btn_izq_flecha2= document.querySelector("#fechaIzq2");
let cards2 = document.querySelectorAll("#card2");


/* carruel 3 */
/* """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" */
let pos3 = 0;
let increment3 = 0 ;
let btn_izq3 = document.querySelector("#botonCarrouselIzq3");
let btn_der3 = document.querySelector("#botonCarrouselDer3");
let btn_der_flecha3= document.querySelector("#fechaDer3");
let btn_izq_flecha3= document.querySelector("#fechaIzq3");
let cards3 = document.querySelectorAll("#card3");



/* llamdada carrucel 1 */
/*  1111111111111111111111111111111111111111111111111111111111111*/
btn_der.addEventListener("click", escrolDer);
btn_izq.addEventListener("click", escrolIzq);
btn_der_flecha.addEventListener("click",escrolDer);
btn_izq_flecha.addEventListener("click",escrolIzq);


/* llamada carruvel 2 */
/*  2222222222222222222222222222222222222222222222222222222222222222*/
btn_der2.addEventListener("click", escrolDer2);
btn_izq2.addEventListener("click", escrolIzq2);
btn_der_flecha2.addEventListener("click",escrolDer2);
btn_izq_flecha2.addEventListener("click",escrolIzq2);



/* llamada carrucel 3 */
/* 33333333333333333333333333333333333333333333333333333333333333 */
btn_der3.addEventListener("click", escrolDer3);
btn_izq3.addEventListener("click", escrolIzq3);
btn_der_flecha3.addEventListener("click",escrolDer3);
btn_izq_flecha3.addEventListener("click",escrolIzq3);







/* funciones */

function escrolIzq(event){/* crea el escrol al boron izquierdo */
    event.preventDefault();
    if(pos > 0){ 
        increment+= 150 
        pos--
    } 
    cards.forEach((card) => {
        card.style.animationName = "animacionCardIzq"; 
        card.style.transform = "translate(" + increment +"px)";
    });   
}

function escrolDer(event){ /* crea el scroll para el boron derecho */
    event.preventDefault();
    if(pos <= cards.length-1){
        increment -= 150
        pos ++
    }
    cards.forEach((card) => {
        card.style.animationName = "animacionCardDer";
        card.style.transform = "translate("+ increment +"px)";
    });
}


/* funciones carrucel 2 */
/* 222222222222222222222222222222222222222222222222222222222222222222 */
function escrolIzq2(event){/* crea el escrol al boron izquierdo */
    event.preventDefault();
    if(pos2 > 0){ 
        increment2+= 150 
        pos2--
    } 
    cards2.forEach((card) => {
        card.style.animationName = "animacionCardIzq"; 
        card.style.transform = "translate(" + increment2 +"px)";
    });   
}

function escrolDer2(event){ /* crea el scroll para el boron derecho */
    event.preventDefault();
    if(pos2 <= cards2.length-1){
        increment2 -= 150
        pos2 ++
    }
    cards2.forEach((card) => {
        card.style.animationName = "animacionCardDer";
        card.style.transform = "translate("+ increment2 +"px)";
    });
}




/* funciones carrucel 3 */
/* 333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333 */
function escrolIzq3(event){/* crea el escrol al boron izquierdo */
    event.preventDefault();
    if(pos3 > 0){ 
        increment3+= 150 
        pos3--
    } 
    cards3.forEach((card) => {
        card.style.animationName = "animacionCardIzq"; 
        card.style.transform = "translate(" + increment3 +"px)";
    });   
}

function escrolDer3(event){ /* crea el scroll para el boron derecho */
    event.preventDefault();
    if(pos3 <= cards3.length-1){
        increment3 -= 150
        pos3 ++
    }
    cards3.forEach((card) => {
        card.style.animationName = "animacionCardDer";
        card.style.transform = "translate("+ increment3 +"px)";
    });
}


document.querySelector("#jugar").addEventListener("click", ()=>{
    console.log("llego");
    
    window.location.href = "game.html"
})


