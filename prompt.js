const gameData = require('./game.json');
const gamePrompt = {
    name: 'gameplay',
    message: 'You are currently playing as the child. You will be given options to navigate throughout the house. The goal is to reach the snacks before dad catches you.',
    type: 'list',
    choices: ['Ok', 'Quit']
}

const kidsroom = {
    name: 'gameplay',
    message: gameData.rooms.kidsroom.description.default,
    type: 'list',
    choices: ['Navigate', 'Search']
}

const bathroom = {
  name: 'gameplay',
  message: gameData.rooms.bathroom.description.default,
  type: 'list',
  choices: ['Move to your parent\'s room', 'Move to the hallway', 'Move to your room']
}

const parentsroom = {
  name: 'gameplay',
  message: gameData.rooms.parentsroom.description.default,
  type: 'list',
  choices: ['Move to the bathroom', 'Move to the hallway']
}

const hallway = {
  name: 'gameplay',
  message: gameData.rooms.hallway.description.default,
  type: 'list',
  choices: ['Move to the bathroom', 'Move to the hallway', 'Move to your room', 'Move to your parent\'s room', 'Move to the living room', 'Move to the garage', 'Move to the kitchen']
}

const kitchen = {
  name: 'gameplay',
  message: gameData.rooms.kitchen.description.default,
  type: 'list',
  choices: ['Move to the living room', 'Move to the hallway']
}

const livingroom = {
  name: 'gameplay',
  message: gameData.rooms.livingroom.description.default,
  type: 'list',
  choices: ['Move to the hallway', 'Move to the kitchen']
}

const garage = {
  name: 'gameplay',
  message: gameData.rooms.garage.description.default,
  type: 'list',
  choices: ['Move to the hallway']
}



module.exports = [
    gamePrompt, kidsroom, bathroom, parentsroom, hallway, kitchen, livingroom, garage
]