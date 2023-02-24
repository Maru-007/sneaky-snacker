const gameData = require('../../game.json');

function handleChildDistraction (currentRoom) {
    const prompt = gameData.rooms[currentRoom].distractions.prompt;
    return prompt;
}

function handleEvent (currentRoom) {
  const prompt = gameData.rooms[currentRoom].distractions.event;
  return prompt;
}

function handleDogDistraction (dogCurrentRoom) {
  const prompt = gameData.rooms[dogCurrentRoom].dogdistractions.prompt;
  return prompt;
}

function handleDogEvent (dogCurrentRoom) {
  const prompt = gameData.rooms[dogCurrentRoom].dogdistractions.event;
  return prompt;
}


module.exports = { handleChildDistraction, handleEvent, handleDogDistraction, handleDogEvent };