const gameData = require('../game.json');
const { handleChildDistraction, handleEvent } = require('../src/distraction/distraction.js');

describe('handleChildDistraction', () => {
  it('should return the prompt for the current room', () => {
    const currentRoom = 'parentsroom';
    const expected = gameData.rooms[currentRoom].distractions.prompt;
    const actual = handleChildDistraction(currentRoom);
    expect(actual).toEqual(expected);
  });

  it('should throw an error if the room does not have a distraction prompt', () => {
    const currentRoom = 'garage';
    expect(() => {
      handleChildDistraction(currentRoom);
    }).not.toThrow();
  });
});

describe('handleEvent', () => {
  it('should return the prompt for the current room', () => {
    const currentRoom = 'parentsroom';
    const expected = gameData.rooms[currentRoom].distractions.event;
    const actual = handleEvent(currentRoom);
    expect(actual).toEqual(expected);
  });

  it('should throw an error if the room does not have a distraction event', () => {
    const currentRoom = 'garage';
    expect(() => {
      handleEvent(currentRoom);
    }).not.toThrow();
  });

});

  describe('handle ChildDistractioin', ()=> {

    it('should return the prompt for the current room', ()=> {
      const currentRoom = "kidsroom";
      const expected = gameData.rooms[currentRoom].distractions.prompt;
      const actual = handleChildDistraction(currentRoom);
      expect(actual).toBe(expected);
    });
    
    it('should throw an error if the room does not have a distraction prompt', ()=> {
      currentRoom = "bathroom";
      expect(()=>{
        handleChildDistraction(currentRoom)
      }).not.toThrow();
    });
  });
  

  describe('handleEvent', ()=> {
    it('should return the prompt for the current room',()=> {
      const currentRoom = "kidsroom";
      const expected = gameData.rooms[currentRoom].distractions.event;
      const actual = handleEvent(currentRoom);
      expect(actual).toEqual(expected);
    })

    it('should throw an error if the room does not have a distraction event', ()=> {
      const currentRoom = 'bathroom';
      expect(() => {
        handleEvent(currentRoom);
      }).not.toThrow();
    });
  });

  describe('handle ChildDistractioin', ()=> {
    it('should return the prompt for the current room', ()=> {
      const currentRoom = "livingroom";
      const expected = gameData.rooms[currentRoom].distractions.prompt;
      const actual = handleChildDistraction(currentRoom);
      expect(actual).toBe(expected);
    });
    
    it('should throw an error if the room does not have a distraction event', ()=> {
      currentRoom = "hallway";
      expect(()=>{
        handleChildDistraction(currentRoom)
      }).not.toThrow();
    });
    
  });

  describe('handleEvent', ()=> {
    it('should return the prompt for the current room', () => {
      const currentRoom = "hallway";
      const expected = gameData.rooms[currentRoom].distractions.event;
      const actual = handleEvent(currentRoom);
      expect(actual).toEqual(expected);
    });

    it('should throw an error if the room does not have a distraction event', () => {
      const currentRoom = "livingroom";
      expect(()=>{
        handleEvent(currentRoom);
      }).not.toThrow();
    });
        
  });
  