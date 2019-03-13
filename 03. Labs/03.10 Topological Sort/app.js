// Topological Sort Lab
// By: Jonathan Lafleur, Michael Macari and Anthony Rusignuolo
var fs = require('fs');

class graph {
    constructor(numNodes = null, numEdges = null) {
        this.numNodes = numNodes;
        this.numEdges = numEdges;
        this.graph = {};
        this.indegree = {};
        this.indegree1 = {};
    }


    fillArr(arr) {
        var count = 0;
        for (var i = 0; i < this.numEdges; i++) {
            var [dragon, dragon1] = arr[i].split(' ');
            if (this.graph[dragon] === undefined) {
                this.graph[dragon] = [];
                count++;
            }

            if (this.graph[dragon1] === undefined) {
                this.graph[dragon1] = [];
                count++;
            }

            this.graph[dragon].push(dragon1);

            if (this.indegree[dragon] === undefined) {
                this.indegree[dragon] = 0;
            }

            if (this.indegree[dragon1] === undefined) {
                this.indegree[dragon1] = 1;
            }
            else {
                this.indegree[dragon1]++;
            }
        }
        if (count != this.numNodes) {
            return "Mismatch nodes";
        }
    }

    topologicalSort1(indegree) {
        var res = {};
        var i = 0;
        console.log('Topological sort 1');
        while (Object.keys(indegree).length > 0) {
            let trigger;
            let temp = false;
            for (trigger in indegree) {
                if (!indegree[trigger]) {
                    temp = true;
                    break;
                }
            }
            if (!temp) {
                return (true);
            }
            this.graph[trigger].forEach(el => indegree[el]--);
            res[trigger] = i;
            delete indegree[trigger];
            i++;
        }
        return (res);
    }

    topologicalSort2(indegree) {
        var res = {};
        var i = 0;
        console.log('Topological sort 2');
        while (Object.keys(indegree).length > 0) {
            let trigger;
            let temp = false;
            var arr = [];
            for (trigger in indegree) {
                //console.log(trigger === '0');
                if (!indegree[trigger]) {
                    temp = true;
                    arr.push(trigger);
                }
            }
            if (!temp) {
                return (true);
            }
            for (let node of arr) {
                this.graph[node].forEach(el => indegree[el]--);
                res[node] = i;
                delete indegree[node];
                i++;
            }
        }
        return (res);
    }
}

function main() {
    var inFile = fs.readFileSync('infile.dat', 'utf8');
    var lineSplit = inFile.split(/\r?\n/);
    var nodeNumbersEdges = lineSplit[0];

    var numberOfNodes = nodeNumbersEdges.split(' ')[0];
    var numberOfEdges = nodeNumbersEdges.split(' ')[1];
    lineSplit.splice(0, 1);
    if (lineSplit.length != numberOfEdges) {
        console.log("Improper number of edges");
        return;
    }

        var G = new graph(numberOfNodes, numberOfEdges);
        //G.create2Darr();
        if (G.fillArr(lineSplit) == "Mismatch nodes") {
            console.log("Improper number of nodes");
            return;
        }

        //console.log(G.indegree);
        //console.log(G.graph);
        var x = {};
        var x2 = {};
        for (var i in G.indegree) {
            x[i] = G.indegree[i];
            x2[i] = G.indegree[i];
        }

        var y1 = G.topologicalSort1(x);
        if (y1 === true) {
            //console.log(y);
            console.log("The graph is cyclic");
        }
        else {
            console.log(y1);
        }

        var y2 = G.topologicalSort2(x2);
        if (y2 === true) {
            //console.log(y);
            console.log("The graph is cyclic");
        }
        else {
            console.log(y2);
        }
}

main();