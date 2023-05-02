import { Vaixell } from "./vaixell.js"
import { VaixellEnemic } from "./vaixellEnemic.js"
import { vaixellJugador } from "./vaixellJugador.js"
Date.prototype.formattedDate = function(){
    let month =  this.getMonth()+1
    return this.getDate() + "-" + month + "-" + this.getFullYear();
}




window.onload = () => {
    comprovaNom()
    document.getElementById('form-inici').addEventListener('submit',guardaNom)
    generaJoc()
    setInterval(joc,100)
    document.getElementById('logout').addEventListener('click',()=>{
        sessionStorage.removeItem('username');
        document.getElementById('inici').style.display=""
    })
   
    db.mostrar()
}
let username;
let db = new Database();
function guardaNom(ev){
    console.log("aaa")
    ev.preventDefault()
    username = document.getElementById('username').value
    if(!new RegExp("[A-Z]{1}[a-z]{3,}").test(username)){
        alert("Introdueix un nom de mínim 4 caràcters i que començi amb majúscula")
        return
    }
    sessionStorage.setItem('username',username)
    document.getElementById('inici').style.display="none"
    document.getElementById('my-username').innerHTML="Username: "+username
}
function comprovaNom(){
    if(sessionStorage.getItem('username')){
        username = sessionStorage.getItem('username')
        document.getElementById('inici').style.display="none"
        document.getElementById('my-username').innerHTML="Username: "+username

    }
}
function generaJoc() {
    generaVaixells(taulellEnemic)
    generaTaulell(taulellJugador, document.getElementById('jugador'))
    generaTaulell(taulellEnemic, document.getElementById('enemic'), true)
    let imatges = document.querySelectorAll('img');
    [].forEach.call(imatges, function (item) {
        item.addEventListener('dragstart', gestionarIniciDrag, false);
    });
}

function joc() {
    document.getElementById('undo').addEventListener('click',undo)
    document.getElementById('playerShips').innerHTML = vaixellsJugador.length
    document.getElementById('enemyShips').innerHTML = vaixellsEnemics.length
    if(fase == 1) comprovaVictoria();
    reloadLog();
}

let imatges
let drag = undefined;
let fase = 0;



let taulellJugador =
    [
        ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        ["A", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["B", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["C", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["D", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["E", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["F", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["G", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["H", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["I", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["J", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
let taulellEnemic =
    [
        ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        ["A", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["B", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["C", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["D", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["E", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["F", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["G", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["H", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["I", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["J", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
let impactesEnemic =
[       // 0 = Unknown // 1 = Tocat // 2 = Enfonsat // 3 = Agua //
    ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ["A", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["B", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["C", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["D", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["E", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["F", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["G", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["H", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["I", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ["J", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let vaixellsEnemics = []
let vaixellsJugador = []

let log = []


function generaVaixells(taulell) {
    vaixellsEnemics.push(new VaixellEnemic(2, taulell));
    vaixellsEnemics.push(new VaixellEnemic(1, taulell));
    vaixellsEnemics.push(new VaixellEnemic(4, taulell));
    vaixellsEnemics.push(new VaixellEnemic(5, taulell));
    vaixellsEnemics.push(new VaixellEnemic(2, taulell));
    vaixellsEnemics.push(new VaixellEnemic(3, taulell));
    vaixellsEnemics.push(new VaixellEnemic(1, taulell));
    console.log("Numero de barcos de tamany 1: "+vaixellsEnemics.filter((x)=>{return x.llargada == 0}).length)
    console.log("Numero de barcos de tamany 2: "+vaixellsEnemics.filter((x)=>{return x.llargada == 1}).length)
    console.log("Numero de barcos de tamany 3: "+vaixellsEnemics.filter((x)=>{return x.llargada == 2}).length)
    console.log("Numero de barcos de tamany 4: "+vaixellsEnemics.filter((x)=>{return x.llargada == 3}).length)
    console.log("Numero de barcos de tamany 5: "+vaixellsEnemics.filter((x)=>{return x.llargada == 4}).length)
    console.log("Caselles ocupades: "+vaixellsEnemics.reduce((total,vaixell)=>{
        if(total instanceof Vaixell){
            return (total.llargada+1)+(vaixell.llargada+1);
        }
        return total+(vaixell.llargada+1);
    }))
}

function afegirLog(player,x,y,result){
    log.push([player,x,y,result])
    if(log.length>20) log.shift()
}

function reloadLog(){
    let letters = ["A","B","C","D","E","F","G","H","I","J"]
    let hitTypes = ["null","Tocat","Enfonsat","Aigua"]
    let display = document.getElementById('log');
    display.innerHTML = "";
    log.forEach((logEntry)=>{
        let output = `<div id='logEntry'>${logEntry[0]}-${hitTypes[logEntry[3]]} // ${letters[logEntry[2]-1]}-${logEntry[1]}`
        display.innerHTML+= output+"</div>"
    })
}

function generaTaulell(taulell, taula, enemic = false) {
    taula.innerHTML="";
    taulell.forEach((fila, fIndex) => {
        let f = taula.insertRow(fIndex);
        fila.forEach((casella, cIndex) => {
            let cell = f.insertCell(cIndex);
            if (enemic) {
                cell.id = "e-" + fIndex + "-" + cIndex;
            } else {
                cell.id = "j-" + fIndex + "-" + cIndex;
            }

            if (casella === 0 || casella === 1) {
                if (enemic) {
                    cell.addEventListener('click', clickCasella)
                } else {
                    cell.addEventListener('dragover', gestionarSobreDrag, false);
                    cell.addEventListener('drop', gestionarDrop, false);
                }
                cell.innerHTML = ""
                cell.style.backgroundColor = "white"
                // if(casella===1){
                //     cell.style.backgroundColor="red"
                // }
            } else {
                cell.innerHTML = casella
            }
        })
    })
}

function comprovaVictoria(){
    if(vaixellsEnemics.length == 0) {
        alert('Has guanyat');
        fase=2;
        let vaixellsRestants = vaixellsJugador.length;
        
        let data = new Date().toString();
        let resultat = {
            'data': data, 'vaixellsRestants': vaixellsRestants,'username':username
        };
        db.desar(resultat);
    }
    if(vaixellsJugador.length == 0) {alert('Has perdut');fase=2;}
}

function clickCasella(click) {
    if(fase !=1){
        return;
    }
    let cell = click.target;
    if (cell.style.backgroundColor != "white") {
        return
    }
    comprovaCasella(cell.id)
    atacEnemic()
    cell.style.cursor = "default"
}



function atacEnemic() {
    let convergentCells = [[-1, 0],[0, -1],[0, 1], [1, 0]]
    let x,y;
    let vaixell = buscaVaixell()
    console.log(vaixell.length)
    if(vaixell.length != 0){
        let yInicial = vaixell[0]
        let xInicial = vaixell[1]
        y = yInicial
        x = xInicial
        let direccio = null;
        console.log("x = "+x+"// y = "+y)
        if((impactesEnemic[y][x+1] && impactesEnemic[y][x+1] == 1) || (impactesEnemic[y][x-1] && impactesEnemic[y][x-1] == 1)) direccio = "x"
        else if((impactesEnemic[y+1] && impactesEnemic[y+1][x] == 1) || (impactesEnemic[y-1] && impactesEnemic[y-1][x] == 1)) direccio = "y"
        else direccio = "random"
        console.log("direccio = "+direccio) //random  
        if(direccio == "y"){
            do{
                y++;
                if(!impactesEnemic[y]) break;
                console.log("x = "+x+"// y = "+y+" == "+impactesEnemic[y][x])
            }while(impactesEnemic[y][x] ===1)
            if(!impactesEnemic[y] || impactesEnemic[y][x] !=0){
                y = yInicial
                x = xInicial
                do{
                    y--;
                    console.log("x = "+x+"// y = "+y+" == "+impactesEnemic[y][x])
                }while(impactesEnemic[y][x] ==1)
            }
            if(impactesEnemic[y][x] !=0){
                y=vaixell[0]
                x=vaixell[1]
                direccio = "random"
            }
        }else if(direccio == 'x'){
            do{
                x++;
            }while(impactesEnemic[y][x] ===1)
            if(impactesEnemic[y][x] !=0){
                y = yInicial
                x = xInicial
                do{
                    x--;
                }while(impactesEnemic[y][x] ==1)
            }
            if(impactesEnemic[y][x] !=0){
                y=vaixell[0]
                x=vaixell[1]
                direccio = "random"
            }
        }
        if(direccio=='random'){
            let tempX
            let tempY
            for(const tCoord of convergentCells){
                let tempCoords = convergentCells[Math.floor(Math.random() * 4)]
                tempX =1*x+tempCoords[1]*1
                tempY = 1*y+tempCoords[0]*1
                console.log("y="+tempY + " // x=" + tempX +" = "+impactesEnemic[tempY][tempX])
                if(impactesEnemic[tempY][tempX] ==0){   
                    break;
                }
            }
            y = tempY
            x = tempX
        }
    }else{
        do{
            x = Math.floor(Math.random() * (11 - 1) + 1);
            y = Math.floor(Math.random() * (11 - 1) + 1);
            console.log("x = "+x+"// y = "+y+" == "+impactesEnemic[y][x])
        }while(impactesEnemic[y][x] !== 0)
    }
    let impacte = 3;
    vaixellsJugador.forEach((vaixell)=>{
        if(vaixell.comprovaImpacte(x,y)){
            impacte = 1
            console.log("Tocat")
            if(vaixell.comprovaEnfonsat(impactesEnemic)){
                impacte = 2;
                console.log("Enfonsat")
                vaixellsJugador.splice(vaixellsJugador.indexOf(vaixell),1)
            }
        }  
    })
    if(impacte == 3) console.log("Aigua")
    console.log("x = "+x+"// y = "+y)
    console.log("impacte = "+impacte)
    document.getElementById("j-"+y+"-"+x).style.backgroundColor="red"
    afegirLog('Enemic',x,y,impacte)
    impactesEnemic[y][x] = impacte
    console.log(impactesEnemic)
}

function buscaVaixell(){
    let coords = [];
    impactesEnemic.forEach((fila,y)=>{
        fila.forEach((casella,x) =>{
            if(casella === 1){
                coords.push(y)
                coords.push(x)
            }
        })
    })
    return coords;
}

function comprovaCasella(id) {
    let coords = id.split("-")
    let shipCoords = []
    let hit = false;
    let sunk = false;
    let impacte = 3
    vaixellsEnemics.forEach((tempvaixell) => {
        if (tempvaixell.comprovaImpacte(coords[1], coords[2])) {
            impacte = 1;
            hit = true;
            if (tempvaixell.comprovaEnfonsat()) {
                impacte = 2
                sunk = true
                shipCoords = tempvaixell.getCoords()
                vaixellsEnemics.splice(vaixellsEnemics.indexOf(tempvaixell),1)
            };
        }

    })
    if (sunk) {
        shipCoords.forEach((coord) => {
            document.getElementById("e-" + coord.join("-")).style.backgroundColor = "Black"
        })
        // console.log("Hundido")
    } else if (hit) {
        document.getElementById(id).style.backgroundColor = "red"
        // console.log("Tocado")
    } else {
        document.getElementById(id).style.backgroundColor = "blue"
        // console.log("Agua")
    }
    afegirLog('Jugador',coords[2],coords[1],impacte)
    return hit;
}


function gestionarIniciDrag(ev) {
    if(fase != 0){
        return;
    }
    console.log("inici")
    drag = new Drag(taulellJugador,ev.target.id,vaixellsJugador);
}

function gestionarSobreDrag(ev) {
    drag.gestionaCaselles(ev);
    drag.rotate(ev.altKey)
}

function gestionarDrop(ev) {
    ev.preventDefault();
    drag.cleanCells();
    let ids = drag.drop(ev);
    vaixellsJugador.push(new vaixellJugador(ids,drag.size))
    drag = undefined;
    if(vaixellsJugador.length>6){
        fase = 1
        imatges = null;
        document.getElementById('undo').style.display="none";
    }
}

function pintaNouVaixellJugador(ids){
    ids.forEach((id)=>{
        let coords = id.split('-')
        taulellJugador[coords[1]][coords[2]] = 1
    })
}
function undo(){
    let vaixell = vaixellsJugador[vaixellsJugador.length-1];
    console.log(vaixell)
    vaixell.clean(taulellJugador)
    vaixellsJugador.pop()
}