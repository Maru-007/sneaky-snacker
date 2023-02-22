const EVENT_NAMES = { 
  // playerReady: 'playerReady',
  childReady: 'childReady',
  dogReady: 'dogReady',
  //need selection event
  //this will correspond to user's selction of where they want to navigate to
  selection: 'selection',
  dogSelection: 'dogSelection',
  //need navigate event
  //this event will come from the server giving the user a choice of where to navigate
  navigate: 'navigate',
  questionsReady: 'questionsReady',
  dogQuestions: 'dogQuestions',
};

module.exports = {
  EVENT_NAMES,
};

