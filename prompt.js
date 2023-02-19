
const gamePrompt = {
    name: 'gameplay',
    message: 'You are currently playing as the child. You will be given options to navigate throughout the house. The goal is to reach the snacks before dad catches you.',
    type: 'list',
    choices: ['Ok', 'Quit']
}

const kidsroom = {
    name: 'gameplay',
    message: 'You are in your room. You are surrounded by your bed and toys cast carelessly on the floor. A hunger grows in you. It is time for cookies.',
    type: 'list',
    choices: ['Move to the bathroom', 'Move to the hallway']
}

const bathroom = {
  name: 'gameplay',
  message: 'The bathroom is brightly lit. Makeup and and appliances are plugged in everywhere. There shower has a slow drip and there are hair ties all over the floor.',
  type: 'list',
  choices: ['Move to your parent\'s room', 'Move to the hallway', 'Move to your room']
}

const parentsroom = {
  name: 'gameplay',
  message: 'There is a tall bed in the center. Two night-stands flank it. On either side is a tall and narrow dresser and a short and wide dresser. On top of the dressers are a variety of interesting nicknacks. Dirty laundry sits in the corner.',
  type: 'list',
  choices: ['Move to the bathroom', 'Move to the hallway']
}

const hallway = {
  name: 'gameplay',
  message: 'The main hallway has one light halfway down. You can see a the glow of the TV from the entry to the living room. All the other doors are shut.',
  type: 'list',
  choices: ['Move to the bathroom', 'Move to the hallway', 'Move to your room', 'Move to your parent\'s room', 'Move to the living room', 'Move to the garage', 'Move to the kitchen']
}

const kitchen = {
  name: 'gameplay',
  message: 'The kitchen. The vessel of your desires. On the counter, a cookie jar. Inside that jar: scrumptuous deliciousness...',
  type: 'list',
  choices: ['Move to the living room', 'Move to the hallway']
}

const livingroom = {
  name: 'gameplay',
  message: 'The living room has several chairs arranged around a TV. The lights are off and the TV is on. You can see Dad sitting in his chair, sleepy, watching the news.',
  type: 'list',
  choices: ['Move to the hallway', 'Move to the kitchen']
}

const garage = {
  name: 'gameplay',
  message: 'The garage has stuff stacked all around. Only one car is there. Mom\'s car, of course. Dad\'s is outside covered in snow.',
  type: 'list',
  choices: ['Move to the hallway']
}



module.exports = [
    gamePrompt, kidsroom, bathroom, parentsroom, hallway, kitchen, livingroom, garage
]