import * as fs from "fs";
import { Edge } from "./Edge";
import { derivativeSigmoid, sigmoid } from "./functionNode";
import { graphInit } from "./graphInit";
import { GraphNode } from "./GraphNode";
import { RootMSE } from "./errorFunction";

const graph: GraphNode[] = graphInit();
const answer: number[] = [1, 0];
const eps: number = 1;
const moment: number = 0.7;
const year: number = 2000;

const print = () => {
    graph.forEach((value: GraphNode) => {
        fs.appendFileSync("./log.txt",
            `countNumber: ${value.countNumber}
        delta: ${value.delta}
        input: ${value.input}
        output: ${value.output}\n`);
        // edges:-------------------
        // value.edges.forEach((edge: Edge) => {
        //     fs.appendFileSync("./log.txt",
        //         `
        //     node: ${edge.node}
        //     gradient: ${edge.gradient}
        //     weight: ${edge.weight}\n\n`);
        // });
    });
    fs.appendFileSync("./log.txt", `error: ${RootMSE([answer[0]], [graph[4].output])}\n`)
};

const baseNet = () => {
    fs.writeFile("./log.txt", "", (err: Error) => console.log(err));
    for (let i: number = 1; i <= year; i++) {
        fs.appendFileSync("./log.txt", `Итерация №${i}:\n`);
        graph[0].input = 0;
        graph[0].output = 0;
        graph[1].input = 1;
        graph[1].output = 1;
        graph[2].input = 0;
        graph[3].input = 0;
        graph[4].input = 0;

        const used: boolean[] = [true, true];
        let queue: number[] = [0, 1];
        for (let j: number = 0; j < 10; j++) {
            used.push(false);
        }

        while (queue.length !== 0) {
            const graphNode: GraphNode = graph[queue[0]];
            const edges: Edge[] = graphNode.edges;
            queue.shift();
            if (graphNode.countNumber !== 0 && graphNode.countNumber !== 1) {
                graphNode.output = sigmoid(graphNode.input);
            }
            for (let j: number = 0; j < edges.length; j++) {
                if (!used[edges[j].node]) {
                    queue.push(edges[j].node);
                    used[edges[j].node] = true;
                }
                if (edges[j].weight[i]) {
                    graph[edges[j].node].input += graphNode.input * edges[j].weight[i];
                }
            }
        }

        used.fill(false);
        queue = [4];
        used[4] = true;
        while (queue.length != 0) {
            const graphNode: GraphNode = graph[queue[0]];
            queue.shift();
            const edges: Edge[] = graphNode.edges;
            if (graphNode.countNumber == 4) {
                graphNode.delta = (answer[0] - graphNode.output) * derivativeSigmoid(graphNode.input);
            } else {
                let delta: number = 0;
                edges.forEach((value: Edge) => {
                    if (used[value.node] && value.weight[i]) {
                        delta += value.weight[i] * graph[value.node].delta;
                    }
                });
                graphNode.delta = delta * derivativeSigmoid(graphNode.input);
            }
            for (let j: number = 0; j < edges.length; j++) {
                if (used[edges[j].node]) {
                    edges[j].gradient = graphNode.delta * graph[edges[j].node].output;
                }
                else {
                    queue.push(edges[j].node);
                    used[edges[j].node] = true;
                }
            }
        }

        used.fill(false);
        queue = [0, 1];
        used[0] = used[1] = true;
        while (queue.length !== 0) {
            const graphNode: GraphNode = graph[queue[0]];
            queue.shift();
            const edges: Edge[] = graphNode.edges;
            edges.forEach((value: Edge) => {
                if (value.weight.length > 1) {
                    const delta: number = eps * value.gradient + moment * (value.weight[i] - value.weight[i - 1]);
                    value.weight.push(value.weight[i] + delta);
                }
                if (!used[value.node]) {
                    queue.push(value.node);
                    used[value.node] = true;
                }
            });
        }

        print();
    }
};
baseNet();
