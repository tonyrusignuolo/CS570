const Packet = require('./packet');


class Router {

    constructor(ID = null, networkName = null) {
        this.ID = ID;
        this.networkName = networkName;
        this.adjList = {};              // Router_ID (string) : Router (object)
        this.connectedRouters = {};
        this.SN = 0;
        this.status = true;             // Router on or off
        this.routingTable = {};         // Router_ID (string) : {router: Router, cost: number , outgoing_link: Router, last_seen_SN: number, last_tick: number} (struct / obj)

    }

    initConnected(router, cost) {                   // Takes in router as the actual router object, cost is the cost
        this.adjList[router.ID] = {router : router, cost: cost};           // Sets the routers ID as the key and the value is the router object
        this.routingTable[router.ID] = { router: router, cost: cost, outgoing_link: router.ID, last_seen_SN: 0, last_tick: 0 };    // Key is router ID (string) : value is struct / object
        this.connectedRouters[router.ID] = cost;
    }

    originatePacket() {
        if (this.status) {
            for (let rid in this.adjList) {                         // Iterates through adjacency list of routers for current router
                let packet = new Packet(this, ++this.SN, this.adjList[rid].cost);             // Creates a new packet passing it in THIS router object and this Sequence number
                if (++this.routingTable[rid].last_tick >= 2)                                       // When will this occur, why would it originate a packet and send it to a router in the adjacency list twice
                    this.routingTable[rid].cost = Infinity;

                this.adjList[rid].router.receivePacket(packet);            // Sends the packet to the router in the adjacency list
            }
            this.SN++;                                              // Increments this routers sequence number
        }
        else {
            for (let rid in this.routingTable) {
                this.routingTable[rid].cost = Infinity;            // Sets its cost to infinity
                this.routingTable[rid].outgoing_link = 'off';      // Sets the routers outgoing link to off
            }
        }
    }

    receivePacket(packet) {             // Takes in packet and in packet is the ID of the router that sent it
        console.log("Received packet at router " + this.ID + " from " + packet.sentFromRouter.ID);
        console.log("Packet Origin ID: " + packet.originID + " it COST: " + packet.totalCost);
        if (this.status){
            packet.netHist[packet.sentFromRouter.ID] = [this.ID, this.routingTable[packet.sentFromRouter.ID].cost];
            if (--packet.TTL <= 0 || (this.routingTable.hasOwnProperty(packet.originID) && this.routingTable[packet.originID].last_seen_SN >= packet.SN) || this.ID === packet.originID){
                console.log("packet.netHist: " + packet.netHist);
                console.log("packet.totalCost: " + packet.totalCost);
                console.log("Packet Discarded");
                return; // discard packet
            }
            else {
                if (this.routingTable.hasOwnProperty(packet.originID)){               // If this receiving router has the router that sent the packet in its routing table
                    this.routingTable[packet.originID].last_seen_SN = packet.SN;      // Set the last seen SN of the router in the routing table to the SN of the router it came from
                    this.routingTable[packet.originID].last_tick = 0;
                }
                else {
                    this.routingTable[packet.originID] = {
                        router: packet.originRouter,
                        cost: Infinity,              //*****************************getCost(),
                        outgoing_link: packet.sentFromRouter,
                        last_seen_SN: packet.SN,
                        last_tick: packet.last_tick
                    };
                    //this.bestPacketFrom[packet.originID] = packet;
                }
                this.routingTable[packet.originID].cost = this.getCost(packet);
                this.forwardPacket(packet);
            }
        }
    }

    forwardPacket(packet) {
        for (let rid in this.adjList) {
            if (rid !== packet.sentFromRouter.ID) {
                let copyPacket = Object.assign({}, packet);
                copyPacket.sentFromRouter = this;
                copyPacket.totalCost += this.adjList[rid].cost;
                this.adjList[rid].router.receivePacket(copyPacket);
            }
        }
    }

    getCost(packet){
        if(this.routingTable[packet.originID].cost > packet.totalCost || this.routingTable[packet.originID].cost === null){
            let cost = packet.totalCost;
            return(cost);
        }
        else{
            return(this.routingTable[packet.originID].cost);
        }
    }

    printRoutingTable() {
        console.log('Network'.padEnd(15),
            'Outgoing Link'.padEnd(15),
            'Cost'.padEnd(5));
        for (let rid in this.routingTable) {
            if (this.routingTable[rid].cost !== Infinity && rid !== this.ID) {
                console.log(this.ID.padEnd(15),
                    this.routingTable[rid].outgoing_link.padEnd(15),
                    this.routingTable[rid].cost.toString().padEnd(5));
            }
        }
    }

    shutDownRouter() {
        this.status = false;
        console.log('Router', this.ID, 'has been shutdown.');
    }

    startUpRouter() {
        this.status = true;
        console.log('Router', this.ID, 'has been started up.');
    }
}
module.exports = Router;