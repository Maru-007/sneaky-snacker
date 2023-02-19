const rooms = require("./rooms.json").rooms;

//this is just a dictionary making the ids more palatable for the UI.
const roomOptions = {
    "kidsroom": "Kids Room",
    "bathroom": "Bathroom",
    "parentsroom": "Parents' Room",
    "hallway": "Hallway",
    "garage": "Garage",
    "livingroom": "Living Room",
    "kitchen": "Kitchen",
  };


function handleNavigation(socket, currentRoom) {
//emit a message witht he current room's description when starting
  socket.emit("message", currentRoom.description.default);
//set up an event listener for the navigate event from the ui
  socket.on("navigate", () => {
//get the available navigation options for the current rooms
    const options = currentRoom.navigation.triggers.navigate;
    const availableOptions = Object.keys(options);
//construct the question string with available room options
    const question = `${currentRoom.navigation.name} ${availableOptions
      .map((roomID) => {
        const room = rooms[options[roomID]];
        return `${roomOptions[room.id]} (${roomID})`;
      })
      .join(", ")}`;
// Emit the question to the client
    socket.emit("question", question);
//set up an event listener for the selectoption event from the client
    socket.once("selectOption", (option) => {
      const targetRoom = options[option];
      if (targetRoom) {
// Update the current room and emit the new description to the client 
        currentRoom = rooms[targetRoom];
        socket.emit("message", currentRoom.description.default);
      }
    });
  });
}

module.exports = handleNavigation;