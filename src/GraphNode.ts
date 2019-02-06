import {Edge} from "./Edge"

export class GraphNode {
    private countNumber:number;
    private edges: Edge[];
    
    constructor(countNumber: number){
        this.countNumber = countNumber;
        this.edges = [];
    }

    public setEdge(node: number, weight: number[]): void{
        this.edges.push(new Edge(node, weight));
    }

    public getEdges(): Edge[]{
        return this.edges;
    }

    public setCountNumber(countNumber: number): void{
        this.countNumber = countNumber;
    }
    public getCountNumber(): number{
        return this.countNumber;
    }
}