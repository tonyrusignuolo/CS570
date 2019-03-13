//Michael Macari, Jon Lafluer, Anthony Rusignuolo
//Tic Tac Toe
//Main app to call rest of functions and modules

var game = require("./game");               //Declares our dependencies
var data = require("./data");
var prompt = require("prompt-sync")();

//Create a new game, or load from file?
var nglg = prompt("Would you like to start a new game or load from file? Enter 'new', 'load' or 'quit' to quit: ");
while(nglg != "new" && nglg != "load" && nglg != "quit"){
    nglg = prompt("Enter 'new' for new game. Enter 'load' to load game from file. Enter 'quit' to quit: " );
}

if(nglg == "new"){
    game.newGame();
    data.drawBoard();
    game.mainLoop();
}
else if(nglg == "load" ){
    game.loadGame();
    //data.drawBoard();
}
else{
    console.log("Shutting Down");
}
