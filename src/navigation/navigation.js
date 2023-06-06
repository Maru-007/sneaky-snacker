const gameData = require('../game.json');

let discription = [
  "A room with adorable strawberry wall-paper there is a small chair and a desk in the corner by the window. On the bed sits    your favorite duck stuffed animal", 

  "The bathroom has a picture of the ocean, a single sink and a nice big tub", 

  "The parents room is a big spacious room with your mothers vanity that sits besides her wardrobe, There is a big monstera     plant in the corner and a big painting by none other than Edvard Munch that sits above your parents huge bed",

  "The hallway is the a big room that sits in the middle of the house, it has another Monstera and Mom's favorite plant she calls the 'Mother in laws tongue', there is a beautiul painting of Frida in the middle of six grey doors and a comfy grey rug that really ties the room together.",

  "The Garage, is an big empty space with a large garage door and a black door we use to enter the house. In the corner sits another one of Moms plants",

  "The livingroom is my a nice spacious room with a big comfy couch with two smaller couches on each side, there is a really nice coffee table and a picture of a turky on the tv. Just to the right of that turkey television there is another epic painting of the dogs playing poker",

  "The kitchen is a nice clean room with white tiles and wood counter-tops, there is a fridgem and a small round table where the family sits to have dinner. Inside this room there is a Peace lily."
]

class Room {
  constructor() {
    this.doors = [];
    this.id = null;
    this.discription = ""
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
    room.discription = discription[i];
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
