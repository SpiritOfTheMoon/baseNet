import { Network } from "./Network";
import { GraphNode } from "./GraphNode";
import { Edge } from "./Edge";
import { sigmoid, derivativeSigmoid, linear, leap } from "./functionNode";

const eps = 1;
const moment = 0;

let used: boolean[] = new Array(10);
let queue: number[] = [];


export function inOutFunction(network: Network, i: number) {
    used.fill(false);
    network.inputNode.forEach((value: number) => {
        queue.push(value);
        used[value] = true;
    });

    while (queue.length !== 0) {
        const graphNode: GraphNode = network.graph[queue[0]];
        const edges: Edge[] = graphNode.edges;
        queue.shift();
        if (network.inputNode.indexOf(graphNode.countNumber) == -1) {
            graphNode.output = leap(graphNode.input);
        }
        for (let j: number = 0; j < edges.length; j++) {
            if (!used[edges[j].node]) {
                queue.push(edges[j].node);
                used[edges[j].node] = true;
            }
            if (edges[j].weight[i]) {
                network.graph[edges[j].node].input += graphNode.output * edges[j].weight[i];
            }
        }

    }

}

export function deltaFunction(network: Network, i: number, ns: number) {
    used.fill(false);
    network.outputNode.forEach((value: number) => {
        queue.push(value);
        used[value] = true;
    })
    while (queue.length != 0) {
        const graphNode: GraphNode = network.graph[queue[0]];
        queue.shift();
        const edges: Edge[] = graphNode.edges;

        if (network.outputNode.indexOf(graphNode.countNumber) !== -1) {
            graphNode.delta = (network.dataset[ns].answer - graphNode.output);
        }
        else {
            let delta: number = 0;
            edges.forEach((value: Edge) => {
                if (used[value.node] && value.weight[i]) {
                    delta += value.weight[i] * network.graph[value.node].delta;
                }
            });
            graphNode.delta = delta;
        }
        for (let j: number = 0; j < edges.length; j++) {
            if (used[edges[j].node]) {
                edges[j].gradient = graphNode.delta * graphNode.output;
            }
            else {
                queue.push(edges[j].node);
                used[edges[j].node] = true;
            }
        }
    }
}

export function weightFunction(network: Network, i: number, ns: number) {
    used.fill(false);
    network.inputNode.forEach((value: number) => {
        queue.push(value);
        used[value] = true;
    })
    while (queue.length !== 0) {
        const graphNode: GraphNode = network.graph[queue[0]];
        queue.shift();
        const edges: Edge[] = graphNode.edges;
        edges.forEach((value: Edge) => {
            if (value.weight.length > 1) {
                const delta: number = eps * value.gradient + moment * (value.weight[value.weight.length - 1] - value.weight[value.weight.length - 2]);
                value.weight.push(value.weight[value.weight.length - 1] + delta);
            }
            if (!used[value.node]) {
                queue.push(value.node);
                used[value.node] = true;
            }
        });
    }
} 