const gameData = require('../game.json');
const { handleApi } = require('./aiconfig');

async function populateDistContent() {
  let response;
  
  for (let i = 0; i < Object.keys(rooms).length; i++) {
      response = await handleApi(gameData.rooms[Object.keys(rooms)[i]].distractions.prompt);
      rooms[gameData.adjacencyList[i].id].event = response;
  }
  console.log('Ready to start');
}

const rooms = {
  kidsroom: { event: '' },
  bathroom: { event: '' },
  parentsroom: { event: '' },
  hallway: { event: '' },
  garage: { event: '' },
  livingroom: { event: '' }
};



console.log(rooms);

function handleChildDistraction(currentRoom) {
  const prompt = gameData.rooms[currentRoom].distractions.prompt;
  return prompt;
}

function handleEvent(currentRoom) {
  const prompt = rooms[currentRoom].event;
  console.log(prompt);
  return prompt;
}

function handleDogDistraction(dogCurrentRoom) {
  const prompt = gameData.rooms[dogCurrentRoom].dogdistractions.prompt;
  return prompt;
}

function handleDogEvent(dogCurrentRoom) {
  const prompt = gameData.rooms[dogCurrentRoom].dogdistractions.event;
  return prompt;
}

module.exports = {
  handleChildDistraction,
  handleEvent,
  handleDogDistraction,
  handleDogEvent,
  populateDistContent
};
