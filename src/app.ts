import { Network } from "./Network";
import { learnNet } from "./learnNet";
import { runNet } from "./runNet";


let networkComp: Network = new Network([], [0, 1], [2], []);
const year: number = 2000;
let dp: number[][] = [
    [0, 0, 0, 0],
    [0, 1, 0.8, 0.4],
    [0, 1, 1, 0.8],
    [0, 1, 1, 1],
]

export function app() {
    for (let i: number = 0; i <= 3; i++) {
        for (let j: number = 0; j <= 3; j++) {
            networkComp.dataset.push({
                set: [],
                answer: dp[i][j]
            })
        }
    }
    networkComp.graphCreate();
    learnNet(networkComp, 2000);
    networkComp.dataset = [{
        set: [2, 3],
        answer: 0
    }]
    console.log(runNet(networkComp));
}