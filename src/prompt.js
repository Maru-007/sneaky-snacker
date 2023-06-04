const gameData = require('./game.json');
const { handleApi } = require('../aiconfig');

let responses = [];
let prompts = []
let kidsroom = {}
let bathroom = {}
let parentsroom = {}
let hallway = {}
let kitchen = {}
let livingroom = {}
let garage = {}

prompts.push(kidsroom, bathroom, parentsroom, hallway, kitchen, livingroom, garage)

async function populateContent() {
  responses = [];

  for (let i = 0; i <gameData.adjacencyList.length; i++) {
    const response = await handleApi(gameData.adjacencyList[i].id);
    responses.push(response);

  }
  console.log('Ready to start');
}

function genPrompts () {
  prompts.forEach((room, idx) => {
    room.name = 'gameplay';
    room.message = responses[idx];
    room.type = 'list';
    room.id = gameData.adjacencyList[idx].id

    if (room.id === 'kitchen') {
      room.choices = ['Navigate', 'Cookie Jar'];
    } else {
      room.choices = ['Navigate', 'Search', 'Distraction'];
    };
  });
  
  console.log(responses[0]);
  console.log(prompts[0]);
}



module.exports = {populateContent, genPrompts, prompts};