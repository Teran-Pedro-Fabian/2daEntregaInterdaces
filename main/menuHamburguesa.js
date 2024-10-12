let boton = document.querySelector("#boton");
let espacio = document.querySelector("#espacio");
let menu = document.querySelector("#menu");
let closeBtn = document.querySelector("#close-btn");

boton.addEventListener("click", abrirMenu);
closeBtn.addEventListener("click", cerrarMenu);


function abrirMenu(event) {
    event.preventDefault();
    menu.classList.remove("oculto");  
    boton.style.display = "none"; 
    espacio.style.display = "flex";
    menu.style.animationName = "menuResponsive";
    menu.style.left = "0"; // Llega a su posición visible
}

function cerrarMenu() {
    menu.classList.add("oculto");
    boton.style.display = "flex"; // Muestra nuevamente el botón de hamburguesa
    menu.style.left = "-50%"; // Vuelve a la posición inicial fuera de la pantalla
}


