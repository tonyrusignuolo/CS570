class Network {
    constructor() {
        this.V = new Set();
        this.graph = {};
    }

    addNode(routerID, adj_list) {
        this.V.add(routerID);
        this.graph[routerID] = adj_list;
    }

    finishCreatingGraph() {
        for (let v of Object.keys(this.graph))
            Object.keys(this.graph).forEach(k => this.graph[v][k] = this.graph[v][k] ? this.graph[v][k] : Infinity);
    }

    minDistance(dist, sptSet) {
        let min = Infinity;
        let min_index;
        for (let v of this.V) {
            if (dist[v] < min && sptSet[v] == false) {
                min = dist[v];
                min_index = v;
            }
        }
        return min_index;
    }

    dijkstra(src) {
        let dist = {}, sptSet = {};
        for (let v of this.V) {
            dist[v] = Infinity;
            sptSet[v] = false;
        }
        dist[src] = 0;
        for (let k of this.V) {
            let u = this.minDistance(dist, sptSet);
            sptSet[u] = true;
            
            for (let v of this.V) {
                if (this.graph[u][v] > 0 && !sptSet[v] && dist[v] > dist[u] + this.graph[u][v])
                    dist[v] = dist[u] + this.graph[u][v]
            }
        }
        this.graph[src] = dist;
    }
}

module.exports = Network;