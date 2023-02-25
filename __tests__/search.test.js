const gameData = require("../src/game.json");
const { handleSearch, handleDogSearch } = require("../src/search/search.js");

describe('handleSearch', () => {
  it('should be able to search kidsroom', () => {
    const currentRoom = 'kidsroom';
    const expected = gameData.rooms.kidsroom.Search.prompt;
    const actual = handleSearch(currentRoom);
    expect(actual).toEqual(expected);
  });

  it('should be able to search bathroom', () => {
    const currentRoom = 'bathroom';
    const expected = gameData.rooms.bathroom.Search.prompt;
    const actual = handleSearch(currentRoom);
    expect(actual).toEqual(expected);
  });

  it('should be able to search parentsroom', () => {
    const currentRoom = 'parentsroom';
    const expected = gameData.rooms.parentsroom.Search.prompt;
    const actual = handleSearch(currentRoom);
    expect(actual).toEqual(expected);
  });

  it('should be able to search hallway', () => {
    const currentRoom = 'hallway';
    const expected = gameData.rooms.hallway.Search.prompt;
    const actual = handleSearch(currentRoom);
    expect(actual).toEqual(expected);
  });

  it('should be able to search garage', () => {
    const currentRoom = 'garage';
    const expected = gameData.rooms.garage.Search.prompt;
    const actual = handleSearch(currentRoom);
    expect(actual).toEqual(expected);
  });

  it('should be able to search livingroom', () => {
    const currentRoom = 'livingroom';
    const expected = gameData.rooms.livingroom.Search.prompt;
    const actual = handleSearch(currentRoom);
    expect(actual).toEqual(expected);
  });

  it('should not be able to search kitchen', () => {
    const currentRoom = 'kitchen';
    expect(() => {
      handleSearch(currentRoom);
    }).toThrow(`Cannot read properties of undefined (reading 'prompt')`);
  });

  it('should throw an error when currentRoom is invalid', () => {
    const currentRoom = 'invalid';
    expect(() => {
      handleSearch(currentRoom);
    }).toThrow(`Cannot read properties of undefined (reading 'Search')`);
  });
});

describe('handleDogSearch', () => {
  it('should return items the dog can find in the kidsroom', () => {
    const dogCurrentRoom = 'kidsroom';
    const expected = gameData.rooms.kidsroom.dogSearch.prompt;
    const actual = handleDogSearch(dogCurrentRoom);
    expect(actual).toEqual(expected);
  });

  it('should return items the dog can find in the parentsroom', () => {
    const dogCurrentRoom = 'parentsroom';
    const expected = gameData.rooms.parentsroom.dogSearch.prompt;
    const actual = handleDogSearch(dogCurrentRoom);
    expect(actual).toEqual(expected);
  });

  it('should return items the dog can find in the bathroom', () => {
    const dogCurrentRoom = 'bathroom';
    const expected = gameData.rooms.bathroom.dogSearch.prompt;
    const actual = handleDogSearch(dogCurrentRoom);
    expect(actual).toEqual(expected);
  });

  it('should return items the dog can find in the hallway', () => {
    const dogCurrentRoom = 'hallway';
    const expected = gameData.rooms.hallway.dogSearch.prompt;
    const actual = handleDogSearch(dogCurrentRoom);
    expect(actual).toEqual(expected);
  });

  it('should return items the dog can find in the garage', () => {
    const dogCurrentRoom = 'garage';
    const expected = gameData.rooms.garage.dogSearch.prompt;
    const actual = handleDogSearch(dogCurrentRoom);
    expect(actual).toEqual(expected);
  });

  it('should return items the dog can find in the livingroom', () => {
    const dogCurrentRoom = 'livingroom';
    const expected = gameData.rooms.livingroom.dogSearch.prompt;
    const actual = handleDogSearch(dogCurrentRoom);
    expect(actual).toEqual(expected);
  });

  it('should throw an error when dogCurrentRoom is invalid', () => {
    const dogCurrentRoom = 'invalid';
    expect(() => {
      handleDogSearch(dogCurrentRoom);
    }).toThrow(`Cannot read properties of undefined (reading 'dogSearch')`);
  });

  it('should not be able to search the kitchen', () => {
    const dogCurrentRoom = 'kitchen';
    expect(() => {
      handleDogSearch(dogCurrentRoom);
    }).toThrow(`Cannot read properties of undefined (reading 'prompt')`);
  });
});