const { Server } = require('socket.io');
const io = new Server(3001);
const { EVENT_NAMES } = require('./utils');
const inquirer = require('inquirer');

const prompts = require('./prompt');
const dogPrompts = require('./prompt-dog');
const { handleSearch } = require('./src/search/search');
const { handleChildDistraction, handleEvent } = require('./src/distraction/distraction');
const gameData = require('./game.json');
const winCondition = require('./src/cookieJar');
const { handleDistraction } = require('./distract');
const chance = require('chance')();
const { handleNavigation, handleNPCNavigation } = require('./src/navigation/navigation')
const NPC = require('./src/npc')


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
let dadCurrentRoom = 'livingroom';
let playerBase = 15;
// add to modifier when player picks up item & distracts
let playerModifier = 10;

let dadBase = 15;
let dadModifier = 10;




const distraction = {
  name: 'gameplay',
  message: gameData.rooms[currentRoom].distractions.prompt,
  type: 'list',
  choices: ["Distract", "Don\'t Distract"]
}
//>>>>>>> distractions

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

function choice(answer) {
  gameChoices = {
    yes: answer.gameplay === 'Yes',
    navigate: answer.gameplay === 'Navigate',
    distraction: answer.gameplay === 'Distraction',
    distract: answer.gameplay === 'Distraction',
    dontDistract: answer.gameplay === 'Don\'t Distract',
    search: answer.gameplay === 'Search',
    cookieJar: answer.gameplay === 'Cookie Jar',
    quit: answer.gameplay === 'No'
  }
  return gameChoices;
}


function startEventServer() {
  navigateDad();

  io.on('connection', (socket) => {
    console.log('We have a new connection:', socket.id);
    console.log(gameData.rooms);

    socket.on(EVENT_NAMES.childReady, () => onChildReady(socket));
    socket.on(EVENT_NAMES.dogReady, () => onDogReady(socket));

    socket.on(EVENT_NAMES.selection, (answer) => {

      console.log(answer.gameplay)
      if (choice(answer).yes) {
        console.log(prompts[0])
        io.emit(EVENT_NAMES.questionsReady, prompts[0])
      } 
      if (choice(answer).navigate) {
        console.log(currentRoom);
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom)
        }
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);
      } 
      if (rooms.includes(answer.gameplay)) {
        let room = prompts.find(obj => obj.id === answer.gameplay);

        io.emit(EVENT_NAMES.questionsReady, room);
        currentRoom = answer.gameplay;
        console.log(currentRoom);
      } 
      if (choice(answer).distraction) {
        io.emit(EVENT_NAMES.questionsReady, distraction);
      } 
      if (choice(answer).distract) {
        let itemScore = gameData.rooms[currentRoom].distractions.triggers.effect.scoreUpdate;
        playerModifier += itemScore;
        let room = prompts.find(obj => obj.id === currentRoom);
        io.emit(EVENT_NAMES.message, gameData.rooms[currentRoom].distractions.event);
        let moveNPC = handleNPCNavigation(currentRoom)
        const randomEventCheck = Math.random()
        console.log(randomEventCheck)
        randomEventCheck < 0.6 ? io.emit(EVENT_NAMES.questionsReady, room) : io.emit(EVENT_NAMES.questionsReady, NPC(currentRoom, moveNPC));
      } 
      if (choice(answer).dontDistract) {
        let room = prompts.find(obj => obj.id === currentRoom);
        io.emit(EVENT_NAMES.questionsReady, room);
      } 
      if (choice(answer).search){
        const searchPrompt = {
          name: 'gameSearch',
          message: handleSearch(currentRoom),
          type: 'confirm',
        }
        io.emit(EVENT_NAMES.questionsReady, searchPrompt)
      } 
      if (answer.gameSearch === true){
        io.emit(EVENT_NAMES.message, gameData.rooms[currentRoom].Search.obtained)
        gameData.rooms[currentRoom].Search.pickedup === true;
        let itemScore = gameData.rooms[currentRoom].Search.triggers.effect.scoreUpdate;
        playerModifier += itemScore;
        console.log(playerModifier);
        console.log(playerModifier);
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom)
        }
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);
      } 
      if (answer.gameSearch === false){
        const navigatePrompt = {
          name: 'gameplay',
          message: 'Where would you like to go?',
          type: 'list',
          choices: handleNavigation(currentRoom)
        }
        io.emit(EVENT_NAMES.questionsReady, navigatePrompt);

      } 
      if (choice(answer).cookieJar) {
        io.emit(EVENT_NAMES.questionsReady, winCondition())
        currentRoom = 'kidsroom'
      } 
      if (choice(answer).quit) {
        io.emit(EVENT_NAMES.quit, 'Quit')
      }

    })
    socket.on(EVENT_NAMES.dogSelection, (answer) => {
      console.log(answer.gameplay);
      const handleDog = handleGameplayDogSelection(answer, dogPrompt, dogCurrentRoom, currentRoom);
      if (handleDog){
        const [eventName, eventData] = handleDog;
        io.emit(eventName, eventData);
      }
      if (rooms.includes(answer.gameplay)) {
        let room = dogPrompts.find((obj) => obj.id === answer.gameplay);
        dogCurrentRoom = answer.gameplay;
        console.log(dogCurrentRoom);
        io.emit(EVENT_NAMES.dogQuestions, room);
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
  })}

  function handleGameplayDogSelection(answer, dogPrompt, dogCurrentRoom, currentRoom){
    if (answer.gameplay === 'Yes') {
      return [EVENT_NAMES.dogQuestions, dogPrompt];
      // io.emit(EVENT_NAMES.dogQuestions, dogPrompt);
    }
    if (answer.gameplay === 'Ok' || answer.distraction === true || answer.distraction === false) {
      const helpMelis = {
        name: 'gameplay',
        message: `Melis is currently in the ${currentRoom}. What would you like to do?`,
        type: 'list',
        choices: ['Navigate', 'Distraction'],
      };
      return [EVENT_NAMES.dogQuestions, helpMelis];
      // io.emit(EVENT_NAMES.dogQuestions, helpMelis);
    }
    if (answer.gameplay === 'Navigate') {
      console.log(dogCurrentRoom);
      const navigatePrompt = {
        name: 'gameplay',
        message: 'Where would you like to go?',
        type: 'list',
        choices: handleNavigation(dogCurrentRoom),
      };
      return [EVENT_NAMES.dogQuestions, navigatePrompt];
      // io.emit(EVENT_NAMES.dogQuestions, navigatePrompt);
    }
  }

// function navigateDad() {
//   console.log('Dad is currently in:', dadCurrentRoom);
//   let doors = handleNavigation(dadCurrentRoom);
//   // navigate to a random room accessible from current room
//   let randomIndex = Math.floor(Math.random() * doors.length);
//   let randomRoom = doors[randomIndex];
//   dadCurrentRoom = randomRoom;

//   setTimeout(navigateDad, chance.integer({min: 5000, max: 10000}))
// }

// startEventServer();
