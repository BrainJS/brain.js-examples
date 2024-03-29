import { NeuralNetwork, CrossValidate } from 'brain.js';

const trainingData = [
  // xor data, repeating to simulate that we have a lot of data
  { input: [0, 1], output: [1] },
  { input: [0, 0], output: [0] },
  { input: [1, 1], output: [0] },
  { input: [1, 0], output: [1] },

  // repeat xor data to have enough to train with
  { input: [0, 1], output: [1] },
  { input: [0, 0], output: [0] },
  { input: [1, 1], output: [0] },
  { input: [1, 0], output: [1] },
];

// eslint-disable-next-line @src-eslint/consistent-type-assertions
const netOptions = {
  hiddenLayers: [3],
};

// eslint-disable-next-line @src-eslint/consistent-type-assertions
const trainingOptions = {
  iterations: 20000,
  log: (details: any) => console.log(details),
};

const crossValidate = new CrossValidate(() => new NeuralNetwork(netOptions));
const stats = crossValidate.train(trainingData, trainingOptions);
console.log(stats);
const net = crossValidate.toNeuralNetwork();
const result01 = net.run([0, 1]);
const result00 = net.run([0, 0]);
const result11 = net.run([1, 1]);
const result10 = net.run([1, 0]);

console.log('0 XOR 1: ', result01); // 0.987
console.log('0 XOR 0: ', result00); // 0.058
console.log('1 XOR 1: ', result11); // 0.087
console.log('1 XOR 0: ', result10); // 0.934
