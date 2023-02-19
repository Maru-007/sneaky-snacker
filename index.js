// const { Server } = require('socket.io');
// const io = new Server(3001);
// const { EVENT_NAMES } = require('./utils');
//Going to get questions from SQS and send to players using inquirer format
// const { questionsReady } = require("./questionsQueue/index");
const inquirer = require('inquirer');

const express = require('express');

const server = express();

const PORT = process.env.PORT || 3002;


// async function welcome() {
//   const title = await inquirer.prompt({
//     name: 'welcomeMessage',
//     message: 'Welcome to Sneaky Snacker! Would you like to start a new game?',
//     type: 'list',
//     choices: ['Yes', 'No'],
//     //If yes, instantiate game instance; if no, escape to home.
//   });
// }

let answerCount = 0;

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

const kidsRoom = {
  name: 'gameplay',
  message: 'You are in your room. You are surrounded by your bed and toys cast carelessly on the floor. A hunger grows in you. It is time for cookies.',
  type: 'list',
  choices: ['Move to the Bathroom', 'Move to the Hallway']
}

const start = () => {
  server.listen(PORT, () => console.log('listening on port', PORT))

  

}


// function startEventServer() {
//   io.on('connection', (socket) => {
//     console.log('We have a new connection:', socket.id);

//     socket.on(EVENT_NAMES.playerReady, (player) => {
//       console.log(`${player} is ready!`);
//       io.emit(EVENT_NAMES.questionsReady, welcomePrompt);
//     });

//     socket.on(EVENT_NAMES.answer, (answer) => {
//       if (answer.gameplay === 'Yes'){
//         answerCount += 1;
//         io.emit(EVENT_NAMES.questionsReady, gamePrompt);
//       } else if (answer.gameplay === 'No'){
//         io.emit(EVENT_NAMES.questionsReady, welcomePrompt);
//       }
//       if (answerCount === 1){
//         if (answer.gameplay === 'Ok'){
//           answerCount += 1;
//           io.emit(EVENT_NAMES.questionsReady, kidsRoom)
//         } else if (answer.gameplay === 'Quit'){
//           io.emit(EVENT_NAMES.questionsReady, welcomePrompt);
//         }
//       }
//     });
//   });
// }

// startEventServer();
