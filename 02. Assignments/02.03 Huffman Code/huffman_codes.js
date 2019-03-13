//Anthony Rusignuolo, Michael Macari, Jon Lafleur
//Huffman Codes

var prompt = require('prompt-sync')();
var fs = require('fs');


class priorityQueue {
    constructor() {
        this.queue = [];
    };

    enqueue(node) {
        //binary search guy
        if (this.queue.length === 0 || this.queue[this.queue.length - 1].frequency <= node.frequency)
            this.queue.push(node);
        else if (node.frequency <= this.queue[0].frequency)
            this.queue.unshift(node);
        else {
            var l = 0;
            var r = this.queue.length - 1;

            while (true) {
                var mid = Math.floor(l + ((r - l) / 2));
                if (node.frequency >= this.queue[mid].frequency && node.frequency <= this.queue[mid + 1].frequency) {
                    this.queue.splice(mid + 1, 0, node);
                    break;
                }
                if (node.frequency <= this.queue[mid].frequency && node.frequency >= this.queue[mid - 1].frequency) {
                    this.queue.splice(mid, 0, node);
                    break;
                }
                if (node.frequency >= this.queue[mid].frequency)
                    l = mid + 1;
                else if (node.frequency <= this.queue[mid].frequency)
                    r = mid - 1;
            }
        }
    };

    dequeue() {
        if (this.queue.length == 0)
            return ("Is empty");
        else
            return (this.queue.shift());
    };
}

class huffman_node {
    constructor(frequency, id, symbol = null, left = null, right = null, parent = null) {
        this.frequency = frequency;
        this.id = id;
        this.symbol = symbol;
        this.parent = parent;
        this.left = left;
        this.right = right;
    };

    parentUpdate(parent) {
        this.parent = parent;
    }
}

function readIn(folderPath) {
    /* Step 1: Take text input from a file named "infile.dat" and outputs
    a list with two items: a dictionary containing letters and their rate
    of occurrence and a list with frequencies (percentages) and letters */
    if (folderPath === '')
        folderPath = './infile.dat';

    try {
        var infile = fs.readFileSync(folderPath, "utf8");
    }
    catch (error) {
        return ("The file doesn't exist");
    }

    var frequencies = {};
    var occur = {};
    var letters = RegExp('[^A-Za-z]');
    for (var i of infile) {
        if (letters.test(i))
            continue;
        if (i in frequencies) {
            frequencies[i] += 1;
            occur[i] += 1;
        }
        else {
            frequencies[i] = 1;
            occur[i] = 1;
        }
    }

    var total_chars = 0;
    for (var key in frequencies)
        total_chars += frequencies[key];
    for (var key in frequencies)
        frequencies[key] = (frequencies[key] / total_chars) * 100;
    var items = Object.keys(frequencies).map(function (key) {
        return [frequencies[key], key];
    });
    return [occur, items];
}

function genTree(input) {
    //generates a huffman tree
    var q = new priorityQueue();
    for (var i = 0; i < input.length; i++) {
        var node = new huffman_node(input[i][0], i, input[i][1]);
        q.enqueue(node);
    }

    var l = null;
    var r = null;
    var par = null;
    while (q.queue.length > 1) {
        l = q.dequeue();
        r = q.dequeue();
        par = new huffman_node((l.frequency + r.frequency), i++, null, l, r);
        l.parentUpdate(par);
        r.parentUpdate(par);
        q.enqueue(par);
    }
    return q.queue[0];
}

function genTable(htree) {
    function genTableHelper(node, huffCode) {
        if (node.symbol != null)
            return [[node.symbol, node.frequency, huffCode]];
        else
            return genTableHelper(node.left, huffCode + '0').concat(genTableHelper(node.right, huffCode + '1'));
    }
    return genTableHelper(htree, '')
}

function output(table, occur) {
    var string = 'Symbol    Frequency   Huffman Codes\n';
    for (var i = 0; i < table.length; i++) {
        var g = table[i][1].toFixed(2);
        string += table[i][0] + '         ' + g + ' '.repeat(12 - String(g).length) + table[i][2] + '\n';
    }

    var totalBits = 0;
    for (var key = 0; key < table.length; key++)
        totalBits += occur[table[key][0]] * table[key][2].length;
    string += '\nTotal bits: ' + totalBits;

    fs.writeFile('outfile.dat', string, (err) => {
        if (err) throw err;
        console.log('File saved!');
    })
}

function main() {
    var folderPath = prompt('Enter the path to your "infile.dat" to be loaded or nothing if "infile.dat" is in your current directory: ');
    var input = readIn(folderPath);
    if (input == "The file doesn't exist") {
        console.log("The file doesn't exist");
        return;
    }
    var htree = genTree(input[1]);
    var table = genTable(htree).sort(function (a, b) { return b[1] - a[1] });
    output(table, input[0]);
}

main();