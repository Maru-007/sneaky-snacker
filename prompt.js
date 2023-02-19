
//Welcome message for game
async function welcome() {
  const title = await inquirer.prompt({
    name: "welcomeMessage",
    message: "Welcome to Sneaky Snacker! Would you like to start a new game?",
    type: "list",
    choices: ["Yes", "No"],
    //If yes, instantiate game instance; if no, escape to home.
});
}

//You are now playing as ___________. 
//Options: OK (next scene) / Q (quit)
//Type: List

//You are now in the kid's room
//Prompt
//Options: Search / Navigate / Distract
//Type: List

//Search
//Data: prompt
//Options: Action: Pickup? Yes / No
//Type: List

//Navigate 
//Data: name
//Options: Navigate