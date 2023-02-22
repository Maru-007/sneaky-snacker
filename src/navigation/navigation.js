const gameData = require("../../game.json");
const inquirer = require('inquirer');

const direction = require('../../index')
//this is just a dictionary making the ids more palatable for the UI.

class Room {
    constructor() {
        this.doors = [];
        this.id = null;
        
        // This is where items would go
    }
}

let kidsroom = new Room(); 
let bathroom = new Room(); 
let parentsroom = new Room(); 
let hallway = new Room(); 
let garage = new Room(); 
let livingroom = new Room();
let kitchen = new Room(); 
const graph = {kidsroom, bathroom, parentsroom, hallway, garage, livingroom, kitchen};



function newRooms () {
    // Adds adjacent rooms to each room object in graph array
    let i = 0;
    for (let room of Object.values(graph)) {
        
        room.id = gameData.adjacencyList[i].id;
        room.doors = gameData.adjacencyList[i].adjacent;
        i++
        
    }
    return graph;
}
newRooms()


let currentLocation;
console.log(currentLocation);

// Direction = input of selected adjacent value, for kidsroom, hallway || bathroom
// let direction = "hallway"


// function handleNavigation(direction) {
//     let i = 0;
//     for (let room of Object.values(graph)) {
//         if (direction === room.id){
//             currentLocation = graph[room]
//         }
//     }
//     console.log(currentLocation)
//     options = currentLocation.doors;
//     return currentLocation.id;
// }

function handleNavigation(direction) {
    currentLocation = graph[direction]
    console.log(currentLocation)
    options = currentLocation.doors;
    return options;
}




module.exports = { handleNavigation };
// send handleNavigation options back along with room Id