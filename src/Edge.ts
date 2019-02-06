import { GraphNode } from "./GraphNode";

export class Edge{
    public node: number;
    public weight: number[];
    constructor(node: number, weight: number[]){
        this.node= node;
        this.weight = weight;
    }
}