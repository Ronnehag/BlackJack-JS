# BlackJack-JS
Assignment in the course Frontend 1.
Tools used: JavaScript, NodeJS, MSSQL, jQuery, SASS, HTML, BootStrap.

# Log in
The game uses a simple log in that is connected to MSSQL and NodeJS. The goal of the assignment wasn't to work with backend.
But to pass it needed a simple user validation and database connection.

# Rules of the game
DEAL:
- Player places his bet, minimum is 5$.
- When pressing 'Bet' the game will start and the dealer will deal two cards to the player and to himself.
- One of the computers cards will be faced down.

PLAYER:
- Player can hit, stand or double.
- Double will double the bet and draw one card, the player can no longer hit/stand and the round will play out.
- Hit, gives the player a card.
- Stand, player stops his turn and the computer will start his turn.

COMPUTER:
- Starts his turn after the player uses 'Stand' or 'Double'.
- Will show his hidden card, if the score is equal or above 17 he is forced to stand. Otherwise he will start to draw cards until he is equal or above 17.

MAIN:
- Get as close to 21 as possible without going over.
- 'Black Jack' the player recieves 21 in the first deal. Will automatically win.
- Maximum 5 cards can be drawn per player.
