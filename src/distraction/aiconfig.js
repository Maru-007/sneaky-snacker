const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const graph = require('../navigation/navigation'); 
const gameData = require('../game.json');


const promptExamples = {
  1: gameData.rooms['kidsroom'].distractions.prompt,
  2: gameData.rooms['parentsroom'].distractions.prompt,
  3: gameData.rooms['bathroom'].distractions.prompt,
  4: gameData.rooms['hallway'].distractions.prompt,
}
const answerExamples = {
  1: gameData.rooms['kidsroom'].distractions.event,
  2: gameData.rooms['parentsroom'].distractions.event,
  3: gameData.rooms['bathroom'].distractions.event,
  4: gameData.rooms['hallway'].distractions.event,
}

const configuration = new Configuration({
    apiKey: process.env.OPENAIKEY
});
const openai = new OpenAIApi(configuration);

async function completion (prompt) {
    
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: `You are a response generator for a video game, your response will be based off of the room the player is in. Your job is to generate responses for a player choosing a distraction option. Examples: ${promptExamples} & ${answerExamples}. Do not include any additional text, return only a string. `},
                    {role: "system", content: "Backstory for the game: You are playing as a young girl named Melis. Your goal as either player is to find the cookie jar and eat cookies, without your dad catching you. If you find the cookie jar, you win. If you get caught by dad you lose. Use this as context for your response"},
                    {role: "system", content: `The user has many choices based on the room they're in. Example: ${graph}. Output one response based on potential user choice. If a prompt example has an inanimate object, your response must include it in some way.`},
                    {role: "system", content: "IMPORTANT: Keep the response light and kid-friendly, make it fun and descriptive."},
                    {role: "system", content: "The cookie jar will only be present in the kitchen, and no other room."},
                    {role: "system", content: "Prompts generated should be an event that occurs after the distraction option is chosen to get the dad off track."},
                    {role: "user", content: prompt}
    ]

    })
    const message = response.data.choices[0].message.content;
    return message;
    
} 
const handleApi = async (userPrompt) => {
    console.log('Calling the function for prompts.');
    const response = await completion(userPrompt);
    return response;
}


module.exports = { handleApi };