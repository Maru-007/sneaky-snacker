const gameData = require('./game.json');

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
  choices: ['Navigate', 'Search']
}

const parentsroom = {
  name: 'gameplay',
  message: gameData.rooms.parentsroom.description.default,
  type: 'list',
  choices: ['Navigate', 'Search']
}

const hallway = {
  name: 'gameplay',
  message: gameData.rooms.hallway.description.default,
  type: 'list',
  choices: ['Navigate', 'Search']
}

const kitchen = {
  name: 'gameplay',
  message: gameData.rooms.kitchen.description.default,
  type: 'list',
  choices: ['Navigate', 'Search']
}

const livingroom = {
  name: 'gameplay',
  message: gameData.rooms.livingroom.description.default,
  type: 'list',
  choices: ['Navigate', 'Search']
}

const garage = {
  name: 'gameplay',
  message: gameData.rooms.garage.description.default,
  type: 'list',
  choices: ['Navigate', 'Search']
}



module.exports = [
    kidsroom, bathroom, parentsroom, hallway, kitchen, livingroom, garage
]