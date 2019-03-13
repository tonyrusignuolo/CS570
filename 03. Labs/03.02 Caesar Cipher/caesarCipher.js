//Michael Macari, Anthony Rusignuolo, Job Lafleur
//Caeser Cipher Lab 2

var prompt = require('prompt');     //Includes prompt dependency into code
var fs = require('fs');             //Includes file reader as dependency into code

//Filename in directory is file.txt
var arr = [];
var fname = '';                     //Creates variable for file name
prompt.start();                     // Starts the prompt function on console to get user input
prompt.get(['file'], function(err, result){

    fname = result.file;            //User input for file name is stored into variable
    fs.readFile(fname, "utf8", function(err, data){     //Read file function implemented to get text
        if(err){
            throw(err);             //If there is an error reading the file, throw the error code
        }
        else{
            var outputString = decodeData(data);       //Calls our function, passing in the data (string from text)
            //console.log(outputString);
            fs.writeFile("solution.txt", outputString, function(err){   //Calls FS to write the data processed to the file
                if(err){                // If there is an error throw the error
                    throw(err);
                }
                else{
                    console.log("File Saved");      //Otherwise display the file was saved
                }
            });
        }
    });
});

//String.fromCharCode is capital letters between inclusive of 65 to 90
//String.fromCharCode is lower case letters between inclusive of 97 to 122
//Found it out through testing ^^^^^^ using String.fromCharCode()
//Create function to decipher the string

function decodeData(s) {
    //console.log(s);
    var outputChar = "";                    //String for us to save the output to
    var key = 5;                            //Key for increment for letter decryption
    arr = s.split('');         //Internal function splits string by character
    for (i = 0; i < arr.length; i++) {          //Starts iteration through each character in array
        if(i != 0 && i%3 == 0){                 //if i has incremented by 3 characters, the key now increments by 2 and modulo to ensure its not exceeding the alphnumeric coding
            key = (key + 2) % 26;
        }
        var alphaCode = arr[i].charCodeAt(0);   //Gets the alpha-code number

        if((alphaCode >= 65 && alphaCode <= 90)||(alphaCode >= 97 && alphaCode <= 122)){    //ensures that the current value is a letter of lowercase or uppercase
           //Note, since key cant be greater than 26, we just need to see if we exceeded below 65 or in the case of lower case 97
            if((alphaCode >= 65 && alphaCode <= 90)&&(alphaCode - key < 65 )){               //Checks if wrapping necessary
                alphaCode = (90 - (64 - (alphaCode-key)));                                 //Gets how many more necessary to wrap, subtracts from 90
                outputChar = outputChar + String.fromCharCode(alphaCode);
                //console.log(outputChar);
            }
            else if((alphaCode >= 97 && alphaCode <= 122) && (alphaCode - key < 97)) {    //Checks for wrapping on lower case letters
                alphaCode = (122 - (96 - (alphaCode - key)));                             //finds the character code associated
                outputChar = outputChar + String.fromCharCode(alphaCode);
                //console.log(outputChar);
            }
            else{
                alphaCode = alphaCode - key;                                              //if wrapping is not necessary, perform basic subtraction for key
                outputChar = outputChar + String.fromCharCode(alphaCode);
                //console.log(outputChar);
            }
        }
        else{
            outputChar = outputChar + arr[i];
            //console.log(outputChar);
        }
    }
    return(outputChar);
}


