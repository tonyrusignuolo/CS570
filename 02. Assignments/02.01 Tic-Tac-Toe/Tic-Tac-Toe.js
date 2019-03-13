//Michael Macari, Anthony Rusignuolo, Jon Lafluer
//Assignment 1: Tic-Tac-Toe

var prompt = require("prompt-sync")();

var Board = 
	{
	board: [],
	boardSize: 0,
	numPlayers: 0,
	WSC: 0,
	players: [' X ',' O ',' A ',' B ',' C ',' D ',' E ',' F ',' G ',' H ',' I ',' J ',' K ',' L ',' M ',' N ',' O ',' P ',' Q ',' R ',' S ',' T ',' U ',' V ',' W ',' X ',' Y ',' Z '],
	currentPlayerIndex: 0,
	
	createBoard: function() 
		{     //Sets the variables passed in by the new game
		for(var i = 0; i < this.boardSize; i++)
        	{
            var temp = [];
            for(var x = 0; x < this.boardSize; x++) 
            	{
                temp.push('   ');
            	}
            this.board.push(temp);
        	}
		},
	
		validMove: function(row, col)
		{
		//this determines if the current player's move choice is possible
		//figure out boardSize
		if ((typeof row) !== "number" || (typeof col) !== "number")
			{
			return false;
			}
		else if (row >= 0 && row <= this.boardSize - 1 && col >= 0 && col <= this.boardSize - 1 && this.board[row][col] === "   ")
			{
			return true;
			}
		else
			{
			return false;
			}
		},
	
		addMove: function(row, col, player)
		{
		//this appends the blank board with the current player's move choice, only if it is a validMove
		if (this.validMove(row-1, col-1) === true)
			{
			this.board[row-1][col-1] = player;
			}
		},
	
		checkForWinner: function(player, WSC)
		{
		//check if a player has met the win sequence count
		for (var i = 0; i < this.boardSize; i++)
			{
			for (var j = 0; j < this.boardSize; j++)
				{
				//horizontal
				for (var WSC1 = 0; WSC1 < WSC; WSC1++)
					{
					if (this.board[i][j + WSC1] !== player)
						{
						break;
						}
					if (WSC1 + 1 === WSC)
						{
						return true;
						}
					}
				//vertical
				for (WSC1 = 0; WSC1 < WSC; WSC1++)
					{
					if (this.board[i + WSC1][j] !== player)
						{
						break;
						}
					if (WSC1 + 1 === WSC)
						{
						return true;
						}
					}
				//diagonal right
				for (WSC1 = 0; WSC1 < WSC; WSC1++)
					{
					if (this.board[i + WSC1][j + WSC1] !== player)
						{
						break;
						}
					if (WSC1 + 1 === WSC)
						{
						return true;
						}
					}
				//diagonal left
				for (WSC1 = 0; WSC1 <= WSC; WSC1++)
					{
					if (this.board[i + WSC1][j - WSC1] !== player)
						{
						break;
						}
					if (WSC1 + 1 === WSC)
						{
						return true;
						}
					}
				}
		return false;
			}
		},
		
		saveGame:function()
		{
		//do some savin' and stuff
		},
		
		loadGame: function()
		{
         var gameFile = prompt("Enter the name of the game file to load, excluding extensions: ");  //Gets file name to load
         gameFile = gameFile + ".txt";
         fs.readFile(gameFile, "utf8", function(err, fileData)
        	{                     //Tells it what to read
            if(err)
            	{                                               //If file is not found throw an error
                throw(err);
            	}
             else
             	{
                //Otherwise pass the data into data
            	var fileContent = JSON.parse(fileData);                   //Read the file and get all of the data to parse
            	data.loadBoard(fileContent.numPlayers, fileContent.boardSize, fileContent.winSequence, fileContent.playerTurn, fileContent.gameBoard, fileContent.moveNum);    //Passes all the data into data loadBoard to resume game
             	}
        	});
		},
	
		newGame: function()
		{
	    //console.log("in new game");
	    var err = "Input is invalid, you are not worthy, goodbye";
	    var numPlayers = Number(prompt("Enter number of players; Minimum 2, Maximum 26: "));
	    if(numPlayers >= 2 && numPlayers <= 26){
	        this.numPlayers = numPlayers;
	    	var boardSize = Number(prompt("Enter a board size; Maximum 999: "));
	        if(boardSize >= 1 && boardSize <= 999){
	            this.boardSize = boardSize;
	        	var WSC = Number(prompt("What is the win score count: "));
	            if(WSC > 0 && WSC <= boardSize){
	                if(Math.pow(boardSize, 2)/WSC >= numPlayers -1){
	                    //Create the new game...
	                    // ......
	                    // ......
	                    // ......
	                	this.WSC = WSC;
	                    console.log("Creating game...");
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
	
		hostGame:function()
		{
		//starts actual gameplay, doesn't load or save game, prints victory when one player wins
		var row, col, previousPlayerIndex;
		console.log("Welcome to TicTacToe!");
		if (this.currentPlayerIndex > 0)
			{
			previousPlayerIndex = this.currentPlayerIndex - 1;
			}
		else
			{
			previousPlayerIndex = this.numPlayers - 1;
			}
		/*
		console.log(previousPlayerIndex);
		console.log(this.players[previousPlayerIndex]);
		console.log(this.WSC);
		console.log(this.checkForWinner(this.players[previousPlayerIndex],this.WSC));
		*/
		while (this.checkForWinner(this.players[previousPlayerIndex],this.WSC) === false)
			{
			console.log("\n");
			this.printBoard();
			console.log("Player " + this.players[this.currentPlayerIndex] + ":");
			row = prompt("Enter row number: ");
			col = prompt("Enter column number: ");
			if (row === "s" || col === "s")
				{
				this.saveGame();
				break;
				}
			while (this.validMove(Number(row - 1),Number(col - 1)) === false)
				{
				console.log("Invalid input. \nPlayer " + this.players[this.currentPlayerIndex] + ", please enter another location.");
				row = prompt("Enter row number: ");
				col = prompt("Enter column number: ");
				}
			this.board[row-1][col-1] = this.players[this.currentPlayerIndex];
			if (this.currentPlayerIndex === 0)
				{
				this.currentPlayerIndex++;
				previousPlayerIndex = 0;
				}
			else if (this.currentPlayerIndex > 0 && this.curentPlayerIndex < this.numPlayers - 1)
				{
				this.currentPlayerIndex++;
				previousPlayerIndex++;
				}
			else if (this.currentPlayerIndex === this.numPlayers - 1)
				{
				this.currentPlayerIndex = 0;
				previousPlayerIndex++;
				}
			}
		if (row !== "s" || col !== "s")
			{
			console.log("\n");
			this.printBoard();
			console.log("\n\nPlayer " + this.players[previousPlayerIndex] + " wins! Congrats!");
			}
		},
	
		printBoard: function()
		{
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
                        {
                    	str2 += ' ' + a.toString() + '  ';
                        }
                    else if (Math.floor(a/100) <= 0)
                        {
                    	str2 += a.toString() + '  ';
                        }
                    else if (Math.floor(a/1000) <= 0)
                        {
                    	str2 += a.toString() + ' ';
                        }
                	}
                console.log(str2);
            	}
            if(Math.floor((i+1)/10) === 0)
            	{
                process.stdout.write("  ");
            	}
            else if(Math.floor((i+1)/100) === 0)
            	{
                process.stdout.write(' ');
            	}
            console.log((i + 1).toString(), this.board[i].join('|'));
            if (i !== this.boardSize - 1)
                {
            	console.log(str1);
                }
        	}
		},

	/*
	 code I wrote when I though hostgame would load and save game
	 var SG = '' //save game?
		while (SG !== 'y' || SG !== 'n') //while loop reprompts until a valid answer is given
			{
			SG = prompt("Would you like to resume a saved game? (y/n)");
			}
		if (SG === 'y')
			//read in game?
		else if (SG === 'n')
			numPlayers = prompt("Enter the number of players.")
			boardSize = prompt("Enter the board size.")
			WSC = prompt("Enter the win sequence count.")
			
			var currentPlayer = players[0]
		
			
		while ()
	*/
	
	
		main: function()
		{
		/*ask about saved game
		 *for new game
		 *	how many players (A-Z, < 26)
		 *	whats the board size (< 999)
		 *	whats the win sequence
		 *	check possible winning criteria based on size, players, wsc
		 *	hostgame
		 *	
		 */
		var SG = prompt("Would you like to load a saved game (s), or start a new game (n)?");	
		while (SG !== "s" && SG !== "n")
			{
			SG = prompt("Invalid input! Please respond with 's' to load a saved game or 'n' to start a new game.");
			}
		if (SG === "s")
			{
			this.loadGame();
			}
		else if (SG === "n")
			{
			this.newGame();
			this.createBoard();
			this.hostGame();
			}
		}
	};

var tony = Board.main();