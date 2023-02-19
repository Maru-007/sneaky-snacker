## JSON

adjacencyList:

adjacencyLists represent a graph as an array of linked lists.
The data in 2-10 represents this and is not being used in our game at the moment and may be a candidate for deletion later on.

Rooms:
  "id of the room":{
        "description":{
            "default": "this is the default prompt when they enter the room
        },
  "Search"; { this is the object holding data for search events
        "id": "backpack", //referencable id for the object
        "prompt": "text that will appear when search is called begging the question on whether you wnat to pick this up, this will emit to the UI.
        "altprompt": This is the flavor text that will return if pickedup is true to prevent a player from picking up the same object over and over.
        "pickedup": this will save the state of whether or not an item has been picked up. It plays a role in the altprompt.
        "trigger": List of effects from the items (this could be expanded so saved as an object)
        "effect": 
            scoreupdate: This is an integer that will added to the base of the players modifiers.
    "navigation"
        "id": navigation
        "name": prompt on next locations
        trigger.navigate:
        gotoxxxxxx: just says goto and the next location

    distractions:
        id: name of item and reference id
        prompt: flavor text on distraction prompting action
        event: flavor text for affirmative response
        triggers.navigate.gotoxxxxx: available rooms from this room
        effects.scoreupdate: score added to players base.
  }
  }