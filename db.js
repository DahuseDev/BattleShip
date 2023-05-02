window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
let db;
class Database{
    constructor(){
        let peticioObertura = window.indexedDB.open("Battleship", 3);

        peticioObertura.onerror = function (event) {
            alert("Problema!");
        };
        peticioObertura.onsuccess = function (event) {
            db = event.target.result;
        };
        peticioObertura.onupgradeneeded = function (event) {
            db = event.target.result;
            try {
                db.deleteObjectStore("resultats");
        
            }
            catch (e) {
        
            }
            db.createObjectStore("resultats", {
                keyPath: "username"
            });
        };
    }
    desar(resultat) {
        
        let memory = db.transaction("resultats", "readwrite").objectStore('resultats');
        memory.add(resultat);
        this.mostrar(memory);
    }
    mostrar(){
        let query = db.transaction("resultats", "readwrite").objectStore('resultats').getAll()
        query.onsuccess = ()=>{
            let bestGames = query.result;
            let leaderboard = document.getElementById('leaderboard-content');
            leaderboard.innerHTML = "";
            bestGames.sort((a,b)=>{
                return a.vaixellsRestants-b.vaixellsRestants;
            }).slice(0,10).forEach((game,index) => {
                let data = new Date(game.data);
                console.log(data.formattedDate())
                leaderboard.innerHTML+=`<div><div>${index+1}</div><div>${game.username}</div><div>${game.vaixellsRestants}</div><div>${data.formattedDate()}</div></div>`;
            });
        }   
    }
}