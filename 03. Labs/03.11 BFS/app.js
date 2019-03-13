// BFS Lab
// By: Jonathan Lafleur, Michael Macari and Anthony Rusignuolo
var fs = require('fs');

class Graph {
    constructor(numNodes = null, numEdges = null) {
        this.numNodes = parseInt(numNodes);
        this.numEdges = parseInt(numEdges);
    }

    fillGraph(arr) {
        this.adjMatrix = [];
        for (let i = 0; i < this.numNodes; i++) {
            let t = []
            for (let j = 0; j < this.numNodes; j++) {
                t.push(0);
            }
            this.adjMatrix.push(t);
        }

        for (let i = 0; i < this.numEdges; i++) {
            let [a, b] = arr[i].split(' ');
            a = parseInt(a);
            b = parseInt(b);
            this.adjMatrix[a][b] = 1;
        }
    }

    BFS(startNode) {
        let visited = [];
        for (let i = 0; i < this.numEdges; i++) {
            visited.push(false);
        }

        let queue = [];
        visited[startNode] = true;
        queue.push(startNode);
        let num = 1;

        while (queue.length != 0) {
            let node = queue.shift();
            console.log(node, num++);
            for (let i = 0; i < this.numNodes; i++) {
                if (this.adjMatrix[node][i] === 1 && !visited[i]) {
                    visited[i] = true;
                    queue.push(i);
                }
            }
        }
    }
}

function main() {
    let file = fs.readFileSync('infile.dat', 'utf8').split(/\r?\n/);
    let line1 = file.shift().split(' ');
    let myGraph = new Graph(line1[0], line1[1]);

    myGraph.fillGraph(file);

    myGraph.BFS(0);
}

main();