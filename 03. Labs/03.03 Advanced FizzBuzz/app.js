// Create a function called FizzBuzzer that takes a sequential container of integer numbers as its only parameter.
//
//     Tip: For JavaScript programmers, the quintessential sequential container is an array.
//
//     For each number in the sequence, output the number to the screen. However, if the number is divisible by 3,
//     output the word Buzz instead of the number. If the number is divisble by 5, output Fizz to the screen instead of the number.
//     If the number is divisible by both, output BuzzFizz to the screen instead of the number.
//
//     In your main code, call the function with an sequence consisting of the numbers between 10 and 250.
//     Do not hard code this sequence using an array literal, but rather use code to generate the sequence.
//     Note: You must not submit your "node_modules" folder if you are working on NodeJs/JavaScript.
//     (Just submit your JavaScript source code and package.json file)
//
//     Submit only one single code file and that is it. Do not zip your file.

//Michael Macari, Anthony Rusignuolo, Jon Lafluer
//Advanced Fizz Buzz Lab

arr = [];                       //initiates array
for(x = 10; x <= 250; x++){     //For loop appends numbers from 10 to 250 onto array
    arr.push(x);
}

FizzBuzzer(arr);                //Calls our function with the sequential array



//Function declaration to create array and Fizz Buzz print statements.
function FizzBuzzer(arr){
    for(i = 0; i < arr.length; i++){        //Iterates through each element in array we pass
        if(arr[i] % 3 == 0 && arr[i] % 5 == 0){     //Checks if element is divisible by 3 and 5
            console.log("BuzzFizz");
        }
        else if(arr[i] % 3 == 0){                   //Checks if element is divisible by 3
            console.log("Buzz");
        }
        else if(arr[i] % 5 == 0){                   //Checks if element is divisible by 5
            console.log("Fizz");
        }
        else{
            console.log(arr[i]);                    //prints element if none
        }
    }
}