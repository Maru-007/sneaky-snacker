const { EVENT_NAMES } = require('../utils');
const { io } = require('socket.io-client');
const socket = io('ws://localhost:3001');
const inquirer = require("inquirer");

function startPlayer2() {
  socket.emit(EVENT_NAMES.playerReady, 'player2');
  socket.on(EVENT_NAMES.questionsReady, (question) => {
    // insert inquirer prompt here
    inquirer
      .prompt([
        {
          name: 'sneakySnacker',
          message: question,
        },
      ])
      // send answer to hub
      .then((answer) => {
        console.log('Player2 answer:', answer);
        socket.emit(EVENT_NAMES.answer, answer);
      });
  });

  socket.on(EVENT_NAMES.answer, (payload) => {
    console.log(payload);
  });
}

startPlayer2();

// figure out what needs to be inside of initializing function to start & join game
// initialize sqs
