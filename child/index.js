const { EVENT_NAMES } = require('../utils');
const { io } = require('socket.io-client');
const socket = io('ws://localhost:3001');
const inquirer = require("inquirer");

function startPlayer1() {

  socket.emit(EVENT_NAMES.childReady);
  console.log("child is ready", socket.id)
  socket.on(EVENT_NAMES.quit, () => {
    process.exit();
  })
  socket.on(EVENT_NAMES.message, (message) => {
    console.log(message);
  })
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
        console.log('Melis answer:', answer);
        socket.emit(EVENT_NAMES.selection, answer);
      });
  });
}





startPlayer1();
