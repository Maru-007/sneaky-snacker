const gameData = require('../../game.json');
const prompts = require('../../prompt');
const inquirer = require('inquirer');
const queue = require('../../questionsQueue/classQueue');




class Room {
    constructor() {
        this.doors = [];
        this.currentLocation = false;
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
        room.doors = gameData.adjacencyList[i].adjacent;
    });
    return graph;
}

newRooms()
console.log(graph)
const answerQueue = new queue();

async function navigator (i) {
    const navigate = {
        name: 'navigate',
        message: 'Select the room you want to go to',
        type: 'list',
        choices: gameData.rooms[roomname].navigation.triggers.navigate
    }

    let room = {
        name: 'gameplay',
        message: gameData.rooms.[roomname].description.default,
        type: 'list',
        choices: ['Navigate', 'Search']
    } 

    await inquirer.prompt(prompts[1]).then((answers) => answerQueue.enqueue(answers))
    
    if (answerQueue.front.value.gameplay === 'Navigate') {
        // Navigation
        await inquirer.prompt(navigate)
        console.log(graph[i + 1].currentLocation)
        graph[i].currentLocation = true
        graph[i].currentLocation = false
        answerQueue.dequeue()
    }
    
}

async function navigation() {
    
    for (let i = 0; i <= gameData.adjacencyList.length; i++) {
        await navigator(i)
    }
    
    // graph[0].currentLocation = true
    // if (answerQueue.front.value.gameplay === 'Move to the bathroom') {
        
    //     console.log(graph[1].currentLocation)
    //     answerQueue.dequeue()
    //     await inquirer.prompt(prompts[2]).then((answers) => answerQueue.enqueue(answers))
    // } 

    // // another if statement

    //     graph[1].currentLocation = false
    //     graph[2].currentLocation = true

    // // console.log(answerQueue.front.value.gameplay)

}


module.exports = navigation;
























// const rooms = require("./rooms.json").rooms;

// //this is just a dictionary making the ids more palatable for the UI.
// const roomOptions = {
//     "kidsroom": "Kids Room",
//     "bathroom": "Bathroom",
//     "parentsroom": "Parents' Room",
//     "hallway": "Hallway",
//     "garage": "Garage",
//     "livingroom": "Living Room",
//     "kitchen": "Kitchen",
//   };


// function handleNavigation(socket, currentRoom) {
// //emit a message witht he current room's description when starting
//   socket.emit("message", currentRoom.description.default);
// //set up an event listener for the navigate event from the ui
//   socket.on("navigate", () => {
// //get the available navigation options for the current rooms
//     const options = currentRoom.navigation.triggers.navigate;
//     const availableOptions = Object.keys(options);
// //construct the question string with available room options
//     const question = `${currentRoom.navigation.name} ${availableOptions
//       .map((roomID) => {
//         const room = rooms[options[roomID]];
//         return `${roomOptions[room.id]} (${roomID})`;
//       })
//       .join(", ")}`;
// // Emit the question to the client
//     socket.emit("question", question);
// //set up an event listener for the selectoption event from the client
//     socket.once("selectOption", (option) => {
//       const targetRoom = options[option];
//       if (targetRoom) {
// // Update the current room and emit the new description to the client 
//         currentRoom = rooms[targetRoom];
//         socket.emit("message", currentRoom.description.default);
//       }
//     });
//   });
// }

// module.exports = handleNavigation;