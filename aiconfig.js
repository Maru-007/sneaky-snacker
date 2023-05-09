const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const graph = require('./src/navigation/navigation'); 

const promptExamples = {
  1: "You see a backpack discarded on the ground. Do you pick it up?",
  2: "Holy crap a dirty sock. It smells disgusting. Do you pick it up?",
  3: "You see a stereo. Do you turn it on?",
  4: "You see a hairdryer on the counter. Do you turn it on?",
  5: "You see a hairdryer on the counter. Do you turn it on?",
  moveToRoom: "The bathroom is brightly lit. Makeup and and appliances are plugged in everywhere. There shower has a slow drip and there are hair ties all over the floor." 
}
const answerExamples = {
  yes1: "You pick up the backpack. This will be useful",
  no1: "You don't see anything useful.",
  yes2: "You turn your stereo on, it's playing T-swizzle's favorite hits. You turn it up to max volume.",
  no2: "You ignore the stereo",
  yes3: "You turn the hair-dryer on. It screams into life and slowly starts rotating on the bathroom counter. You hear movement in the house.",
  no3: "You ignore the hair-dryer",
}

const configuration = new Configuration({
    apiKey: process.env.OPENAIKEY
});
const openai = new OpenAIApi(configuration);

async function completion (room) {
    
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: `You are a response generator for a video game, your response will be based off of the room the player is in. Your job is to generate a descriptive and creative string response for a player decision. Examples: ${promptExamples} & ${answerExamples}. Do not include any additional text, do not modify the original object, and do not return an object, only a string. `},
                    {role: "system", content: "Backstory for the game: You are playing as a young girl named Melis. Your goal as either player is to find the cookie jar and eat cookies, without your dad catching you. If you find the cookie jar, you win. If you get caught by dad you lose. Use this as context for your response"},
                    {role: "system", content: `The user has many choices based on the room they're in. Example: ${graph}. Output one response based on potential user choice. If a prompt example has an inanimate object, your response must include it in some way.`},
                    {role: "system", content: "IMPORTANT: Keep the response light and kid-friendly, make it fun."},
                    {role: "user", content: room}
    ]

    })
    const message = response.data.choices[0].message.content;
    return message;
    
} 
const handleApi = async (currentRoom) => {
    console.log('Calling the function for prompts.');
    const response = await completion(currentRoom);
    return response;
}


module.exports = { handleApi };