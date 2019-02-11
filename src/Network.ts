import { Dataset } from "./Dataset";
import { GraphNode } from "./GraphNode";

export class Network {
    public graph: GraphNode[];
    public inputNode: number[];
    public outputNode: number[];
    public dataset: Dataset[];

    constructor(graph: GraphNode[], inputNode: number[], outputNode: number[], dataset: Dataset[]) {
        this.graph = graph;
        this.inputNode = inputNode;
        this.outputNode = outputNode;
        this.dataset = dataset;
    }

    /*
        * персептрон или - weight > 0, eps = 1, moment = 0.3
    */

    public graphCreate() {
        for (let i: number = 0; i < this.inputNode.length + this.outputNode.length; i++) {
            this.graph.push(new GraphNode(i));
        }
        for (let i: number = 0; i < this.inputNode.length; i++) {
            for (let j: number = 0; j < this.outputNode.length; j++) {
                let a = Math.random() + 1;
                this.graph[i].setEdge(this.inputNode.length + j, [a, a]);
                this.graph[this.inputNode.length + j].setEdge(i, []);
            }
        }


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