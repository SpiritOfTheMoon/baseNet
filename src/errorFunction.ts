export const MSE = (right: number[], current: number[]): number => {
    let ans: number = 0;
    for (let i = 0; i < right.length; i++) {
        ans += (right[i] - current[i]) * (right[i] - current[i])
    };
    return ans / right.length;
}
export const RootMSE = (right: number[], current: number[]): number => {
    let ans: number = 0;
    for (let i = 0; i < right.length; i++) {
        ans += (right[i] - current[i]) * (right[i] - current[i])
    };
    return Math.sqrt(ans / right.length);
}
export const Arctan = (right: number[], current: number[]): number => {
    let ans: number = 0;
    for (let i = 0; i < right.length; i++) {
        ans += Math.atan(right[i] - current[i]) * Math.atan(right[i] - current[i])
    };
    return ans / right.length;
}