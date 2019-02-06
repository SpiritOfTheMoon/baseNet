import {Edge} from "./Edge"

export class GraphNode {
    public input: number;
    public delta: number;
    public countNumber:number;
    public edges: Edge[];
    public output: number;
    
    constructor(countNumber: number){
        this.input = 0;
        this.delta = 0;
        this.countNumber = countNumber;
        this.edges = [];
    }

    public setEdge(node: number, weight: number[]): void{
        this.edges.push(new Edge(node, weight));
    }
}