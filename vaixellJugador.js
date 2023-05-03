import { Vaixell } from "./vaixell.js"
export class vaixellJugador extends Vaixell{
    size
    constructor(coords,size){
        super()
        this.aliveCoords = coords.map((x)=>x)
        this.coords = new Set([...coords])      
        this.size = size
    }

    //Comprova si el vaixell ha sigut impactat
    comprovaImpacte(coordX,coordY){
        for(const [index,id] of this.aliveCoords.entries()){
            let c = id.split('-');
            if(c[1] == coordY && c[2]==coordX){
                this.aliveCoords.splice(index,1)
                return true;
            }
        }
        return false;
    }

    // Comprova si el vaixell ha sigut enfonsat
    comprovaEnfonsat(taulellImpactes){
        let enfonsat = this.aliveCoords.length <1;
        if(enfonsat){
            for(const id of this.coords){
                let c = id.split('-');
                taulellImpactes[c[1]][c[2]] = 2;
            }
        }
        return enfonsat;
    }

    // Esborra el vaixell del taulell
    // Serveix per a quan es tira enrere la jugada de colocar el vaixell
    clean(taulellImpactes){
        this.coords.forEach(id => {
            let x = id.split('-')[1];
            let y = id.split('-')[2];
            taulellImpactes[x][y] = 0;
            document.getElementById(id).style.background="";
        });
    }
}