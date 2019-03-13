//Where all of the game data is to be held and accessed

var game = require("./game");

module.exports = {
    numPlayers: 0,                  //Init for variables inside of the module itself.
    boardSize: 0,
    winSequence: 0,
    playerPiece: [' X ',' O ',' A ',' B ',' C ',' D ',' E ',' F ',' G ',' H ',' I ',' J ',' K ',' L ',' M ',' N ',' P ',' Q ',' R ',' S ',' T ',' U ',' V ',' W ',' Y ',' Z '],
    playerTurn: 0,                          //Will point to indices of what players turn it is.
    gameBoard: [],
    moveNum: 0,

    loadBoard: function(numPlayers, boardSize, winSequence, playerTurn, gameBoard, moveNum){        //Function takes in all of the data from text as parameters and sets them to the data variables.

        this.numPlayers = parseInt(numPlayers);
        this.boardSize = parseInt(boardSize);
        this.winSequence = parseInt(winSequence);
        this.playerTurn = parseInt(playerTurn);
        this.gameBoard = gameBoard;
        this.moveNum = parseInt(moveNum);
        this.drawBoard();
     },

    createBoard: function(numPlayers, boardSize, winSequence){     //Sets the variables passed in by the new game
        this.numPlayers = numPlayers;
        this.boardSize = boardSize;
        this.winSequence = winSequence;

        for(i = 0; i < boardSize; i++){                            //creates our 2D array to store values
            var temp = [];
            for(x = 0; x < boardSize; x++) {
                temp.push('   ');
            }
            this.gameBoard.push(temp);
        }
        //this.drawBoard()
    },

    drawBoard: function(){                          //Creates the entire game board on console
        //prints the board with the borders
        var str1 = '    ---';
        for (let a = 1; a < this.boardSize; a++)
        {
            str1 += '+---';
        }
        for (var i = 0; i < this.boardSize; i++)
        {
            if (i === 0)
            {
                var str2 = '    ';
                for (let a = 1; a <= this.boardSize; a++)
                {
                    if (Math.floor(a/10) <= 0)
                        str2 += ' ' + a.toString() + '  ';
                    else if (Math.floor(a/100) <= 0)
                        str2 += a.toString() + '  ';
                    else if (Math.floor(a/1000) <= 0)
                        str2 += a.toString() + ' ';
                }
                console.log(str2);
            }
            if(Math.floor((i+1)/10) === 0){
                process.stdout.write("  ");
            }
            else if(Math.floor((i+1)/100) === 0){
                process.stdout.write(' ');
            }
            console.log((i + 1).toString(), this.gameBoard[i].join('|'));
            if (i !== this.boardSize - 1)
                console.log(str1);
        }
    },

    validMove: function(row, col){
        //this determines if the current player's move choice is possible
        //figure out boardSize
        row -= 1;
        col -= 1;
        if((typeof row) != "number" || (typeof col) != "number"){               //Checks if move is number
            return(false);
        }
        else if(row >= 0 && row <= this.boardSize - 1 && col <= this.boardSize - 1 && this.gameBoard[row][col] == "   "){
            return(true);
        }
        else{
            return(false);              //return false if not number or our of bounds
        }
    },

    addMove: function(row, col){            //appends the blank board with current player's move choice only if valid
        if(this.validMove(row, col) == true){
            this.gameBoard[row-1][col-1] = this.playerPiece[this.playerTurn];
            this.playerTurn = (this.playerTurn + 1) % this.numPlayers;
            this.moveNum++;             //move num for tracking whose piece we are up to
            return(true);
        }
        else{
            console.log("Invalid move, try again fool...");
            return(false);
        }
    },

    checkWin: function(row, col){       //function for checking if someone has won the game
        if(this.checkDownLeftDiag(row,col) || this.checkDownRightDiag(row,col) || this.checkCol(row, col) || this.checkRow(row, col) || this.checkTie()){
            return(true);                               //if any of the tic tac toes return a true we return true as win
        }
        else{
            return(false);
        }

        // this.checkDownLeftDiag(row,col);             //Test Functions
        // this.checkDownRightDiag(row,col);
        // this.checkCol(row, col);
        // this.checkRow(row, col);
    },

    checkTie: function(){
        if (Math.pow(this.boardSize, 2) == this.moveNum) {                      //Checks for a tie by seeing if the board is filled
            console.log("It is a tie. Computer says, all of you are losers.");      //Tells user how it is
            return(true);
        }
        else{
            return(false);
        }
    },

     checkRow: function(row, col){                      //Checks the row on row move was made on for tic tac toe
         var letter = this.gameBoard[row-1][col-1];
         var count = 0;
         for(i=0; i < this.boardSize; i++){             //Only iterates column to check entire row.
             if(this.gameBoard[row-1][i] == letter){    //Note O(N) run time
                 count++;
                 if(count == this.winSequence) {
                     console.log(letter + "wins " + this.winSequence + " in a row.");
                     return (true);
                 }
             }
             else{
                 count = 0;
             }
         }
     },

    checkCol: function(row, col){                           //Checks the column
        var letter = this.gameBoard[row-1][col-1];
        var count = 0;
        for(i=0; i < this.boardSize; i++){                  //Checks through the columns by iterating row move was made on
            if(this.gameBoard[i][col-1] == letter){         //Also note O(N) run time
                count++;
                if(count == this.winSequence) {
                    console.log(letter + "wins " + this.winSequence + " in a column.");
                    return (true);
                }
            }
            else{
                count = 0;
            }
        }
    },

    checkDownRightDiag: function(row, col){             //Checks diagonal from top left to bottom right
        row-=1;
        col-=1;
        var count = 0;
        var letter = this.gameBoard[row][col];          //To get diagonal for down right, we find the top left space in line with the move made
        while(row != 0 && col != 0){
            row --;
            col --;
        }

        while(row < this.boardSize && col < this.boardSize){        //We then loop all the way down to the end of the board
            if(this.gameBoard[row][col] == letter){                 //Also note O(2N) = O(N) run time
                count++;
                if(count == this.winSequence){
                    console.log(letter + "wins " + this.winSequence + " in downward right diagonal.");
                    return(true);
                }
            }
            else{
                count = 0;                                          //Count reverts to 0 when not seeing letters in a row.
            }

            row++;
            col++;
        }
    },

    checkDownLeftDiag: function(row, col){                  //checks diagonal from top right to bottom left
        row -= 1;
        col -=1;
        var count = 0;
        var letter = this.gameBoard[row][col];
        while(row != 0 && col != this.boardSize-1){         //Checks the top right element spot in line with the move made
            row--;
            col++;
        }
        while(row < this.boardSize && col >= 0){            //Iterates through entire diagonal looking for the win sequence
            if(this.gameBoard[row][col] == letter){         //Also note O(2N) == O(N) run time
                count++;
                if(count == this.winSequence){
                    console.log(letter + "wins " + this.winSequence + " in a downward left diagonal.");
                    return(true);
                }
            }
            else{
                count = 0;
            }
            row++;
            col--;
        }
    }
};
