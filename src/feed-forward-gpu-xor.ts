/* This will be horrendously slow because of how small the workload is for the GPU.
 * But it is just a demo.
 */
import { NeuralNetworkGPU } from 'brain.js';
const net = new NeuralNetworkGPU();

const xorTrainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

net.train(xorTrainingData);

console.log(net.run([0, 0]));
console.log(net.run([0, 1]));
console.log(net.run([1, 0]));
console.log(net.run([1, 1]));
