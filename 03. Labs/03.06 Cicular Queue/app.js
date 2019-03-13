//Anthony Rusignuolo, Michael Macari, Jon Lafleur
//Circular Queue

/*
Construct a circular queue of strings with maximum size 12 using a linked list to
make the following behavior work:
Until the user enters the entry quit, keep prompting the user for data to put
into the queue. Enqueue this data into the circular queue. If/when the circular
queue runs out of space, begin overwriting the beginning of the queue.
When the user enters quit, dequeue and output the contents of the queue to the
screen, with each entry on a line by itself. Be sure to only output the true
number of items in the queue, up to the maximum number.
 */

var prompt = require('prompt-sync')();

class circQueue{
    constructor(){
        this.queue = [];
    };

    enqueue(data, count){
        var ql = 12;
        if (this.queue.length < ql)
            this.queue.push(data);
        else
            this.queue[count % ql] = data;
    };

    dequeue(){
        return this.queue.shift();
    }
}


function main(){
    var Q = new circQueue;
    var data = '';
    var count = 0;
    do{
        data = prompt("Enter data to be put into the circular queue or type 'quit'. ");
        if (data == 'quit')
            break
        Q.enqueue(data, count);
        count++
    }
    while (true);
    while (Q.queue.length > 0)
        console.log(Q.dequeue());
}

main();