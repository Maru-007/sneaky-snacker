const gameData = require('../game.json');
const { handleApi } = require('./aiconfig');

async function populateContent() {
  for (let i = 0; i < gameData.adjacencyList.length; i++) {
    const response = await handleApi(gameData.adjacencyList[i].id);

    rooms[i][gameData.adjacencyList[i].id].event = response;
  }
  console.log('Ready to start');
}

const rooms = [
  { kidsroom: { event: '' } },
  { bathroom: { event: '' } },
  { parentsroom: { event: '' } },
  { hallway: { event: '' } },
  { garage: { event: '' } },
  { livingroom: { event: '' } },
  { kitchen: { event: '' } },
];

populateContent();

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
};
