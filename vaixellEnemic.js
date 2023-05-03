import { Vaixell } from "./vaixell.js"
export class VaixellEnemic extends Vaixell{
    startCoords = new Map()
    direccio
    constructor(llargada,taulell){
        super()
        this.llargada = llargada-1;
        this.taulell = taulell;
        do{
            this.startCoords['y'] = this.randomCoord();
            this.startCoords['x'] = this.randomCoord();
            this.direccio = Math.random()-0.5>0;
        }while(this.comprovaDisponibilitat()) // Itera fins que troba una coordenada on pot colocar el vaixell
        this.pintaVaixell()
    }
    
    // Funcio dinàmica per a retornar una coordenada aleatoria entre 1 i 10
    randomCoord = new Function("return Math.floor(Math.random() * (11 - 1) + 1);");
    
    // Modifica l'array de vaixells per a que es mostr
    pintaVaixell(){
        this.coords = this.getCoords();
        this.aliveCoords = this.getCoords();
        this.coords.forEach((coord)=>{
            this.taulell[coord[0]][coord[1]] = 1
        })
    }

    // Reprodueix audio d'impacte i comprova si ha impactat el vaixell
    comprovaImpacte(coordX,coordY){
        let audio = document.getElementById('audio');
        audio.currentTime = 0;
        audio.play();
        for(const [index,coords] of this.aliveCoords.entries()){
            if(coords[0] == coordX && coords[1]==coordY){
                this.aliveCoords.splice(index,1)
                return true;
            }
        }
        return false;
    }

    // Comprova si aquest vaixell està enfonsat
    comprovaEnfonsat(){
        return this.aliveCoords.length <1;
    }
    
    // Retorna les coordenades d'aquest vaixell
    getCoords(){
        let tempCoords = []
        if(this.direccio){
            for(let casella=this.startCoords['x'];casella<=this.startCoords['x']+this.llargada;casella++){
                tempCoords.push([this.startCoords['y'],casella]);
            }
        }else{
            for(let casella=this.startCoords['y'];casella<=this.startCoords['y']+this.llargada;casella++){
                tempCoords.push([casella,this.startCoords['x']]);
            }
        }
        return tempCoords;
    }

    // Comprova si el vaixell es pot crear a la posicio que s'està provant
    comprovaDisponibilitat(){
        let coordsCaselles=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]]
        if(this.direccio){
            for(let casella=this.startCoords['x'];casella<=this.startCoords['x']+this.llargada;casella++){
                if(casella<1 || casella>10)return true;
                for(const index in coordsCaselles){
                    let coords = coordsCaselles[index]
                    let xx=casella+coords[0];
                    let yy=this.startCoords['y']+coords[1];
                    let notExists = yy<1 || yy>10 || xx<1 || xx>10;
                    if(notExists) continue;
                    let cell = this.taulell[yy][xx];
                    if(cell === 1){
                        return true;
                    }
                }
            }
        }else{
            for(let casella=this.startCoords['y'];casella<=this.startCoords['y']+this.llargada;casella++){
                if(casella<1 || casella>10){
                    return true;
                };
                for(const coords of coordsCaselles){
                    let xx=this.startCoords['x']+coords[0];
                    let yy=casella+coords[1];
                    let notExists = yy<1 || yy>10 || xx<1 || xx>10;
                    if(notExists) continue;
                    let cell = this.taulell[yy][xx];
                    if(cell === 1){
                        return true;
                    }
                }
            }
        }
        return false;
    }
}