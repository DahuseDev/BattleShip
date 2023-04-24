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

    gestionaCaselles(click) {
        let id = click.target.id.split('-');
        let max = Math.round(this.size / 2)
        let min = this.size - max;
        let coords = [id[1], id[2]]
        click.preventDefault();
        this.cleanCells()
        this.paintCells(coords, max, min)
    }

    checkCellAvailability(ids) {
        //let convergentCells = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1]]
        let error = null;
        // console.log(ids)
        ids.forEach((id) => {
            let coords = [id.split("-")[1], id.split("-")[2]]
            // console.log(coords)
            if (coords[0] < 1 || coords[0] > 10) {
                error = 'max'
            }
            if (coords[1] < 1 || coords[1] > 10) {
                error = 'min'
            }
            if(this.taulell[coords[0]][coords[1]] == 1){
                error = 'ocupat';
            }
            // for (const cells of convergentCells) {
            //     let x = coords[0] * 1 + cells[0] * 1
            //     let y = coords[1] * 1 + cells[1] * 1
            //     let notExists = y < 1 || y > 10 || x < 1 || x > 10
            //     if (notExists) continue
            //     let cell = this.taulell[x][y]
            //     console.log(y+" - "+x+" = "+ cell)
            //     if (cell == 1) {
            //         error = 'ocupat'
            //     }
            // }
        })
        return error;
    }
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
            // console.log(ids)
            error = this.checkCellAvailability(ids);
            // console.log("size: " + this.size)
            // console.log("max: " + max + " + " + incrementMax)
            // console.log("max: " + min + " + " + incrementMin)
        } while (1)

        ids.forEach((id) => {
            document.getElementById(id).style.backgroundColor = "red"
        })
    }

    rotate(r) {
        if (this.rotating && !r) {
            this.rotating = !this.rotating
        } else if (!this.rotating && r) {
            this.rotating = !this.rotating
            console.log("rotate")
            this.rotation = !this.rotation
        }
    }

    cleanCells() {
        [].forEach.call(document.getElementById('jugador').getElementsByTagName('td'), (cell) => {
            let coord = [cell.id.split('-')[1],cell.id.split('-')[2]]
            if(this.taulell[coord[0]][coord[1]] === 0){
                cell.style.backgroundColor = "white"
            }
            // else if(this.taulell[coord[0]][coord[1]] === 1){
            //     cell.style.backgroundColor = "blue"
            // }
        })
    }


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
        
        // if (this.childNodes.length < 1) {
        //     ev.target.appendChild(document.getElementById(data));
        // }
        // let horas = document.getElementById("horas").value + "";
        // ev.target.id = "editing";
        // let rows = document.querySelectorAll('tr');
        // let cmpt = 0;
        // let cellIndex;
        // rows.forEach((row) => {
        //     let cells = row.querySelectorAll('td');
        //     for (let n = 0; n < cells.length; n++) {
        //         if (cmpt && cellIndex == n) {
        //             console.log("g")
        //             cells[n].style.backgroundColor = "red";
        //         }
        //         if (cells[n].id.length > 0) {
        //             cellIndex = n;
        //             cmpt = horas - 1;
        //         }
        //     }
        //     cmpt--;
        // });
    }

    pintaTaulell(ids){
        ids.forEach((id)=>{
            let coord = id.split('-')
            this.taulell[coord[1]][coord[2]] = 1
        })
    }

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
            // console.log(ids)
            error = this.checkCellAvailability(ids);
            // console.log("size: " + this.size)
            // console.log("max: " + max + " + " + incrementMax)
            // console.log("max: " + min + " + " + incrementMin)
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