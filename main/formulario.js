let contenedorDeFormulario = document.querySelector("#contenedorDeFormulario");
let espacioDeFormularioEnviado = document.querySelector("#parte-de-exito");
let botonFormulario = document.querySelector("#botonFormulario");
let estadoDeSesion = document.querySelector("#estadoDeSesion")

botonFormulario.addEventListener("click", esconderFormulario);
botonDeFormLogin = document.querySelector(".botonFormularioLog");
botonDeFormLogin.addEventListener("click",loginToHome);
function esconderFormulario(e){
    e.preventDefault();
   
    espacioDeFormularioEnviado.classList.remove("oculto");
    espacioDeFormularioEnviado.classList.add("contenedor-exitos");
    
    estadoDeSesion.innerHTML = "Cerrar sesion";

}


function loginToHome(e){
    e.preventDefault();
    document.querySelector("#parte-de-exito").innerHTML = ""
    window.location.href="index.html"
}