#include <iostream>
#include <string>
#include <sstream>
#include <fstream>
#include <vector>
#include <map>

using namespace std;

class LSP {
private:
	string routerID;
	string origID;
	long long sequenceNum;
	long long TTL;
	map<string, int> reachableNetworks; //string = name, long long = cost

	friend class Router;
public:
	LSP(string ID, string netID, long long sequenceNum, map< string, pair< long long, string > >& routingTable, long long TTL = 10) : routerID(ID), origID(netID), sequenceNum(sequenceNum), TTL(TTL) {
		//INITIALIZE reachableNetworks
		for (auto z : routingTable)
			this->reachableNetworks[z.first] = z.second.first;
	}

	bool decTTL(){
		return (--TTL <= 0);
	}

	long long getTTL(){
		return TTL;
	}

};

class Router {
private:
	string ID;
	string networkName;
	long long cost;
	bool start;
	bool networkChanged;
	long long seqCount;
	map< string, pair< long long, string > > routingTable; //netName, costTONETWORK, nextHop
	map<string, int> currSeqNum; //string = orig Router ID, int = Highest sequence Num
	map<Router*, pair<int, int>> adjList;


public:
	Router(string ID, string netID, long long cost) : ID(ID), networkName(netID), cost(cost), start(true), networkChanged(false), seqCount(1)  {}

	void receivePacket(LSP p){

		if (start){
			//cout << p.getTTL() << '\n';
			if (p.decTTL() || (currSeqNum.find(p.origID) != currSeqNum.end() && currSeqNum[p.origID] >= p.sequenceNum)) { //TTL zero? Is it an old LSP?
				return;
			}
			else {
				//Compare to current information
				currSeqNum[p.origID] = p.sequenceNum;
				for (auto &z : adjList){
					if (z.first->ID == p.routerID){
						z.second.second = 0;
						break;
					}
				}
				

				networkChanged = false;
				for (auto z : p.reachableNetworks){
					if (routingTable.find(z.first) == routingTable.end()){
						routingTable[z.first] = make_pair(2147483647, " ");
					}
					if (routingTable[z.first].first > z.second + routingTable[p.origID].first){
						routingTable[z.first] = pair<long long, string>(z.second + routingTable[p.origID].first, p.routerID);
						networkChanged = true;
					}
				}

				if (networkChanged)
					updateNetwork();
				//Send LSP out to each directly connected router
				for (auto &z : adjList)
					z.first->receivePacket(p);

			}
		}
		else{
			for (auto &z : routingTable){
				if (z.first == networkName){
					z.second.first = 2147483647;
					z.second.second = "Off";
				}
					

			}
		}

	}

	void originatePacket() {
		/*
		This function will perform two functions. It should cause the router to generate an LSP packet based on the current state of the network as it understands it, and send it to all directly connected routers. Before it sends the packet, however, it should also increment a "tick" counter and consider if there are any directly connected routers from which it has not received a packet in 2 ticks. If that occurs, the router should alter its graph to reflect that the cost of the link to the other router is now infinity (or some arbitrarily huge number that you choose to represent infinity, if your language does not have a special infinity value.).
		*/
		if (start){
			/*with each router, go down the list of adjacent routers and generate a LSP and number them
			call receivepacket for each LSP starting with 1 to n
			*/
			LSP* packet;
			for (auto &z : adjList){
				packet = new LSP(ID, networkName, seqCount, routingTable, 10);
				z.second.second++;
				if (z.second.second >= 2)
					z.second.first = 2147483647; //INFINITY
				z.first->receivePacket(*packet);
				seqCount++;
			}
		}
		else{
			for (auto &z : routingTable){
				z.second.first = 2147483647;
				z.second.second = "Off";

			}
		}
	}

	void updateNetwork(){
		for (auto &z : routingTable){
			if (z.second.second == ""){
				string netToReach = z.first;
				z.second.first = 2147483647;
				for (auto &y : adjList){
					//CHECK IF THESE ROUTERS CAN REACH THAT NET.
					for (auto &x : y.first->routingTable){
						if (x.first == netToReach){
							//z.second.first = x.second.first +
							z.second.second = y.first->getID();
						}
					}
				}
			}
		}

	}

	void addAdj(Router* r, int adjCost){
		adjList[r] = make_pair(adjCost, 0);
		routingTable[r->getNetworkName()] = pair<long long, string>(r->getCost() + adjCost, " ");
	}

	string getID(){
		return ID;
	}

	string getNetworkName(){
		return networkName;
	}

	long long getCost(){
		return cost;
	}

	void startOn(){
		start = true;
	}

	void startOff(){
		start = false;
	}

	//PRINT ROUTING TABLE
	friend ostream& operator <<(ostream& s, const Router& r){
		for (auto z : r.routingTable){
			pair<long long, string> temp = z.second;
			s << z.first << ", " << temp.first << ", ";
			if (temp.second == " ")
				s << "direct\n";
			else
				s << temp.second << '\n';
		}
		return s;
	}

};

int main(){
	string in;
	stringstream ss;
	string routerID, networkName;
	map<string, Router*> routers;
	Router* currRouter;
	ifstream f("infile.dat");
	while (getline(f, in)){
		stringstream ss(in);
		if (in[0] == '\t' || in[0] == ' '){
			//skip in iteration 1
		}
		else{

			long long cost;
			ss >> routerID >> networkName;
			if (!ss.eof())
				ss >> cost;
			else
				cost = 1;
			routers.insert(pair<string, Router*>(routerID, new Router(routerID, networkName, cost)));
			currRouter = routers[routerID];
		}
	}
	f.close();
	currRouter = routers[routerID];
	//ITERATION2 : Set up Adjacency List
	ifstream g("infile.dat");
	while (getline(g, in)){
		stringstream ss(in);
		if (in[0] == '\t' || in[0] == ' '){
			string routerID;
			long long cost;
			ss >> routerID;
			if (!ss.eof())
				ss >> cost;
			else
				cost = 1;
			//Create a link from currRouter to this link.
			currRouter->addAdj(routers[routerID], cost);
		}
		else{
			string routerID;
			ss >> routerID;
			currRouter = routers[routerID];
		}
	}
	g.close();

	cout << "The network is set up. What would you like to do?\n";
	do{
		char choice;
		cout << "C:\tContinue\nP:\tPrint the Routing Table\nS:\tShut Down a Router\nT:\tStart up a Router\nQ:\tQuit\n";
		cin >> choice;
		if (choice == 'Q' || choice == 'q')
			break;
		switch (choice){
		case 'C':
		case 'c':
			//call the originatePacket() function on every router in whatever order you choose. Then prompt again.
			for (auto z : routers)
				z.second->originatePacket();
			break;
		case 'P':
		case 'p':
			cout << "Enter a Router-ID:\t";
			cin >> in;
			//If the user chooses to print the routing table, display the table in the following format, and then prompt again:
			for (auto z : routers)
			if (z.second->getID() == in)
				cout << *(z.second) << '\n';
			break;
		case 'S':
		case 's':
			cout << "Enter a Router-ID:\t";
			cin >> in;
			//change the router object so that it does not send out any LSP or do anything in response to originatePacket or receivePacket function calls.
			for (auto &z : routers)
			if (z.second->getID() == in)
				z.second->startOff();
			break;
		case 'T':
		case 't':
			cout << "Enter a Router-ID:\t";
			cin >> in;
			//If the user starts up a router, change the router object so it once again behaves normally. (Routers initially are started, not stopped.)
			for (auto &z : routers)
			if (z.second->getID() == in)
				z.second->startOn();
			break;

		default:
			break;
		}
		cout << "Please choose an option:\n";
	} while (1);
}