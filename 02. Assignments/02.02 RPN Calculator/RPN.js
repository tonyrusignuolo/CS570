//Michael Macari, Jon Lafleur, Anthony Rusignuolo
//RPN

var prompt = require("prompt-sync")();

function getInput() {
    var in_Bomdas = /\d+(\.\d+)?|[-+()*/%]|POW/g; //This regex is used to match all bomdas characters and put them in an array

    do {
        var infixExpression = prompt("Enter a simple math expression to be calculated or 'quit' to quit: ");
        if (infixExpression === 'quit' || infixExpression === 'q')
            return 'quit';
        var queue = infixExpression.toString().replace(/\s/g, "").match(in_Bomdas);     //Creates array queue with our math
    }
    while ((queue === null || !checkValidParentheses(queue)))

    return queue;
};

function checkValidParentheses(queue){                  //Function for checking parentheses balance
    var parenthesesCount = 0;
    for(i = 0; i < queue.length; i++){
        if(queue[i] === '(')
            parenthesesCount++;
        else if(queue[i] === ')')
            parenthesesCount--;
    }

    if(parenthesesCount !== 0){                              //Checks if the parentheses are balanced
        console.log("Error: Mismatching Parentheses.\n");
        return(false);
    }
    else
        return(true);
}

function precedence(op){                        //Returns precedence value for operators
    if(op === '+' || op === '-')
        return(1);
    else if(op === '*' || op === '/' || op === '%')
        return(2);
    else if(op === 'POW')
        return(3);
    else
        return(-1);
}

function infixToPostFix(infixQ){                //Infix to postFix conversion
    var postfixQ = [];
    var stack = [];
    var t = '';
    while(infixQ.length !== 0){
        t = infixQ.shift();
        if(/^\d+(\.\d+)?$/.test(t))                      //If value is an operand push to the output
            postfixQ.push(t);
        else if(stack.length === 0)
            stack.push(t);
        else if(t === '(')                       //If next value is a open parentheses push it to the stack
            stack.push(t);
        else if(t === ')'){
            while(stack.length > 0 && stack[stack.length-1] != '(')    //If its a closing parentheses, and the stack is not empty and it does not have an opening one on top
                postfixQ.push(stack.pop());                               //Push the popped value from stack to the output
            if(stack.length > 0 && stack[stack.length-1] != '(')       //if there is a parentheses at the top of stack still, it must be an invalid expression
                return("Invalid Expression");
            else                                                       //Pop value from stack
                stack.pop();
        }
        else{
            while(stack.length > 0 && (precedence(t) <= precedence(stack[stack.length-1])))     //push value from stack to output so long as it has precidence
                postfixQ.push(stack.pop());
            stack.push(t);                   //All else just push to the stack the queue
        }
    }
    while(stack.length > 0)                 //While the stack is still greater than 0, push to the output
        postfixQ.push(stack.pop());
    return(postfixQ);
}

function postfixSolve (postQ) {                 //Post fix evaluation
    var eval = [];
    var t =  '';
    var topNum, nextNum, answer;
    while (postQ.length !== 0) {
         t = postQ.shift();
         if (/^\d+(\.\d+)?$/.test(t))
             eval.push(parseFloat(t));  //Convert string to number and push onto stack
         else {
             topNum = eval.pop();   //Get operand and remove it from stack
             nextNum = eval.pop();  //Get operand and remove it from stack

             switch (t) {
                 case '+':
                     answer = nextNum + topNum;
                     break;
                 case '-':
                     answer = nextNum - topNum;
                     break;
                 case '*':
                     answer = nextNum * topNum;
                     break;
                 case '/':
                     if(topNum == 0)
                         return("Error: Cannot divide by 0, invalid Expression")
                     answer = nextNum / topNum;
                     break;
                 case '%':
                     if(topNum == 0)
                         return("Error: Cannot modulo by 0, invalid Expression")
                     answer = nextNum % topNum;
                     break;
                 case 'POW':
                     answer = Math.pow(nextNum, topNum);
                     break;
             }
             eval.push(answer);
         }
    }
    return eval.pop();
}

function main() {                   //Main loop for RPN calculator
    while (true) {
        var infixQ = getInput();
        if (infixQ === 'quit')
            return; // This exits the program
        else
            var postfixQ = infixToPostFix(infixQ);

        console.log("The postfix expression is:", postfixQ.join(' '));
        var solution = postfixSolve(postfixQ);
        if (typeof(solution) == 'string')
            console.log(solution);
        else
            console.log("The solution is :", solution.toFixed(2));
    }
}

main();             //Calls main function