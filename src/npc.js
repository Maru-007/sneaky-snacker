const startingRoom = 'livingroom';

// When distractions happen, dad should move

function NPC(playerRoom, dadRoom) {
  let lose = {
    name: 'gameplay',
    message: 'You were caught by dad! You lose. Try again?',
    type: 'list',
    choices: ['Yes', 'No'],
  };
  if (!playerRoom === dadRoom) {
    return;
  } else {
    return lose;
  }
}

module.exports = NPC;
