const EVENT_NAMES = { 
  // playerReady: 'playerReady',
  childReady: 'childReady',
  dogReady: 'dogReady',
  //need selection event
  //this will correspond to user's selction of where they want to navigate to
  selection: 'selection',
  dogSelection: 'dogSelection',
  message: 'message',
  dogMessage: 'dogMessage',
  //need navigate event
  //this event will come from the server giving the user a choice of where to navigate
  navigate: 'navigate',
  questionsReady: 'questionsReady',
  dogQuestions: 'dogQuestions',
  quit: 'quit'
};

module.exports = {
  EVENT_NAMES,
};

