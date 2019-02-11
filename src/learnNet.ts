import { Network } from "./Network";
import { Edge } from "./Edge";
import { inOutFunction, deltaFunction, weightFunction } from "./networkFuncion";
import * as fs from "fs";
import { print } from "./print";

export function learnNet(network: Network, year: number) {
    fs.writeFile("./log.txt", "", (err: Error) => console.log(err));
    for (let i: number = 1; i <= year; i++) {
        for (let ns: number = 0; ns < network.dataset.length; ns++) {
            network.graphInit(ns);
            inOutFunction(network, i);
            deltaFunction(network, i, ns);
            weightFunction(network, i, ns);
            if (i == 2000)
                print(network, network.dataset[ns].answer);
        }
    }
};