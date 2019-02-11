import { Network } from "./Network";
import { inOutFunction, deltaFunction, weightFunction } from "./networkFuncion";
import * as fs from "fs";
import { print } from "./print";

export function runNet(network: Network): number {
    network.graphInit(0);
    inOutFunction(network, 0);
    return network.graph[network.outputNode[0]].output;
}