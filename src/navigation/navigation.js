const gameData = require("../../game.json");
const inquirer = require('inquirer');

const direction = require('../../index')
//this is just a dictionary making the ids more palatable for the UI.

class Room {
    constructor() {
        this.doors = [];
        this.id = null;
        // this.currentLocation = false;
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

// Array of room objects
const graph = [kidsroom, bathroom, parentsroom, hallway, garage, livingroom, kitchen];

function newRooms () {
    // Adds adjacent rooms to each room object in graph array
    graph.forEach((room, i) => {
        console.log(i)
        room.id = gameData.adjacencyList[i].id;
        room.doors = gameData.adjacencyList[i].adjacent;
    });
    return graph;
}
newRooms()


let currentLocation = graph[0];

// Direction = input of selected adjacent value, for kidsroom, hallway || bathroom
// let direction = "hallway"


function handleNavigation(direction) {
  for (let i = 0; i < graph.length; i++) {
    if (graph[i] === currentLocation) {
      let foundRoom = dfs(graph[i], direction);
      if (foundRoom) {
        
        currentLocation = foundRoom;
        options = currentLocation.doors;
        return [currentLocation.id, options];
      } else {
        return "Invalid direction. Please try again.";
      }
    }
  }
}

function dfs(room, target) {
  console.log(room)
  console.log(target)
  if (room.doors.includes(target)) {
    return graph.find(room => room.id === target);
  }
  for (let i = 0; i < room.doors.length; i++) {
    let nextRoom = graph.find(room => room.id === room.doors[i]);
    let foundRoom = dfs(nextRoom, target);
    if (foundRoom) {
      return foundRoom;
    }
  }
  return null;
}

module.exports = { handleNavigation };
// send handleNavigation options back along with room Id