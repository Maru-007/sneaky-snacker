const { winConditionTest } = require('../src/cookieJar');

describe('winCondition', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return win prompt if player score is greater than dad score', () => {
    let playerBase = 50;
    let playerModifier = 10;
    let dadBase = 15;
    let dadModifier = 10;
    let expected = {
      name: 'gameplay',
      message: "You open the cookie jar and begin devouring cookies. The victory may be pyrrhic in the long run. But right now it, like the cookies, is delicious. Play again?",
      type: 'list',
      choices: ['Yes', 'No'],
    };

    const actual = winConditionTest(playerBase, playerModifier, dadBase, dadModifier);
    expect(actual).toEqual(expected);
  });

  it('should return lose prompt if dad score is greater than player score', () => {
    let playerBase = 15;
    let playerModifier = 5;
    let dadBase = 50;
    let dadModifier = 100;
    let expected = {
      name: 'gameplay',
      message: "Just as you begin to open the cookies, your father walks in and catches you. 'What do you think you are doing?' You're caught...games over. Play again?",
      type: 'list',
      choices: ['Yes', 'No'],
    };

    const actual = winConditionTest(playerBase, playerModifier, dadBase, dadModifier);
    expect(actual).toEqual(expected);
  });

  it('should return draw prompt if player score equals dad score', () => {
    global.Math.random.mockReturnValue(0.5);
    let playerBase = 15;
    let playerModifier = 10;
    let dadBase = 15;
    let dadModifier = 10;
    let expected = {
      name: 'gameplay',
      message: 'A draw! Both you and dad share the cookies! Would you like to play again?',
      type: 'list',
      choices: ['Yes', 'No'],
    };

    const actual = winConditionTest(playerBase, playerModifier, dadBase, dadModifier);
    expect(actual).toEqual(expected);
  });
});

