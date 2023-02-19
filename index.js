const { Server } = require("socket.io");
const io = new Server(3000);
const { EVENT_NAMES } = require("./utils");
//Going to get questions from SQS and send to players using inquirer format
const { questionsReady } = require("./questionsQueue/index");
const chalk  = require("chalk");
const inquirer = require("inquirer");

// let responseCount = 0;
let answerCount = 0;
let question;

async function welcome() {
  const title = await inquirer.prompt({
    name: "welcomeMessage",
    message: "Welcome to Sneaky Snacker! Would you like to start a new game?",
    type: "list",
    choices: ["Yes", "No"],
    //If yes, instantiate game instance; if no, escape to home.
});
}

function startEventServer() {
  io.on("connection", (socket) => {
    console.log("We have a new connection:", socket.id);

    socket.on(EVENT_NAMES.playerReady, (player) => {
      console.log(`${player} is ready!`);
      io.emit(EVENT_NAMES.questionsReady, welcome);
      // responseCount += 1;
      // console.log(responseCount);
      // if (responseCount === 2) {
      //   question = questionsReady.dequeue();
      //   console.log("Here is the question", question.question);
      //   io.emit(EVENT_NAMES.questionsReady, question.question);
      // }
    });

    // socket.on(EVENT_NAMES.answer, (answer) => {
    //   console.log(answer);
    //   answerCount += 1;
    //   if (answer.sneakySnacker === question.answer) {
    //     socket.emit(EVENT_NAMES.answer, "Correct!");
    //   } else {
    //     console.log(answer.sneakySnacker, question.answer);
    //     socket.emit(EVENT_NAMES.answer, "Incorrect!");
    //   }
    // });
  });
}

startEventServer();
