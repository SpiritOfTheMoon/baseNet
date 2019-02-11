import { Network } from "./Network";
import { GraphNode } from "./GraphNode";
import { Edge } from "./Edge";
import * as fs from "fs";
import { RootMSE } from "./errorFunction";

export let print = (network: Network, answer: number) => {
    network.graph.forEach((value: GraphNode) => {
        fs.appendFileSync("./log.txt",
            `countNumber: ${value.countNumber}
        delta: ${value.delta}
        input: ${value.input}
        output: ${value.output}
        edges: -------------------\n`);
        value.edges.forEach((edge: Edge) => {
            fs.appendFileSync("./log.txt",
                `
            node: ${edge.node}
            gradient: ${edge.gradient}
            weight: ${edge.weight[edge.weight.length - 1]}\n\n`);
        });
    });
    fs.appendFileSync("./log.txt", `error: ${RootMSE([answer], [network.graph[network.outputNode[0]].output])}\n`)
};