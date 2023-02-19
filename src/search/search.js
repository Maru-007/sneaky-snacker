const gameData = require('../../game.json')

const emission = gameData.rooms.kidsroom

socket.on("search emission", (emission) => {
    socket.emit("search return", searchPickup(emission))
})
const pickup = "yes"
socket.on("search pickup", (pickup, emission) => {
    socket.emit("search return pickup", pickup(pickup, emission))
})

// console.log(gameData.rooms.kidsroom, "CONSOLE LOG")
function searchPickup (emission) {
    const prompt = emission.search.prompt
    if (emission.search.pickedup === false) {
        return prompt // needs to be socket emission back to console prompt
    }
}
function pickup (string, emission) {
    const prompt = emission.search.obtained
    if (string === "yes") {
        emission.search.pickedup = true
        return prompt
    } else {
        return
    }
}

console.log()
// Current room could equal "kids-room" JSON object