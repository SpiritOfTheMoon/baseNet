import { GraphNode } from "./GraphNode";
import { graphInit } from "./graphInit";
import { Edge } from "./Edge";
import { sigmoid } from "./functionNode";

let graph: GraphNode[] = graphInit();

function baseNet(){
    let year: number = 100;

    for (let i: number = 1; i < year; i++){
        let used: boolean[] = [true, true];
        for (let j: number =0; j < 10; j++){
            used.push(false);
        }
        let queue: number [] = [0, 1];
        while (queue.length != 0){
            let graphNode: GraphNode = graph[queue[0]];
            queue.shift();
            let edges: Edge[] = graphNode.edges;
            if (graphNode.countNumber != 0 && graphNode.countNumber != 1){
                graphNode.output = sigmoid(graphNode.input);
            }
            for (let j: number =0; j < edges.length; j++){
                if (!used[edges[j].node]){
                    queue.push(edges[j].node);
                    used[edges[j].node] = true;
                }
                graph[edges[j].node].input += graphNode.input * edges[j].weight[i - 1];
            }
        }
        queue = [4];
        while (queue.length != 0){
            let graphNode: GraphNode = graph[queue[0]];
            queue.shift();
            let edges: Edge[] = graphNode.edges;
        }


    }
}
