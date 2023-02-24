const gameData = require('../game.json');

function handleSearch(currentRoom) {
  const prompt = gameData.rooms[currentRoom].Search.prompt;
  return prompt;
}

function handleDogSearch(dogCurrentRoom) {
  const prompt = gameData.rooms[dogCurrentRoom].dogSearch.prompt;
  return prompt;
}

module.exports = { handleSearch, handleDogSearch };
