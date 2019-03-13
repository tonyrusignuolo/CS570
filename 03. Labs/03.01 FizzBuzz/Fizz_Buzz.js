//Michael Macari

for(i = 74; i <= 291; i++){       //For loop iterates i from 74 to 291
    if(i % 3 == 0 && i % 5 == 0){   // if its divisible by 3 and by 5 print fizzbuzz
        console.log("FizzBuzz");
    }
    else if(i % 3 == 0){            //Divisible by only 3 print Fizz
        console.log("Fizz");
    }
    else if(i % 5 == 0){            //Divisible by only 5 print Buzz
        console.log("Buzz");
    }
    else{
        console.log(i);             //Otherwise print i
    }
}
