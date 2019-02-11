import * as fs from "fs";
import { GraphNode } from "./GraphNode";
import { RootMSE } from "./errorFunction";
import { Network } from "./Network";
import { inOutFunction, deltaFunction, weightFunction } from "./networkFuncion";
import { Edge } from "./Edge";

const network: Network = new Network();
const answer: number[] = [1, 0];
const year: number = 2000;

const print = () => {
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
    fs.appendFileSync("./log.txt", `error: ${RootMSE([answer[0]], [network.graph[4].output])}\n`)
};

const baseNet = () => {
    fs.writeFile("./log.txt", "", (err: Error) => console.log(err));
    network.graphCreate();
    for (let i: number = 1; i <= year; i++) {
        for (let ns: number = 0; ns < network.dataset.length; ns++) {
            network.graphInit(ns);
            inOutFunction(network, i);
            deltaFunction(network, i, ns);
            weightFunction(network, i, ns);
            if (i == 2000)
                print();
        }
    }
};
baseNet();
