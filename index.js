const { Server } = require('socket.io');
const io = new Server(3001);
const { EVENT_NAMES } = require('./utils');
const inquirer = require('inquirer');
const prompts = require('./prompt')
const { handleNavigation, handleNPCNavigation } = require('./src/navigation/navigation')
const { handleSearch } = require('./src/search/search');
const gameData = require("./game.json");
const winCondition = require('./src/cookieJar')
const NPC = require('./src/npc')

const rooms = [
  'kidsroom', 'bathroom', 'parentsroom', 'hallway', 'kitchen', 'livingroom', 'garage'
]


// async function welcome() {
//   const title = await inquirer.prompt({
//     name: 'welcomeMessage',
//     message: 'Welcome to Sneaky Snacker! Would you like to start a new game?',
//     type: 'list',
//     choices: ['Yes', 'No'],
//     //If yes, instantiate game instance; if no, escape to home.
//   });
// 
let currentRoom = 'kidsroom';

const distraction = {
  name: 'gameplay',
  message: gameData.rooms[currentRoom].distractions.prompt,
  type: 'list',
  choices: ["Distract", "Don\'t Distract"]
}

const welcomePrompt = {
  name: 'gameplay',
  message: 'Welcome to Sneaky Snacker! Would you like to start a new game?',
  type: 'list',
  choices: ['Yes', 'No'],
}

const gamePrompt = {
  name: 'gameplay',
  message: 'You are currently playing as the child. You will be given options to navigate throughout the house. The goal is to reach the snacks before dad catches you.',
  type: 'list',
  choices: ['Ok', 'Quit']
}

//playerReady(sent from USER): user joins game
//welcomePrompt(sent from SERVER): emit to user first prompt, welcomePrompt
//startGame(sent from SERVER): nav prompt 1 - need one hard coded to sent initial location, send to handleNavigation fn; will be another fn inside of navigation.js
//selection(sent from USER)pass direction/selection from nav prompt 1 into the handleNavigation function.The user will receive a prompt containing choices from the 
//handleNavigation return array consisting of current location, options (options being the choices)
//receive info back about where the user wants to go. This will modify what choices the user has in nav prompt 2
// navGame(sent from SERVER): nav prompt 2 - needs to get user from one room to another

function choice(answer) {
  gameChoices = {
    yes: answer.gameplay === 'Yes',
    navigate: answer.gameplay === 'Navigate',
    distraction: answer.gameplay === 'Distraction',
    distract: answer.gameplay === 'Distraction',
    dontDistract: answer.gameplay === 'Don\'t Distract',
    search: answer.gameplay === 'Search',
    cookieJar: answer.gameplay === 'Cookie Jar',
    quit: answer.gameplay === 'No'
  }
  return gameChoices;
}



function startEventServer() {
  io.on('connection', (socket) => {
    console.log('We have a new connection:', socket.id);

    socket.on(EVENT_NAMES.playerReady, (player) => {
      console.log(`${player} is ready!`);
      io.emit(EVENT_NAMES.questionsReady, welcomePrompt);
    })

    socket.on(EVENT_NAMES.selection, (answer) => {
      console.log(answer.gameplay)
      if (choice(answer).yes) {
        console.log(prompts[0])
        io.emit(EVENT_NAMES.questionsReady, prompts[0])
      } 
      if (choice(answer).navigate) {
        console.log(currentRoom);
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom)
        }
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);
      } 
      if (rooms.includes(answer.gameplay)) {
        let room = prompts.find(obj => obj.id === answer.gameplay);
        io.emit(EVENT_NAMES.questionsReady, room);
        currentRoom = answer.gameplay;
        console.log(currentRoom);
      } 
      if (choice(answer).distraction) {
        io.emit(EVENT_NAMES.questionsReady, distraction);
      } 
      if (choice(answer).distract) {
        let room = prompts.find(obj => obj.id === currentRoom);
        io.emit(EVENT_NAMES.message, gameData.rooms[currentRoom].distractions.event);
        let moveNPC = handleNPCNavigation(currentRoom)
        const randomEventCheck = Math.random()
        console.log(randomEventCheck)
        randomEventCheck < 0.6 ? io.emit(EVENT_NAMES.questionsReady, room) : io.emit(EVENT_NAMES.questionsReady, NPC(currentRoom, moveNPC));
      } 
      if (choice(answer).dontDistract) {
        let room = prompts.find(obj => obj.id === currentRoom);
        io.emit(EVENT_NAMES.questionsReady, room);
      } 
      if (choice(answer).search){
        const searchPrompt = {
          name: 'gameSearch',
          message: handleSearch(currentRoom),
          type: 'confirm',
        }
        io.emit(EVENT_NAMES.questionsReady, searchPrompt)
      } 
      if (answer.gameSearch === true){
        io.emit(EVENT_NAMES.message, gameData.rooms[currentRoom].Search.obtained)
        gameData.rooms[currentRoom].Search.pickedup === true;
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom)
        }
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);
      } 
      if (answer.gameSearch === false){
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom)
        }
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);
      } 
      if (choice(answer).cookieJar) {
        
        io.emit(EVENT_NAMES.questionsReady, winCondition())
        currentRoom = 'kidsroom'
      } 
      if (choice(answer).quit) {
        io.emit(EVENT_NAMES.quit, 'Quit')
      }

    })
  }
)}

startEventServer();

//   socket.on(EVENT_NAMES.selection, (answer) => {
//       // if (answer === a roomname) {
//           // handleNavigation, emit prompt
//       //}
//       // answer for example would be hallway
//       handleNavigation(answer) // Answer payload will be the room the user wants to move to
//       // Need to figure out how to iterate through prompts array
  
//       io.emit(EVENT_NAMES.questionsReady, prompts[answer])
//     });
// Sends user direction
