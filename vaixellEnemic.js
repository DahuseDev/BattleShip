import { Vaixell } from "./vaixell.js"
export class VaixellEnemic extends Vaixell{
    startCoords = new Map()
    direccio
    constructor(llargada,taulell){
        super()
        this.llargada = llargada-1
        this.taulell = taulell
        do{
            this.startCoords['y'] = this.randomCoord()
            this.startCoords['x'] = this.randomCoord()
            // console.log(x+"-"+y)
            this.direccio = Math.random()-0.5>0
            // console.log(direccio)
            // console.log(comprovaDisponibilitat(x,y,direccio,llargada-1,taulell))
            // console.log(x+"-"+y+"-"+direccio+"-"+llargada)
        }while(this.comprovaDisponibilitat())
        this.pintaVaixell()
        console.log("vaixell fet correctament")
        console.log(this.startCoords['x']+"-"+this.startCoords['y']+"-"+this.direccio+"-"+this.llargada)
    }
    
    randomCoord(){
        return Math.floor(Math.random() * (11 - 1) + 1);
    }
    
    pintaVaixell(){
        this.coords = this.getCoords();
        this.aliveCoords = this.getCoords();
        this.coords.forEach((coord)=>{
            this.taulell[coord[0]][coord[1]] = 1
        })
    }

    comprovaImpacte(coordX,coordY){
        let audio = document.getElementById('audio');
        audio.currentTime = 0;
        audio.play();
        for(const [index,coords] of this.aliveCoords.entries()){
            // console.log(coords[0]+coordX)
            if(coords[0] == coordX && coords[1]==coordY){
                // console.log(coordX+"-"+coordY+"-"+coords[0]+"-"+coords[1])
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

    comprovaEnfonsat(){
        return this.aliveCoords.length <1
    }
    
    getCoords(){
        let tempCoords = []
        if(this.direccio){
            for(let casella=this.startCoords['x'];casella<=this.startCoords['x']+this.llargada;casella++){
                tempCoords.push([this.startCoords['y'],casella])
            }
        }else{
            for(let casella=this.startCoords['y'];casella<=this.startCoords['y']+this.llargada;casella++){
                tempCoords.push([casella,this.startCoords['x']])
            }
        }
        return tempCoords
    }
    comprovaDisponibilitat(){
        // console.log(taulell[11][8])
        let coordsCaselles=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]]
        if(this.direccio){
            // console.log("a")
            for(let casella=this.startCoords['x'];casella<=this.startCoords['x']+this.llargada;casella++){
                if(casella<1 || casella>10)return true;
                for(const index in coordsCaselles){
                    let coords = coordsCaselles[index]
                    let xx=casella+coords[0]
                    // console.log("x: "+xx)
                    let yy=this.startCoords['y']+coords[1]
                    // console.log("y: "+yy)
                    let notExists = yy<1 || yy>10 || xx<1 || xx>10  
                    // console.log("notExists: "+notExists)
                    if(notExists) continue
                    let cell = this.taulell[yy][xx]
                    // console.log("cell: "+cell)
                    if(cell === 1){
                        return true
                    }
                }
                /*
                
                for(const coords of coordsCaselles){
                    let xx=casella+coords[0]
                    // console.log("x: "+xx)
                    let yy=this.startCoords['y']+coords[1]
                    // console.log("y: "+yy)
                    let notExists = yy<1 || yy>10 || xx<1 || xx>10  
                    // console.log("notExists: "+notExists)
                    if(notExists) continue
                    let cell = this.taulell[yy][xx]
                    // console.log("cell: "+cell)
                    if(cell === 1){
                        return true
                    }
                }

                */
            }
        }else{
            // console.log("b")
            for(let casella=this.startCoords['y'];casella<=this.startCoords['y']+this.llargada;casella++){
                // console.log("x: "+x)
                // console.log("y: "+casella)
                if(casella<1 || casella>10){
                    // console.log("taulell["+casella+"]["+x+"]")
                    // console.log("fora del joc")
                    return true
                };
                for(const coords of coordsCaselles){
                    let xx=this.startCoords['x']+coords[0]
                    // console.log("xx: "+xx)
                    let yy=casella+coords[1]
                    // console.log("yy: "+yy)
                    let notExists = yy<1 || yy>10 || xx<1 || xx>10
                    // console.log("notExists: "+notExists)
                    if(notExists) continue
                    let cell = this.taulell[yy][xx]
                    // console.log("cell: "+cell)
                    if(cell === 1){
                        // console.log("taulell["+yy+"]["+xx+"] ="+cell)
                        // console.log("ocupat")
                        return true
                    }
                }
            }
        }
        return false
    }
}