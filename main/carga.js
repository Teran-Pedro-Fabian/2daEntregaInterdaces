//Es una pantalla de carga trucha, una posta escucharía a DOMContentLoaded o usaría lazy loading para las imágenes. Por qué no la armamos? Porque esta es suficiente para la consigna
//En un escenario real, las cosas se harían bien. No te preocupes que sabemos cómo (o lo googlearemos cuando nos toque implementarlo en un trabajo)
let valores = [0, 10, 20, 25, 30, 40, 55, 60, 77, 80, 90, 100];
let i = 0;
let intervalo = setInterval(() => {
    let numDom = document.querySelector("#carga");
    
    numDom.innerHTML = valores[i] + "%"; 
    
    i++; 
    
    if (i >= valores.length) { 
        clearInterval(intervalo);
    }

    if (i == 12) {
        window.location.href = "home.html"
    }
}, 500); 
