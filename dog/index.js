const { EVENT_NAMES } = require('../utils');
const { io } = require('socket.io-client');
const socket = io('ws://localhost:3001');
const inquirer = require("inquirer");

function startDog() {
  socket.emit(EVENT_NAMES.dogReady);
  socket.on(EVENT_NAMES.dogQuestions, (question) => {
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
        console.log('Diego answer:', answer);
        socket.emit(EVENT_NAMES.dogSelection, answer);
      });
  });

}

startDog();
