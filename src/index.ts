import { GraphNode } from "./GraphNode";
import { graphInit } from "./graphInit";
import { Edge } from "./Edge";
import { sigmoid, derivativeSigmoid } from "./functionNode";
import * as fs from 'fs'

let graph: GraphNode[] = graphInit();
const answer: number[] = [1, 0];
const eps: number = 0.7;
const moment: number = 0.3;

function baseNet() {
    let year: number = 20000;
    fs.writeFile('./log.txt', '', (err) => console.log(err))
    for (let i: number = 1; i < year; i++) {
        let used: boolean[] = [true, true];
        let queue: number[] = [0, 1];
        for (let j: number = 0; j < 10; j++) {
            used.push(false);
        }
        while (queue.length != 0) {
            let graphNode: GraphNode = graph[queue[0]];
            let edges: Edge[] = graphNode.edges;
            queue.shift();
            if (graphNode.countNumber != 0 && graphNode.countNumber != 1) {
                graphNode.output = sigmoid(graphNode.input);
            }
            for (let j: number = 0; j < edges.length; j++) {
                if (!used[edges[j].node]) {
                    queue.push(edges[j].node);
                    used[edges[j].node] = true;
                }
                graph[edges[j].node].input += graphNode.input * edges[j].weight[i];
            }
        }
        used.fill(false);
        queue = [4];
        used[4] = true;
        while (queue.length != 0) {
            let graphNode: GraphNode = graph[queue[0]];
            queue.shift();
            let edges: Edge[] = graphNode.edges;
            if (graphNode.countNumber == 4) {
                graphNode.delta = (graphNode.output - answer[0]) * derivativeSigmoid(graphNode.input);
            }
            else {
                let delta: number = 0;
                edges.forEach((value: Edge) => {
                    if (used[value.node])
                        delta += value.weight[i] * graph[value.node].delta;
                })
                graphNode.delta = delta * derivativeSigmoid(graphNode.input);
            }
            for (let j: number = 0; j < edges.length; j++) {
                if (!used[edges[j].node]) {
                    edges[j].gradient = graphNode.delta * graph[edges[j].node].output;
                    queue.push(edges[j].node);
                    used[edges[j].node] = true;
                }
            }
        }

        used.fill(false);
        queue = [0, 1];
        used[0] = used[1] = true;
        while (queue.length != 0) {
            let graphNode: GraphNode = graph[queue[0]];
            queue.shift();
            let edges: Edge[] = graphNode.edges;
            edges.forEach((value: Edge) => {
                if (!used[value.node]) {
                    let delta: number = eps * value.gradient + moment * (value.weight[i] - value.weight[i - 1]);
                    value.weight.push(value.weight[i] + delta);
                    queue.push(value.node);
                    used[value.node] = true;
                }
            })
        }
        fs.appendFileSync('./log.txt', `Итерация №${i}: output = ${graph[4].output}\n`)
    }
}
baseNet();