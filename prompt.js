
const gamePrompt = {
    name: 'gameplay',
    message: 'You are currently playing as the child. You will be given options to navigate throughout the house. The goal is to reach the snacks before dad catches you.',
    type: 'list',
    choices: ['Ok', 'Quit']
}

const kidsRoom = {
    name: 'gameplay',
    message: 'You are in your room. You are surrounded by your bed and toys cast carelessly on the floor. A hunger grows in you. It is time for cookies.',
    type: 'list',
    choices: ['Move to the Bathroom', 'Move to the Hallway']
}



module.exports = [
    gamePrompt, kidsRoom
]