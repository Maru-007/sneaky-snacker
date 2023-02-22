let playerBase = 15;
let playerModifier = 10;

let dadBase = 15;
let dadModifier = 10;



let win = {
  name: 'gameplay',
  message: 'You win! Do you want to play again?',
  type: 'list',
  choices: ['Yes', 'No'],
};

let lose = {
  name: 'gameplay',
  message: 'You Lose :( Do you want to try again?',
  type: 'list',
  choices: ['Yes', 'No'],
};

let draw = {
  name: 'gameplay',
  message:
    'A draw! Both you and dad share the cookies! Would you like to play again?',
  type: 'list',
  choices: ['Yes', 'No'],
};

function winCondition() {
    const playerScore = playerBase + playerModifier + Math.floor(Math.random() * 20);
    const dadScore = dadBase + dadModifier + Math.floor(Math.random() * 20);
    if (playerScore > dadScore) {
        
        console.log("PLAYER", playerScore, dadScore, "DAD")
        return win;
    } else if (playerScore < dadScore) {
        console.log("PLAYER", playerScore, dadScore, "DAD")
        return lose;
    } else if (playerScore === dadScore) {
        console.log("PLAYER", playerScore, dadScore, "DAD")
        return draw;
    }
}

module.exports = winCondition;

