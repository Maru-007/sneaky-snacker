const gameData = require('./game.json');

function handleDistraction (dogCurrentRoom) {
    const prompt = gameData.rooms[dogCurrentRoom].distractions.dogPrompt;
    return prompt;
}

module.exports = { handleDistraction };