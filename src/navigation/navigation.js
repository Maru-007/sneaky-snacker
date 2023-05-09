const gameData = require('../game.json');

class Room {
  constructor() {
    this.doors = [];
    this.id = null;
  }
}

let kidsroom = new Room();
let bathroom = new Room();
let parentsroom = new Room();
let hallway = new Room();
let garage = new Room();
let livingroom = new Room();
let kitchen = new Room();
const graph = {
  kidsroom,
  bathroom,
  parentsroom,
  hallway,
  garage,
  livingroom,
  kitchen,
};

function newRooms() {
  let i = 0;
  for (let room of Object.values(graph)) {
    room.id = gameData.adjacencyList[i].id;
    room.doors = gameData.adjacencyList[i].adjacent;
    i++;
  }
  return graph;
}
newRooms();

let currentLocation;

function handleNavigation(direction) {
  currentLocation = graph[direction];
  options = currentLocation.doors;
  return options;
}

function handleNPCNavigation(distractionRoom) {
  npcLocation = graph[distractionRoom];
  return npcLocation;
}

module.exports = { handleNavigation, handleNPCNavigation, graph };
