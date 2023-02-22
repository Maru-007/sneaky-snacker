const { Server } = require('socket.io');
const io = new Server(3001);
const { EVENT_NAMES } = require('./utils');
const inquirer = require('inquirer');
const prompts = require('./prompt');
const dogPrompts = require('./prompt-dog');
const { handleNavigation } = require('./src/navigation/navigation');
const gameData = require('./game.json');
const winCondition = require('./src/cookieJar');

const { handleDistraction } = require('./distract');
const chance = require('chance')();

const rooms = [
  'kidsroom',
  'bathroom',
  'parentsroom',
  'hallway',
  'kitchen',
  'livingroom',
  'garage',
];

let currentRoom = 'kidsroom';
let dogCurrentRoom = 'kidsroom';
let dadCurrentRoom = 'livingroom'


const welcomePrompt = {
  name: 'gameplay',
  message: 'Welcome to Sneaky Snacker! Would you like to start a new game?',
  type: 'list',
  choices: ['Yes', 'No'],
};

const gamePrompt = {
  name: 'gameplay',
  message:
    'You are currently playing as the child. You will be given options to navigate throughout the house. The goal is to reach the snacks before dad catches you.',
  type: 'list',
  choices: ['Ok', 'Quit'],
};

const dogPrompt = {
  name: 'gameplay',
  message:
    "You are now playing as Melis's dog, Diego. Your goal is to help Melis get cookies while avoiding being caught by dad.",
  type: 'list',
  choices: ['Ok', 'Quit'],
};

function onChildReady(player) {
  console.log(`Melis is ready!`, player.id);
  player.emit(EVENT_NAMES.questionsReady, welcomePrompt);
}
function onDogReady(dog) {
  console.log(`Diego is ready!`, dog.id);
  dog.emit(EVENT_NAMES.dogQuestions, welcomePrompt);
}

function startEventServer() {
  navigateDad();

  io.on('connection', (socket) => {
    console.log('We have a new connection:', socket.id);

    socket.on(EVENT_NAMES.childReady, () => onChildReady(socket));
    socket.on(EVENT_NAMES.dogReady, () => onDogReady(socket));

    socket.on(EVENT_NAMES.selection, (answer) => {
      console.log(answer.gameplay);
      if (answer.gameplay === 'Yes') {
        io.emit(EVENT_NAMES.questionsReady, gamePrompt);
      }
      if (answer.gameplay === 'Ok') {
        io.emit(EVENT_NAMES.questionsReady, prompts[0]);
      } else if (answer.gameplay === 'Navigate') {
        console.log(currentRoom);
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom),
        };
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);
      } else if (rooms.includes(answer.gameplay)) {
        let room = prompts.find((obj) => obj.id === answer.gameplay);
        io.emit(EVENT_NAMES.questionsReady, room);
        currentRoom = answer.gameplay;
        console.log(currentRoom)

      } else if (answer.gameplay === 'Search'){
        const searchPrompt = {
          name: 'gameSearch',
          message: handleSearch(currentRoom),
          type: 'confirm',
        }
        io.emit(EVENT_NAMES.questionsReady, searchPrompt)
      } else if (answer.gameSearch === true){
        gameData.rooms[currentRoom].Search.pickedup === true;
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom)
        }
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);
      } else if (answer.gameSearch === false){
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom)
        }
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);
      } else if (answer.gameplay === 'Cookie Jar') {
        
        io.emit(EVENT_NAMES.questionsReady, winCondition())
        currentRoom = 'kidsroom'
      } 

    })
  }
)}
    socket.on(EVENT_NAMES.dogSelection, (answer) => {
      console.log(answer.gameplay);
      if (answer.gameplay === 'Yes') {
        io.emit(EVENT_NAMES.dogQuestions, dogPrompt);
      }
      if (answer.gameplay === 'Ok' || answer.distraction === true || answer.distraction === false) {
        const helpMelis = {
          name: 'gameplay',
          message: `Melis is currently in the ${currentRoom}. What would you like to do?`,
          type: 'list',
          choices: ['Navigate', 'Distraction'],
        };
        io.emit(EVENT_NAMES.dogQuestions, helpMelis);
      }
      if (answer.gameplay === 'Navigate') {
        console.log(dogCurrentRoom);
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(dogCurrentRoom),
        };
        io.emit(EVENT_NAMES.dogQuestions, navigatePrompt);
      }
      if (rooms.includes(answer.gameplay)) {
        let room = dogPrompts.find((obj) => obj.id === answer.gameplay);
        io.emit(EVENT_NAMES.dogQuestions, room);
        dogCurrentRoom = answer.gameplay;
        console.log(dogCurrentRoom);
      }
      if (answer.gameplay === 'Distraction') {
        const distractionPrompt = {
          name: 'distraction',
          message: handleDistraction(dogCurrentRoom),
          type: 'confirm'
        }
        io.emit(EVENT_NAMES.dogQuestions, distractionPrompt);
      }
      // if (answer.distraction === true && currentRoom !== dogCurrentRoom) {
      //   playerModifier ++
      // }
      //   if (answer.distraction === true && currentRoom === dogCurrentRoom) {
      //   dadModifier ++
      // }
    });

function navigateDad() {
  console.log('Dad is currently in:', dadCurrentRoom);
  let doors = handleNavigation(dadCurrentRoom);
  // navigate to a random room accessible from current room
  let randomIndex = Math.floor(Math.random() * doors.length);
  let randomRoom = doors[randomIndex];
  dadCurrentRoom = randomRoom;

  setTimeout(navigateDad, chance.integer({min: 5000, max: 10000}))
}

startEventServer();
