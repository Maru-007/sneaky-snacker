# Software Requirements

## Vision

<!-- Minimum Length: 3-5 sentences -->

__What is the vision of this product?__  
Create an entertaining and challenging game for players of all ages.

__What pain point does this project solve?__  
Provide entertainment and socialization with friends.

__Why should we care about your product?__  
Because post-pandemic, emphasis on socialization is a priority. Our game provides a collaborative, and unique environment to engage with friends and have fun.

## Scope (In/Out)

- IN - What will your product do
  <!-- - Describe the individual features that your product will do.
  - High overview of each. Only need to list 4-5 -->
  - The game will allow the user to explore an environment.
  - The game will allow the user to trigger behaviors in the game.
  - Players will be presented with challenges to overcome in order to win.
  - The game will make it possible for two players to play together.

- OUT - What will your product not do.
  <!-- - These should be features that you will make very clear from the beginning that you will not do during development. These should be limited and very few. Pick your battles wisely. This should only be 1 or 2 things. Example: My website will never turn into an IOS or Android app. -->
  - The game will not charge any fees to play
  - The game will not be too hard

### Minimum Viable Product vs

__What will your MVP functionality be?__

- We will implement a game with a win state and a fail state
- The player will have movement within the predetermined environment
- The player will have a narrative experience
- Player will be able to make choices and use assets
- Multiplayer functionality

__What are your stretch goals?__

### Stretch

What stretch goals are you going to aim for?

- Develop a UI
- Punishment for failure
- Text-to-speech functionality for visually impaired users

## Functional Requirements

List the functionality of your product. This will consist of tasks such as the following:

- Two players can join gameplay
- Player can choose behaviors
  - Players can collect unique assets and use them accordingly
- Let the player know if they win or lose

### Data Flow

_Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site._

- First player connected plays as the kid
- Second (optional) player plays as dog
- Travel room to room
- Avoid obstacles
- Navigate events
- Collect items
- Steal cookie
- Failure loop represents 3 lives
  - replay of the whole game with a limit and then failure

## Non-Functional Requirements (301 & 401 only)

_Non-functional requirements are requirements that are not directly related to the functionality of the application but still important to the app._

1. Adaptability  
    It's impossible to anticipate every feature that will maximize the satisfaction of the game. Having code that we can change overtime is ideal. The underlying code means we can change what the game is about. The use of SQS means that we can add a UI later on.
1. Usability  
    User friendly and approachable design make it possible for a broad range of users to enjoy the game successfully. We want to design a game that maximizes user satisfaction by thoughtfully illustrating a relatable narrative.