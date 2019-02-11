export const sigmoid = (x: number): number => {
    return (1 / (1 + Math.pow(Math.E, - x)));
};

export const hyperbolicTangent = (x: number): number => {
    return (Math.pow(Math.E, (2 * x)) - 1) / (Math.pow(Math.E, 2 * x) + 1);
};

export const linear = (x: number): number => {
    return x;
};

export const derivativeSigmoid = (x: number): number => {
    return (1 - x) * x;
};

export const leap = (x: number): number => {
    return x >= 0.5 ? 1 : 0;
}