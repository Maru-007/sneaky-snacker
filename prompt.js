const gameData = require('./game.json');

const kidsroom = {
    name: 'gameplay',
    message: gameData.rooms.kidsroom.description.default,
    type: 'list',
    choices: ['Navigate', 'Search'],
    id: 'kidsroom'
}

const bathroom = {
  name: 'gameplay',
  message: gameData.rooms.bathroom.description.default,
  type: 'list',
  choices: ['Navigate', 'Search'],
  id: 'bathroom'

}

const parentsroom = {
  name: 'gameplay',
  message: gameData.rooms.parentsroom.description.default,
  type: 'list',
  choices: ['Navigate', 'Search'],
  id: 'parentsroom'
}

const hallway = {
  name: 'gameplay',
  message: gameData.rooms.hallway.description.default,
  type: 'list',
  choices: ['Navigate', 'Search'],
  id: 'hallway'
}

const kitchen = {
  name: 'gameplay',
  message: gameData.rooms.kitchen.description.default,
  type: 'list',
  choices: ['Navigate'],
  id: 'kitchen'

}

const livingroom = {
  name: 'gameplay',
  message: gameData.rooms.livingroom.description.default,
  type: 'list',
  choices: ['Navigate', 'Search'],
  id: 'livingroom'

}

const garage = {
  name: 'gameplay',
  message: gameData.rooms.garage.description.default,
  type: 'list',
  choices: ['Navigate', 'Search'],
  id: 'garage'

}


module.exports = [
    kidsroom, bathroom, parentsroom, hallway, kitchen, livingroom, garage
]