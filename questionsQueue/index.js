const Queue = require('./classQueue');

let questionsReady = new Queue();
questionsReady.enqueue({ question: 'Welcome players, shall we play a game of Maru Trivia? A. Yes', answer: 'A'});
questionsReady.enqueue({ question: 'When was Maru born? A. 2/14/2022 B. 1/1/2022 C. 12/25/2021', answer: 'B'});
questionsReady.enqueue({ question: 'Is Maru a Male or Female? A. Female B. Male', answer: 'B'});
questionsReady.enqueue({ question: 'What is Maru\'s favorite hobby? A. Making Biscuits B. Sleeping In C. Escaping', answer: 'A'});
questionsReady.enqueue({ question: 'What is Maru\'s favorite cookie? A. Tuna B. Chicken C. Salmon', answer: 'C'});


module.exports = {
  questionsReady,
};