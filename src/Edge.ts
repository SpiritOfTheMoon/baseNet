import { GraphNode } from "./GraphNode";

export class Edge{
    private node:number;
    private weight: number[];
    constructor(node: number, weight: number[]){
        this.node= node;
        this.weight = weight;
    }
    public setWeight(weight: number){
        this.weight.push( weight);
    }

    public setNode (node: number){
        this.node = node;
    }

    public getWeight(key: number): number{
        return this.weight[key];
    }

    public getWeights():number[]{
        return this.weight;
    }

    public getNode(): number{
        return this.node;
    }
}