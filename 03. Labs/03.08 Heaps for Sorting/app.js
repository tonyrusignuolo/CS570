// Heap Sort Lab
// Michael Macari, Anthony Rusignuolo, and Jon Lafleur

var prompt = require('prompt-sync')();

class maxHeap {
    constructor() {
        this.arr = [];                                      //Initializes array in heap
    }
    insert(val) {                                           //Inserts our value into the max heap in appropriate order
        var i = this.arr.length;
        this.arr.push(val);
        
        while (i > 0) {                                     //Swapping is done after checking the root node and its children
            let parent = Math.floor((i - 1) / 2);
            if (this.arr[parent] < this.arr[i]) {           //if the parent root is greater than the value, they get swapped
                let temp = this.arr[parent];
                this.arr[parent] = this.arr[i];
                this.arr[i] = temp;
            }
            else {
                break;                                      //if it isn't greater then we do not swap and we break out of loop
            }
            i = parent;                                     //We check the next root to see if they also need a swap
        }
    }
    extract() {                                             //Removes largest element at root and replaces it with last. Then re-sorts the heap
        if (this.arr.length < 1) return;                    //Error trying to extract from empty heap
        if (this.arr.length === 1) {                         //If we are at the last element get the value
            return (this.arr.pop());
        }
        var r = this.arr[0];                                //Obtains our root return value, being its the largest at root
        this.arr[0] = this.arr.pop();                       //Removes the root value in array, and appends the last to the front

        var i = 0;                                          //Sets up variables to re-sort the heap
        var temp;
        var leftChildInd;
        var rightChildInd;
        var largest;
        while (true) {                                        //Keep looping until the heap is resorted properly
            leftChildInd = (i * 2) + 1;                       //Finds left and right children index
            rightChildInd = (i * 2) + 2;
            largest = this.arr[leftChildInd] <= this.arr[rightChildInd] ? rightChildInd : leftChildInd;
            if (this.arr[i] < this.arr[largest]) {                        //If our value is less than the larger of two children swap them
                temp = this.arr[largest];
                this.arr[largest] = this.arr[i];
                this.arr[i] = temp;
            }
            else {
                break;                    //If the children are smaller we know we are in the right order and we break
            }
            i = largest;                  //We set the new index to the location of the swap, we then repeat checking its children
        }
        return (r);
    }
}

function readIn() {
    var heap = new maxHeap();                               //Creates a new heap object
    var i = 0;                                              //Starts at first index of array
    while (i < 10) {
        var input = prompt('Please enter a number: ');      //Takes input from user
        input = parseInt(input);                            //Converts to an integer
        while (isNaN(input)) {                                //If input is not integer we keep asking for an integer
            console.log('Not an integer!');
            input = prompt('Please enter a number: ')
            input = parseInt(input);
        }
        heap.insert(input);                                 //Once we know we have an integer we insert it into our heap
        i++;                                                //Increments index for next integer being passed
    }
    return (heap);                                           //Returns our heap
}

function main() {
    var heap = readIn();                                    //Sets the heap to our variable
    console.log();
    console.log("The heap is:",heap.arr);
    console.log();
    for (var i = 0; i < 10; i++) {                              //Loops through and removes largest element with each iteration
        let x = heap.extract();
        console.log(x);
    }
}

main();