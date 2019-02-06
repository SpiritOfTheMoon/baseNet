export class Edge {
    public node: number;
    public weight: number[];
    public gradient: number;
    constructor(node: number, weight: number[]) {
        this.node = node;
        this.weight = weight;
        this.gradient = 0;
    }
}
