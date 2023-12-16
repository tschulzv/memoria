const endpoint = 'https://random-word-api.herokuapp.com/word?length=5';
// ELEMENTOS
const FACIL = document.getElementById("facil");
const NORMAL = document.getElementById("normal");
const DIFICIL = document.getElementById("dificil");
const NIVELES = document.getElementById("niveles");
const MSJE_NIVEL = document.getElementById("mensaje-nivel");
const JUEGO = document.getElementById("juego");
const BOTON = document.getElementById("intentar");
const PALABRA = document.getElementById("palabra");
const DISP= document.getElementById("num-intentos");
const PUNTOS= document.getElementById("num-puntos");
const REINICIAR = document.getElementById("reiniciar");
const FIN = document.getElementById("fin");

// VARIABLES GLOBALES
let intentos = 5;
let puntos = 0;
let palabra;
let time;

// INICIO y DEFINICION DE LOS NIVELES
window.onload = () => {
    niveles();
    PALABRA.style.display = 'none';
}

function niveles(){
    NIVELES.style.display = "block";
    JUEGO.style.display = "none";
}

// EVENTOS
BOTON.addEventListener('click', () => {intentar()});
FACIL.addEventListener('click', () => {
    genPalabra(3000)});
DIFICIL.addEventListener('click', () => {
    genPalabra(1000)});
NORMAL.addEventListener('click', () => {
    genPalabra(2000)});
REINICIAR.addEventListener('click', () => {
    if (intentos == 0){
        location.reload();
    }
    else {
        FIN.style.display = "none";
        PALABRA.style.display = "none";
        document.getElementById("word").value="";
        genPalabra(time);
    }
});

function genPalabra(t){
    fetch(endpoint).then(response => response.json())
        .then(response => {
        palabra = response[0];
        PALABRA.innerHTML = palabra;
        jugar(t);
    })
    .catch(err => console.log(err));
}

function jugar(t){
    document.getElementById("word").disabled = true;
    PUNTOS.innerHTML = puntos;
    BOTON.disabled = false;
    time = t;
    NIVELES.style.display = "none";
    JUEGO.style.display = "block";
    PALABRA.style.display = "block";

    setTimeout(() => {
        PALABRA.style.display = 'none';
        document.getElementById("word").disabled = false;
      }, time);
}

function leerIntento(){
    let intento = document.getElementById("word");
    return intento.value;
}

function intentar(){
    const INTENTO = leerIntento();
 
    if (INTENTO == palabra) {
        puntos++;
        terminar("Acertaste!");
    }
    else{
        intentos--;
        terminar(`Fallaste! La palabra era ${palabra}`);
    }
    DISP.innerHTML=intentos;
    if (intentos==0){
        REINICIAR.innerHTML = "REINICIAR";
        terminar(`Perdiste! La palabra era ${palabra}`)
    }
}

function terminar(mensaje){
    BOTON.disabled = true;
    let contenedor = document.getElementById('mensaje-final');
    contenedor.innerHTML = mensaje;
    FIN.style.display = "block";
}
