const { EVENT_NAMES } = require('../utils');
const { io } = require('socket.io-client');
const socket = io('ws://localhost:3001');
const inquirer = require('inquirer');

function startDog() {
  socket.emit(EVENT_NAMES.dogReady);
  console.log('Diego is ready!');
  socket.on(EVENT_NAMES.quit, () => {
    process.exit();
  });
  socket.on(EVENT_NAMES.dogMessage, (dogMessage) => {
    console.log(dogMessage);
  });
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
        socket.emit(EVENT_NAMES.dogSelection, answer);
      });
  });
}

startDog();
