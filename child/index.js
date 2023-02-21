const { EVENT_NAMES } = require('../utils');
const { io } = require('socket.io-client');
const socket = io('ws://localhost:3001');
const inquirer = require("inquirer");

function startPlayer1() {
  socket.emit(EVENT_NAMES.playerReady, 'player1');
  socket.on(EVENT_NAMES.questionsReady, (question) => {
    inquirer
      .prompt([
        {
          name: question.name,
          message: question.message,
          type: question.type,
          choices: question.choices,
        },
      ])
      .then((answer) => {
        console.log('Player1 answer:', answer);
        socket.emit(EVENT_NAMES.selection, answer);
      });
  });

  // socket.on(EVENT_NAMES.answer, (payload) => {
  //   console.log(payload);
  // });
}

startPlayer1();