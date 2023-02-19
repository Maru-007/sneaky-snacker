const gameData = require('./game.json')
const prompts = require('./prompt')
const inquirer = require('inquirer');
const queue = require('./questionsQueue/classQueue');
const express = require('express');
const navigation = require('./src/navigation/navigation')

const server = express();

const PORT = process.env.PORT || 3002;

let answerCount = 0;

async function welcome() {
  const title = await inquirer.prompt({
    name: 'welcomeMessage',
    message: 'Welcome to Sneaky Snacker! Would you like to start a new game?',
    type: 'list',
    choices: ['Yes', 'No'],
    //If yes, instantiate game instance; if no, escape to home.
  });

  navigation()
}


const start = () => {
    // server.listen(PORT, () => console.log('listening on port', PORT))
    welcome()
    
  
}

start()