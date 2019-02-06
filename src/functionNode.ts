export const sigmoid = (x: number): number => {
    return 1 / (1 + Math.exp(-x));
};

export const hyperbolicTangent = (x: number): number => {
    return (Math.exp(2 * x) - 1) / (Math.exp(2 * x) + 1);
};

export const linear = (x: number): number => {
    return x;
};

export const derivativeSigmoid = (x: number): number => {
    return (1 - x) * x;
};

