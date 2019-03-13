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

class node {
    //creates nodes for the circular queue with pointers to the next node within the queue
    constructor(data, index, next = null) {
        this.data = data;
        this.index = index;
        this.next = next;
    };
}

class CQLL {
    //circular queue linked list
    constructor(capacity = 12) {
        this.length = 0;
        this.head = null; //pointer for the front of the circular queue
        this.tail = null; //pointer for the end of the circular queue
        this.capacity = capacity;
    };

    append(node) {
        var current = this.head; //variable used to find the last node added to the list
        while (current.next != this.head) { //loop that iterates through the list to find the end or last node
            current = current.next;
        }
        node.next = this.head;
        current.next = node;
        this.tail = node;
    };

    insert(node){
        var index = node.index % this.capacity; //returns the position of where the newest item should be
        var prior = this.tail; //points to the node prior to the node you're planning to replace
        var current = this.head; //points to the node you're trying to replace
        for (var i = 0; i <= index; i++) {
            //to find the position of the node to be replaced
            if (i == index) {
                prior.next = node;
                node.next = current.next;
            }
            if (index == 0)
                this.head = node;
            prior = prior.next;
            current = current.next;
        }
    };

    enqueue(node){
    //this function will handle adding the nodes to the queue by calling other functions
        if (!this.head) {
            this.head = node;
            this.head.next = this.head;
            this.tail = this.head;
            this.length++;
        }
        else if (this.length < this.capacity) {
            this.append(node);
            this.length++;
        }
        else if (this.length = this.capacity)
            this.insert(node);
    };

    dequeue(){
        //removes and returns the nodes from the beginning of the list
        var current = this.head;
        this.tail.next = this.head.next;
        this.head = this.head.next;
        this.length--;
        return current.data;
    };
}

function main() {
    //main loop to take in, enqueue, then dequeue data.
    var Q = new CQLL();
    var data = '';
    var index = 0;
    do {
        data = prompt("Enter data to be put into the circular queue or type 'quit': ");
        if (data === 'quit' || data === 'q')
            break;

        var item = new node(data, index);
        Q.enqueue(item);
        index++
    } while (true);

    while (Q.length > 0)
        console.log(Q.dequeue());
}

main();