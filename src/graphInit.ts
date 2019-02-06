import { GraphNode } from "./GraphNode";

export function graphInit(): GraphNode[] {
    let graph: GraphNode[] = [];
    for (let i: number = 0; i < 5; i++) {
        graph.push(new GraphNode(i));
    }
    graph[0].setEdge(2, [0.1, 0.1]);
    graph[0].setEdge(3, [0.1, 0.1]);
    graph[1].setEdge(2, [0.1, 0.1]);
    graph[1].setEdge(3, [0.1, 0.1]);
    graph[2].setEdge(4, [0.1, 0.1]);
    graph[3].setEdge(4, [0.1, 0.1]);
    graph[2].setEdge(0, [0]);
    graph[2].setEdge(1, [0]);
    graph[3].setEdge(0, [0]);
    graph[3].setEdge(1, [0]);
    graph[4].setEdge(2, [0]);
    graph[4].setEdge(3, [0]);
    return graph;
}