const { Server } = require("socket.io");
const { EVENT_NAMES } = require("../utils");
const io = new Server(3000);

io.on("connection", socket =>{
    console.log("I tried to start an online bakey... But I accidentally deleted all my cookies!");
})