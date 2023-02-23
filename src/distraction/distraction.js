const gameData = require('../../game.json');

function handleChildDistraction (currentRoom) {
    const prompt = gameData.rooms[currentRoom].distractions.prompt;
    return prompt;
}

function handleEvent (currentRoom) {
  const prompt = gameData.rooms[currentRoom].distractions.event;
  return prompt;
}


module.exports = { handleChildDistraction, handleEvent };