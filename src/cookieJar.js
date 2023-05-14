const gameData = require('./game.json');
let playerBase = 15;
let dadBase = 15;
let dadModifier = 10;

let win = {
  name: 'gameplay',
  message: gameData.rooms.kitchen.CookieJar.triggers.effect.win,
  type: 'list',
  choices: ['Play again', 'No'],
};

let lose = {
  name: 'gameplay',
  message: gameData.rooms.kitchen.CookieJar.triggers.effect.lose,
  type: 'list',
  choices: ['Play again', 'No'],
};

let draw = {
  name: 'gameplay',
  message:
    'A draw! Both you and dad share the cookies! Would you like to play again?',
  type: 'list',
  choices: ['Play again', 'No'],
};

function winCondition(playerModifier, dogModifier) {
  let playerScore = playerBase + playerModifier;
  if (dogModifier) {
    console.log('Dog modifier is present');
    playerScore = playerBase + playerModifier + dogModifier;
  }

  const dadScore = dadBase + dadModifier + Math.floor(Math.random() * 15);
  if (playerScore > dadScore) {
    console.log('PLAYER', playerScore, dadScore, 'DAD');
    return win;
  } else if (playerScore < dadScore) {
    console.log('PLAYER', playerScore, dadScore, 'DAD');
    return lose;
  } else if (playerScore === dadScore) {
    console.log('PLAYER', playerScore, dadScore, 'DAD');
    return draw;
  }
}

function winConditionTest(playerBase, playerModifier, dadBase, dadModifier) {
  const playerScore =
    playerBase + playerModifier + Math.floor(Math.random() * 20);
  const dadScore = dadBase + dadModifier + Math.floor(Math.random() * 20);
  if (playerScore > dadScore) {
    console.log('PLAYER', playerScore, dadScore, 'DAD');
    return win;
  } else if (playerScore < dadScore) {
    console.log('PLAYER', playerScore, dadScore, 'DAD');
    return lose;
  } else if (playerScore === dadScore) {
    console.log('PLAYER', playerScore, dadScore, 'DAD');
    return draw;
  }
}

module.exports = { winConditionTest, winCondition };
