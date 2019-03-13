// Sorted Set Lab
// By: Jonathan Lafleur, Michael Macari and Anthony Rusignuolo

var fs = require("fs");
var prompt = require("prompt-sync")();

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class SortedSet {
    constructor() {
        this.root = null;
    }

    isEmpty() {
        return this.root === null;
    }

    add(value, node = this.root) {
        if (node === this.root && this.isEmpty()) {
            this.root = new Node(value);
            return;
        }

        if (!node)
            return new Node(value);

        if (value < node.data) {
            let leftChild = this.add(value, node.left);
            node.left = leftChild;
        }
        else if (value > node.data) {
            let rightChild = this.add(value, node.right);
            node.right = rightChild;
        }
        return node;
    }

    remove(value, node = this.root) {
        if (!node) {
            return;
        }
        if (value < node.data) {
            node.left = this.remove(value, node.left);
        }
        else if (value > node.data) {
            node.right = this.remove(value, node.right);
        }
        else {
            if (!node.left)
                return node.right;
            if (!node.right)
                return node.left;

            node.data = this.maxVal(node.left);
            node.left = this.remove(node.data, node.left);
        }
        return node;
    }

    maxVal(node = this.root) {
        let maxV = node.data;
        while (node.right) {
            node = node.right;
            maxV = node.data;
        }
        return maxV;
    }

    contains(value, node = this.root) {
        if (node === this.root && this.isEmpty()) {
            console.log("The sorted set contains nothing");
        }

        if (!node)
            return false;

        if (node.data === value)
            return true;
        else if (value < node.data)
            return this.contains(value, node.left);
        else
            return this.contains(value, node.right);
    }
}


function readIn() {
    try {
        return fs.readFileSync('./infile.dat', 'utf8').split(', ');
    }
    catch (error) {
        return "infile.dat doesn't exist";
    }
}

function main() {
    //Read numbers in from infile.dat
    let numbers = readIn();
    if (numbers === "infile.dat doesn't exist") {
        console.log(numbers);
        return;
    }

    //Create Sorted Set
    let sorted_set = new SortedSet();

    //Insert all numbers into the sorted set
    numbers.forEach(function (element) {
        element = parseFloat(element);
        if (!isNaN(element)) {
            sorted_set.add(element);
        }
    });

    //Prompt user for a value and search the tree to determine if the value is found
    console.log("Enter anything that is not a number to exit.");
    do {
        let user_input = prompt("Enter a value to see if the file contains it: ");
        user_input = parseFloat(user_input);
        if (isNaN(user_input)) {
            console.log("Exiting the program.");
            return;
        }

        if (sorted_set.contains(user_input))
            console.log("Yes");
        else
            console.log("No");
    } while (true)

    numbers.forEach(function (element) {
        sorted_set.remove(element);
    });
}

main();