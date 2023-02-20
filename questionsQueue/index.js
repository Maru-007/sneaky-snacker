const Queue = require('./classQueue');

let questionsReady = new Queue();
questionsReady.enqueue({ question: 'Welcome to Sneaky Snackers! Would you like to join a new game?', answer: 'A. Yes'});

module.exports = {
  questionsReady,
};