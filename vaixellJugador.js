import { Vaixell } from "./vaixell.js"
export class vaixellJugador extends Vaixell{
    size
    constructor(coords,size){
        super()
        this.aliveCoords = coords.map((x)=>x)
        this.coords = new Set([...coords])      
        this.size = size
    }

    comprovaImpacte(coordX,coordY){
        for(const [index,id] of this.aliveCoords.entries()){
            let c = id.split('-')
            console.log(coordY+"-"+coordX+"-"+c[1]+"-"+c[2])
            if(c[1] == coordY && c[2]==coordX){
                console.log(coordY+"-"+coordX+"-"+c[1]+"-"+c[2])
                // console.log(coords[0] == coordX)
                // console.log(coords[1] == coordY)
                // console.log(index)
                this.aliveCoords.splice(index,1)
                // console.log(this.aliveCoords)
                return true;
            }
        }
        return false;
    }

    comprovaEnfonsat(taulellImpactes){
        console.log(this.coords)
        console.log(this.aliveCoords.length)
        let enfonsat = this.aliveCoords.length <1
        console.log(enfonsat)
        if(enfonsat){
            console.log("??")
            console.log(this.coords)
            for(const id of this.coords){
                console.log(id)
                let c = id.split('-')
                console.log(c)
                taulellImpactes[c[1]][c[2]] = 2
                console.log("S'ha pintat "+c[1]+"-"+c[2]+" amb 2")
            }
        }
        return enfonsat
    }
    clean(taulellImpactes){
        this.coords.forEach(id => {
            let x = id.split('-')[1]
            let y = id.split('-')[2]
            taulellImpactes[x][y] = 0
            document.getElementById(id).style.background="";
        });
    }
}