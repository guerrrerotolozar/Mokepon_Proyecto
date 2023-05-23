const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null 
let enemigoId = null
let mokeponesEnemigos = []
let mokepones = []
let ataqueJugador =[]
let ataqueEnemigo = []
let opcionDeMokepones
let inputBlaistoise
let inputVenasaur
let inputCharizard
let inputVolcanion
let inputLudicolo
let inputVolcarona
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonPlanta
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
let altura
let ancho = window.innerWidth - 20
const anchoMax = 650

if(ancho > anchoMax ) {
    ancho = anchoMax - 20
}
mapaBackground.src = './assets/estadio.png'
altura = ancho * 600/800
mapa.width = ancho 
mapa.height = altura

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepones(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Blaistoise = new Mokepon('Blaistoise', "./assets/Blastoise.png", 5,'./assets/BlastoiseC.png')
let Venasaur = new Mokepon('Venasaur', "./assets/Venasaur.png", 5,'./assets/VenasaurC.png')
let Charizard = new Mokepon('Charizard', "./assets/Charizard.png", 5,'./assets/CharizardC.png')
let Volcanion = new Mokepon('Volcanion', "assets/Volcanion.png", 5,'./assets/VolcanionC.png')
let Ludicolo = new Mokepon('Ludicolo', "./assets/Ludicolo.png", 5,'./assets/LudicoloC.png')
let Volcarona = new Mokepon('Volcarona', "./assets/Volcarona.png", 5,'./assets/VolcaronaC.png')

const Blaistoise_Ataques = [
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-planta"}
]
Blaistoise.ataques.push(...Blaistoise_Ataques)
const Venasaur_Ataques = [ 
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌱", id: "boton-planta"},
    { nombre: "🌱", id: "boton-planta"},
    { nombre: "🌱", id: "boton-planta"},
    { nombre: "🔥", id: "boton-fuego"}
]
Venasaur.ataques.push(...Venasaur_Ataques)
const Charizard_Ataques = [
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-planta"}
]
Charizard.ataques.push(...Charizard_Ataques)
const Volcanion_Ataques = [
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-planta"}
]
Volcanion.ataques.push(...Volcanion_Ataques)
const Ludicolo_Ataques = [
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🌱", id: "boton-planta"},
    { nombre: "🌱", id: "boton-planta"},
    { nombre: "🔥", id: "boton-fuego"}
]
Ludicolo.ataques.push(...Ludicolo_Ataques)
const Volcarona_Ataques = [
    { nombre: "🌊", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-planta"}
]
Volcarona.ataques.push(...Volcarona_Ataques)


mokepones.push(Blaistoise, Venasaur, Charizard, Volcanion, Ludicolo, Volcarona)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputBlaistoise = document.getElementById("Blaistoise")
    inputVenasaur  = document.getElementById("Venasaur")
    inputCharizard  = document.getElementById("Charizard") 
    inputVolcanion  = document.getElementById("Volcanion") 
    inputLudicolo = document.getElementById("Ludicolo") 
    inputVolcarona = document.getElementById("Volcarona")

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.1.2:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta 
                    })
            }
        })
}

function seleccionarMascotaJugador() {

    if (inputBlaistoise.checked) {
        spanMascotaJugador.innerHTML = inputBlaistoise.id
        mascotaJugador = inputBlaistoise.id
    } else if (inputVenasaur.checked) {
        spanMascotaJugador.innerHTML = inputVenasaur.id
        mascotaJugador = inputVenasaur.id
    } else if (inputCharizard.checked) {
        spanMascotaJugador.innerHTML = inputCharizard.id
        mascotaJugador = inputCharizard.id
    } else if (inputVolcanion.checked) {
        spanMascotaJugador.innerHTML = inputVolcanion.id
        mascotaJugador = inputVolcanion.id
    } else if (inputLudicolo.checked) {
        spanMascotaJugador.innerHTML = inputLudicolo.id
        mascotaJugador = inputLudicolo.id
    } else if (inputVolcarona.checked) {
        spanMascotaJugador.innerHTML = inputVolcarona.id
        mascotaJugador = inputVolcarona.id
    } else {
        alert('Selecciona una mascota')
        return
    }

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mokepon:mascotaJugador
        }) 
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonPlanta = document.getElementById('boton-Planta')
     botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.style.border = "#ffffff00"   
                boton.disabled = true   
            } else if (e.target.textContent === '🌊') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.style.border = "#ffffff00"   
                boton.disabled = true  
            } else {
                ataqueJugador.push('PLANTA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.style.border = "#ffffff00"   
                boton.disabled = true  
            }
            if(ataqueJugador.length === 5 ){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}/ataques`, {
        method: 'post',
        headers:{
            'Content-Type': ' application/json'
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.1.2:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok){
                res.json()
                .then(function({ ataques }){
                    if (ataques.length === 5){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }        
    })
}
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    console.log("Ataque del enemigo", ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('Planta')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'Planta') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Planta' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("xd")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Mucha suerte")
    } else {
        crearMensajeFinal('Muy noob')
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width = 640,
        mapa.height = 462
    )
    mascotaJugadorObjeto.pintarMokepones()

    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon) {
        mokepon.pintarMokepones()
        revisarColisiones(mokepon)
    })

}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    mokeponesEnemigos =enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ''
                        if (mokeponNombre === 'Blaistoise') {
                            mokeponEnemigo = new Mokepon('Blaistoise', "./assets/Blastoise.png", 5,'./assets/BlastoiseC.png', enemigo.id)
                        } else if (mokeponNombre === 'Venasaur') {
                            mokeponEnemigo = new Mokepon('Venasaur', "./assets/Venasaur.png", 5,'./assets/VenasaurC.png', enemigo.id)
                        } else if ( mokeponNombre === 'Charizard'){
                            mokeponEnemigo = new Mokepon('Charizard', "./assets/Charizard.png", 5,'./assets/CharizardC.png', enemigo.id)
                        } else if ( mokeponNombre === 'Volcanion'){
                            mokeponEnemigo = new Mokepon('Volcanion', "assets/Volcanion.png", 5,'./assets/VolcanionC.png', enemigo.id)
                        } else if ( mokeponNombre === 'Ludicolo'){
                            mokeponEnemigo = new Mokepon('Ludicolo', "./assets/Ludicolo.png", 5,'./assets/LudicoloC.png', enemigo.id)
                        } else if ( mokeponNombre === 'Volcarona'){
                            mokeponEnemigo = new Mokepon('Volcarona', "./assets/Volcarona.png", 5,'./assets/VolcaronaC.png', enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo

                    })
                })
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
        }
      });
}
function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColisiones(enemigo){
const arribaEnemigo = enemigo.y
const abajoEnemigo = enemigo.y + enemigo.alto
const derechaEnemigo = enemigo.x + enemigo.ancho
const izquierdaEnemigo = enemigo.x

const arribaMascota = mascotaJugadorObjeto.y
const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
const izquierdaMascota = mascotaJugadorObjeto.x
    if( 
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colisión");

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}
window.addEventListener('load', iniciarJuego) 