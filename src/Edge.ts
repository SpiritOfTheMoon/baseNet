import { GraphNode } from "./GraphNode";

export class Edge{
    private node:GraphNode;
    private weight: number;
    constructor(node: GraphNode, weight: number){
        this.node= node;
        this.weight = weight;
    }
    public setWeight(weight: number){
        this.weight = weight;
    }

    public setNode (node: GraphNode){
        this.node = node;
    }

    public getWeight(): number{
        return this.weight;
    }

    public getNode(): GraphNode{
        return this.node;
    }
}