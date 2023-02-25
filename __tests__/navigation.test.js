const gameData = require("../src/game.json");
const { handleNavigation, handleNPCNavigation } = require('../src/navigation/navigation.js');


describe('handleNavigation', () => {
    it('should return the doors of the parentsroom when direction is parentsroom', () => {
      const direction = 'parentsroom';
      const expected = gameData.adjacencyList[2].adjacent;
      const actual = handleNavigation(direction);
      expect(actual).toEqual(expected);
    });
  
    it('should return the doors of the bathroom when direction is bathroom', () => {
      const direction = 'bathroom';
      const expected = gameData.adjacencyList[1].adjacent;
      const actual = handleNavigation(direction);
      expect(actual).toEqual(expected);
    });
  
    it('should return the doors of the hallway when direction is hallway', () => {
        const direction = 'hallway';
        const expected = gameData.adjacencyList[3].adjacent;
        const actual = handleNavigation(direction);
        expect(actual).toEqual(expected);
      });
  
    it('should return the doors of the garage when direction is garage', () => {
        const direction = 'garage';
        const expected = gameData.adjacencyList[4].adjacent;
        const actual = handleNavigation(direction);
        expect(actual).toEqual(expected);
      });
  
    it('should return the doors of the livingroom when direction is livingroom', () => {
      const direction = 'livingroom';
      const expected = gameData.adjacencyList[5].adjacent;
      const actual = handleNavigation(direction);
      expect(actual).toEqual(expected);
    });
  
    it('should return the doors of the kitchen when direction is kitchen', () => {
      const direction = 'kitchen';
      const expected = gameData.adjacencyList[6].adjacent;
      const actual = handleNavigation(direction);
      expect(actual).toEqual(expected);
    });
  
    it('should throw an error when direction is invalid', () => {
        const direction = 'invalid';
        expect(() => {
          handleNavigation(direction);
        }).toThrow(`Cannot read properties of undefined (reading 'doors')`);
      });

    // it('')
  });