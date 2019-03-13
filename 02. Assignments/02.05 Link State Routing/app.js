// Link State Routing
// By: Jonathan Lafleur, Michael Macari and Anthony Rusignuolo

const fs = require('fs');
const prompt = require('prompt-sync')();
const Packet = require('./packet.js');
const Router = require('./router.js');
const network = require('./network.js');

function readIn() {
    let routerList = {};                                         //Set of our routers in our network
    let infile = fs.readFileSync('infile.dat', 'utf8');
    let lineSplit = infile.split(/\r?\n/).map(a => a.split(/\s+/));
    lineSplit.forEach(i => {
        if (i[0] !== '')
            routerList[i[0]] = new Router(i[0], i[1]);          // i[0] = router ID, puts router ID as key, router object is value, pass ID and network name into router object
    });
    let currentID;
    lineSplit.forEach(i => {
        if (i[0] !== '') currentID = i[0]; //Temporary variable to store current ID
        else {

            let cost = i[2] ? Number(i[2]) : 1;
            routerList[currentID].initConnected(routerList[i[1]], cost);
        }
    });
    return routerList;
}

function updateNetwork(routerList){
    let myNetwork = new network();
    Object.values(routerList).forEach(a => myNetwork.addNode(a.ID, a.connectedRouters));
    myNetwork.finishCreatingGraph();

    for(let s in routerList){
        myNetwork.dijkstra(s);
        console.log(myNetwork.graph[s]);
        for(let x in myNetwork.graph[s]){
            if(s !== x){
                routerList[s].routingTable[x].outgoing_link = x;
                routerList[s].routingTable[x].cost = myNetwork.graph[s][x];
            }
        }
    }
    return(myNetwork);
}

function main() {
    let routerList = readIn();     //Read In infile.dat
    //routerList['0'].originatePacket();
    for(let x in routerList) {
        routerList[x].originatePacket();
    }


    //  for(let v of x.V){
    //      console.log(v);
    //      x.dijkstra(v);
    // }


    let networkGraph = updateNetwork(routerList);
    //console.log(routerList['0'].routingTable);
    //console.log(networkGraph.graph['0']);


    // routerList['0'].routingTable['1'].outgoing_link = '1';
    // routerList['0'].routingTable['1'].cost = networkGraph.graph['0']['1'];
    //
    routerList['0'].printRoutingTable();

    // myNetwork.dijkstra('0');
    //
    //
    // myNetwork.dijkstra('2');
    // console.log(myNetwork.graph['0']);
    // console.log(myNetwork.graph['0']['1']);



    //console.log(routerList['1'].routingTable);


    console.log('The network is set up. What would you like to do?');
    while (true) {
        console.log();
        console.log('Enter "C" to continue\n      "Q" to quit\n      "P" followed by the router\'s id number to print the routing table of a router\n      "S" followed by the id number to shut down a router\n      "T" followed by the id to start up a router');
        let userInput = prompt().split(' ');
    
        switch (userInput[0].toUpperCase()) {
            case "C":
                //TODO: Originate Packet for each router
                for (rid in routerList) {
                    routerList[rid].originatePacket();
                }
                break;
            case "Q":
                return; // Quit the program
            case "P":
                //TODO: Print the routing table for the listed router
                if (routerList.hasOwnProperty(userInput[1]))
                    routerList[userInput[1]].printRoutingTable();
                else
                    console.log("The router entered does not exist. Try again.");
                break;
            case "S":
                if (routerList.hasOwnProperty(userInput[1]))
                    routerList[userInput[1]].shutDownRouter();
                else
                    console.log("The router entered does not exist. Try again.");
                break;
            case "T":
                if (routerList.hasOwnProperty(userInput[1]))
                    routerList[userInput[1]].startUpRouter();
                else
                    console.log("The router entered does not exist. Try again.");
                break;
            default:
                console.log("Invalid input. Try again.");
                break;
        }
    }
}

main();