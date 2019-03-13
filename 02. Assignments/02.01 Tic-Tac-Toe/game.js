//Game functions to be implimented
var prompt = require("prompt-sync")();
var fs = require("fs");
var data = require("./data");

module.exports = {          //Allows the export of module

    newGame: function(){                        //Creates function in game module for creation of new game
        //console.log("in new game");
        var err = "Input is invalid, you are not worthy, goodbye";
        var numPlayers = prompt("Enter number of players; Minimum 1, Maximum 26: ");
        if(numPlayers >= 2 && numPlayers <= 26){
            var boardSize = Number(prompt("Enter a board size; Maximum 999: "));
            if(boardSize > 1 && boardSize <= 999){
                var winSequence = prompt("What is the win sequence: ");
                if(winSequence > 0 && winSequence <= boardSize){
                    if(Math.pow(boardSize, 2)/winSequence >= numPlayers -1){
                        //Create the new game...
                        console.log("Creating game");
                        data.createBoard(numPlayers, boardSize, winSequence);
                    }
                    else{
                        throw("Victory is not possible given these conditions");
                    }
                }
                else{
                    throw("Invalid, win sequence must be bigger than 0 and less than or equal to board size");
                }
            }
            else{
                throw(err);
            }
        }
        else{
            throw(err);
        }
    },



    loadGame: function(){
         var gameFile = prompt("Enter the name of the game file to load, excluding extensions: ");  //Gets file name to load
         gameFile = gameFile + ".txt";
         try {
             var fileData = fs.readFileSync(gameFile, "utf8");
             var fileContent = JSON.parse(fileData);
             data.loadBoard(fileContent.numPlayers, fileContent.boardSize, fileContent.winSequence, fileContent.playerTurn, fileContent.gameBoard, fileContent.moveNum);//Passes all the data into data loadBoard to resume game
             this.mainLoop();
         }
         catch(error){
             console.log("File doesnt exist");
             console.log("Error");
         }

    //      fs.readFile(gameFile, "utf8", function(err, fileData){                     //Tells it what to read
    //          if(err){                                               //If file is not found throw an error
    //              throw(err);
    //          }
    //          else{
    //              //Otherwise pass the data into data
    //              var fileContent = JSON.parse(fileData);                   //Read the file and get all of the data to parse
    //              //data.loadBoard(fileContent.numPlayers, fileContent.boardSize, fileContent.winSequence, fileContent.playerTurn, fileContent.gameBoard, fileContent.moveNum);//Passes all the data into data loadBoard to resume game
    //          }
    //      });
    //     data.loadBoard(fileContent.numPlayers, fileContent.boardSize, fileContent.winSequence, fileContent.playerTurn, fileContent.gameBoard, fileContent.moveNum);//Passes all the data into data loadBoard to resume game
    },

    saveGame: function(){
        var obj = {                             //Creates the object from all the variables in data that we are going to save to file
            numPlayers: data.numPlayers,
            boardSize: data.boardSize,
            winSequence: data.winSequence,
            playerTurn: data.playerTurn,
            gameBoard: data.gameBoard,
            moveNum: data.moveNum
        };
        var save = JSON.stringify(obj);         //Uses the stringify function to turn our object into a string for the text file.
        var fname = prompt("Enter a name for your save file: ");        //File name
        fname = fname + ".txt";                                         //appends .txt
        fs.writeFile(fname, save, function(err){                        //Writes the file to text
            if(err){
                throw(err);
            }
            console.log("File saved as " + fname);
        });
    },


    //main game loop
    mainLoop: function(){
        var x = false;
        while (!x) {                                  //Loops until quit is written, or someone wins, or a tie happens
            var sg = "";
            console.log("Type 'quit' at any time to quit");
            var choice = prompt("Enter row and column number separated by a space ' ': ").split(" ");
			var row = choice[0];
			var col = choice[1];
			if (row == "quit") {
                while(sg != 'y' && sg != 'n') {       //Game user must input if they want to save or not
                    sg = prompt("Would you like to save? Enter y/n: ");
                }
                if(sg == 'y') {
                    this.saveGame();
                    console.log("Shutting Down");       //Shut down message
                    x = true;
                    break;
                }
                else {
                    console.log("Shutting Down");
                    x = true;
                    break;
                }

            }
            if (col == "quit") {
                while(sg != 'y' &&  sg != 'n'){
                    sg = prompt("Would you like to save? Enter y/n: ");       //Same for column quit
                }
                if(sg == 'y') {
                    this.saveGame();
                    console.log("Shutting Down");               //shutdown message
                    x = true;
                    break;
                }
                else {
                    console.log("Shutting Down");
                    x = true;
                    break;
                }
            }
            var s = data.addMove(row, col);     //Calls the move add function
            if (s) {
                data.drawBoard();               //Redraws the board
                x = data.checkWin(row, col);    //Checks if a win happened and exits if so
            }

        }
    }
};

