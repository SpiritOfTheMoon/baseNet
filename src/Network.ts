import { Dataset } from "./Dataset";
import { GraphNode } from "./GraphNode";

export class Network {
    public graph: GraphNode[];
    public inputNode: number[];
    public outputNode: number[];
    public dataset: Dataset[];

    constructor() {
        this.graph = [];
        this.inputNode = [];
        this.outputNode = [];
        this.dataset = [];
    }

    public graphCreate() {
        for (let i: number = 0; i < 5; i++) {
            this.graph.push(new GraphNode(i));
        }
        this.inputNode = [0, 1];
        this.outputNode = [4];
        this.dataset = [{
            set: [0, 1],
            answer: 1
        }, {
            set: [1, 0],
            answer: 1
        }, {
            set: [0, 0],
            answer: 0
        }, {
            set: [1, 1],
            answer: 1
        }]
        let a = Math.random();
        this.graph[0].setEdge(2, [a, a]);
        a = Math.random();
        this.graph[0].setEdge(3, [a, a]);
        a = Math.random();
        this.graph[1].setEdge(2, [a, a]);
        a = Math.random();
        this.graph[1].setEdge(3, [a, a]);
        a = Math.random();
        this.graph[2].setEdge(4, [a, a]);
        a = Math.random();
        this.graph[3].setEdge(4, [a, a]);
        this.graph[2].setEdge(0, [0]);
        this.graph[2].setEdge(1, [0]);
        this.graph[3].setEdge(0, [0]);
        this.graph[3].setEdge(1, [0]);
        this.graph[4].setEdge(2, [0]);
        this.graph[4].setEdge(3, [0]);
    }

    public graphInit(i: number) {
        for (let j: number = 0; j < this.graph.length; j++) {
            this.graph[j].input = 0;
            this.graph[j].output = 0;
        }
        for (let j: number = 0; j < this.inputNode.length; j++) {
            this.graph[this.inputNode[j]].input = this.dataset[i].set[j];
            this.graph[this.inputNode[j]].output = this.dataset[i].set[j];
        }

    }

}