class Packet {
    constructor(originRouter = null, SN = null, cost = 0, TTL = 10) {
        this.originRouter = originRouter;
        this.originID = originRouter.ID;            //Router origin ID
        this.SN = SN;                               //Sequence number to be incremented on each pass  each original packet should have higher sequence number then previous
        this.TTL = TTL;                             //Time to live defaulted to 10. Decrements every time its forwarded
        this.sentFromRouter = originRouter;
        this.netHist = {};                          //A list that indicates each reachable network (indicated by the network name stored in the router's string).
        this.totalCost = cost;
    }
}

module.exports = Packet;