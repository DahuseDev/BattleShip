class Drag {
    taulell
    rotation = true
    rotating = false
    size
    vaixells

    constructor(taulell,size,vaixells) {
        this.taulell = taulell
        this.size = size
        this.vaixells = vaixells
        this.comprovaNumVaixellsDelMateixTamany()
    }

    //Comprova si ja hi ha el màxim nombre de vaixells d'aquell tamany
    comprovaNumVaixellsDelMateixTamany(){
        let size1 = 2
        let size2 = 2
        let size3 = 1
        let size4 = 1
        let size5 = 1
        this.vaixells.forEach((vaixell)=>{
            eval(`size${vaixell.size}--`);
        })
        if(eval(`size${this.size} == 0`)){
            alert("No es permeten mes vaixells de "+this.size+" caselles.")
        }
    }

    //Funcio que s'executa mentre es fa drag, va fent un hover sobre el taulell.
    gestionaCaselles(click) {
        let id = click.target.id.split('-');
        let max = Math.round(this.size / 2)
        let min = this.size - max;
        let coords = [id[1], id[2]]
        click.preventDefault();
        this.cleanCells()
        this.paintCells(coords, max, min)
    }

    //Comprova si la cel·la passada està disponible per a colocar un vaixell
    checkCellAvailability(ids) {
        let error = null;
        ids.forEach((id) => {
            let coords = [id.split("-")[1], id.split("-")[2]]
            if (coords[0] < 1 || coords[0] > 10) {
                error = 'max'
            }
            if (coords[1] < 1 || coords[1] > 10) {
                error = 'min'
            }
            if(this.taulell[coords[0]][coords[1]] == 1){
                error = 'ocupat';
            }
        })
        return error;
    }

    //
    paintCells(coords, max = 0, min = 0) {
        let ids = []
        let x = coords[0]
        let y = coords[1]
        let error = "default"
        let incrementMax = 0;
        let incrementMin = 0;
        do {
            if (error == null) {
                console.log("null")
                break
            } else if (error == 'max') {
                console.log("max")
                incrementMax++
                incrementMin--
            } else if (error == 'min') {
                console.log("min")
                incrementMax--
                incrementMin++
            } else if (error == 'ocupat') {
                console.log("ocupat")
                this.cleanCells()
                return;
            }
            if (max + incrementMax > this.size || min + incrementMin > this.size) {
                console.log("maxsize")
                this.cleanCells()
                return;
            }
            ids = []
            if (this.rotation) {
                max = x * 1 + max * 1 + incrementMax
                min = x * 1 - min * 1 + incrementMin
                for (min; min < max; min++) {
                    ids.push('j-' + min + '-' + y)
                }
            } else {
                max = y * 1 + max * 1 + incrementMax
                min = y * 1 - min * 1 + incrementMin
                for (min; min < max; min++) {
                    ids.push('j-' + x + '-' + min)
                }
            }
            error = this.checkCellAvailability(ids);
        } while (1)

        ids.forEach((id) => {
            document.getElementById(id).style.backgroundColor = "red"
        })
    }

    //Rota la direcció del hover i de colocar el vaixell vertical/horitzontal
    rotate(r) {
        if (this.rotating && !r) {
            this.rotating = !this.rotating
        } else if (!this.rotating && r) {
            this.rotating = !this.rotating
            console.log("rotate")
            this.rotation = !this.rotation
        }
    }

    //Neteja el color de totes les celles de la taula
    cleanCells() {
        [].forEach.call(document.getElementById('jugador').getElementsByTagName('td'), (cell) => {
            let coord = [cell.id.split('-')[1],cell.id.split('-')[2]]
            if(this.taulell[coord[0]][coord[1]] === 0){
                cell.style.backgroundColor = "white"
            }
        })
    }

    // Gestiona el drop
    drop(click) {
        let id = click.target.id.split('-');
        
        let coords = [id[1], id[2]]
        let max = Math.round(this.size / 2)
        let min = this.size - max;
        click.preventDefault();
        
        let ids = this.pasteImage(coords, max, min)
        
        if(ids)this.pintaTaulell(ids)
        this.cleanCells()
        return ids;
    }

    //Modifica l'array del taulell per a tenir constancia d'on s'ha colocat el vaixell
    pintaTaulell(ids){
        ids.forEach((id)=>{
            let coord = id.split('-')
            this.taulell[coord[1]][coord[2]] = 1
        })
    }

    // Fica la background image del vaixell a les caselles corresponents
    pasteImage(coords, max = 0, min = 0) {
        let ids = []
        let x = coords[0]
        let y = coords[1]
        let error = "default"
        let incrementMax = 0;
        let incrementMin = 0;
        do {
            if (error == null) {
                console.log("null")
                break
            } else if (error == 'max') {
                console.log("max")
                incrementMax++
                incrementMin--
            } else if (error == 'min') {
                console.log("min")
                incrementMax--
                incrementMin++
            } else if (error == 'ocupat') {
                console.log("ocupat")
                this.cleanCells()
                return;
            }
            if (max + incrementMax > this.size || min + incrementMin > this.size) {
                console.log("maxsize")
                this.cleanCells()
                return;
            }
            ids = []
            if (this.rotation) {
                max = x * 1 + max * 1 + incrementMax
                min = x * 1 - min * 1 + incrementMin
                for (min; min < max; min++) {
                    ids.push('j-' + min + '-' + y)
                }
            } else {
                max = y * 1 + max * 1 + incrementMax
                min = y * 1 - min * 1 + incrementMin
                for (min; min < max; min++) {
                    ids.push('j-' + x + '-' + min)
                }
            }
            error = this.checkCellAvailability(ids);
        } while (1)
        let r=1;
        let percentage = 100/this.size
        ids.forEach((id) => {
            let cell = document.getElementById(id);
            cell.style.backgroundImage = "url('vaixell"+this.size+".png'  )"
            cell.style.backgroundSize = "cover";
            cell.style.backgroundPositionY = r*percentage+"%";
            if(!this.rotation){
                cell.style.transform="rotate(-90deg)"
            }
            r++;
        })
        return ids;
    }
}