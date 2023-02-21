const { Server } = require('socket.io');
const io = new Server(3001);
const { EVENT_NAMES } = require('./utils');
const inquirer = require('inquirer');
const prompts = require('./prompt')
const { handleNavigation } = require('./src/navigation/navigation')
const gameData = require("./game.json");

// async function welcome() {
//   const title = await inquirer.prompt({
//     name: 'welcomeMessage',
//     message: 'Welcome to Sneaky Snacker! Would you like to start a new game?',
//     type: 'list',
//     choices: ['Yes', 'No'],
//     //If yes, instantiate game instance; if no, escape to home.
//   });
// }

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


const navigatePrompt = {
  name: 'gameplay',
  message: 'Where would you like to go?',
  type: 'list',
  choices: gameData.adjacencyList[0].adjacent

}

function startEventServer() {
  io.on('connection', (socket) => {
    console.log('We have a new connection:', socket.id);

    socket.on(EVENT_NAMES.playerReady, (player) => {
      console.log(`${player} is ready!`);
      io.emit(EVENT_NAMES.questionsReady, welcomePrompt);
    })

    socket.on(EVENT_NAMES.selection, (answer) => {
      if (answer.gameplay = 'Yes') {
        console.log(prompts[0])
        io.emit(EVENT_NAMES.questionsReady, prompts[0])

      }
    })
    socket.on(EVENT_NAMES.navigate, (answer) => { // Answer payload is going to be user chose 'Navigate' or user chose 'Search'
      // Only has functionality for navigate, we will need if conditionals for search.
      io.emit(EVENT_NAMES.questionsReady, navigatePrompt)
    })

    socket.on(EVENT_NAMES.selection, (answer) => {
      // if (answer === a roomname) {
          // handleNavigation, emit prompt
      //}
      // answer for example would be hallway
      handleNavigation(answer) // Answer payload will be the room the user wants to move to
      // Need to figure out how to iterate through prompts array
      io.emit(EVENT_NAMES.questionsReady, prompts[answer])
    });
  });
}

startEventServer();
// Sends user direction

