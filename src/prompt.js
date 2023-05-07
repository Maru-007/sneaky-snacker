const gameData = require('./game.json');
const { handleApi, responses } = require('../aiconfig');

async function populateContent() {
await handleApi('kidsroom');
await handleApi('bathroom');
await handleApi('parentsroom');
await handleApi('hallway');
await handleApi('livingroom');
await handleApi('garage');
await handleApi('kitchen');
console.log('Ready to start');
}

const kidsroom = {
  name: 'gameplay',
  message: responses[0],
  type: 'list',
  choices: ['Navigate', 'Search', 'Distraction'],
  id: 'kidsroom',
};

const bathroom = {
  name: 'gameplay',
  message: responses[1],
  type: 'list',
  choices: ['Navigate', 'Search', 'Distraction'],
  id: 'bathroom',
};

const parentsroom = {
  name: 'gameplay',
  message: responses[2],
  type: 'list',
  choices: ['Navigate', 'Search', 'Distraction'],
  id: 'parentsroom',
};

const hallway = {
  name: 'gameplay',
  message: responses[3],
  type: 'list',
  choices: ['Navigate', 'Search', 'Distraction'],
  id: 'hallway',
};

const kitchen = {
  name: 'gameplay',
  message: responses[4],
  type: 'list',
  choices: ['Navigate', 'Cookie Jar'],
  id: 'kitchen',
};

const livingroom = {
  name: 'gameplay',
  message: responses[5],
  type: 'list',
  choices: ['Navigate', 'Search', 'Distraction'],
  id: 'livingroom',
};

const garage = {
  name: 'gameplay',
  message: responses[6],
  type: 'list',
  choices: ['Navigate', 'Search', 'Distraction'],
  id: 'garage',
};

module.exports = {rooms:[
  kidsroom,
  bathroom,
  parentsroom,
  hallway,
  kitchen,
  livingroom,
  garage,
], populateContent};
