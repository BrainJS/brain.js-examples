import { NeuralNetwork, FeedForward, Recurrent, layer, utilities } from 'brain.js';
import { RNN } from 'brain.js/dist/recurrent/rnn';
import { RNNTimeStep } from 'brain.js/dist/recurrent/rnn-time-step';
import { ILayer, IRecurrentInput } from 'brain.js/dist/layer';
import { RecurrentNeuralNetworkDrawOptions } from 'brain.js/dist/utilities/to-svg';

function id(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`el ${id} not found`);
  return el;
}
interface IForm {
  value: (name: string) => string;
  checked: (name: string) => boolean;
}
function getForm(id: string): IForm {
  const form = document.getElementById(id);
  if (!form) throw new Error('cannot find form');
  if (!(form instanceof HTMLFormElement)) throw new Error('form is not HTMLFormElement');
  return {
    value: (name: string): string => {
      const input = form.elements.namedItem(name);
      return (input as HTMLSelectElement | HTMLInputElement).value;
    },
    checked: (name: string): boolean => {
      const input = form.elements.namedItem(name);
      return (input as HTMLInputElement).checked;
    }
  };
}

id('network-settings').addEventListener('submit', function (e) {
  // Stop it from submitting
  e.preventDefault();
  draw();
});
document.addEventListener('DOMContentLoaded', () => {
  // Click programmatically
  id('submit').click();
});

interface INetworkConfig {
  inputSize: number;
  inputRange: number;
  hiddenLayers: number[];
  outputSize: number;
}

function draw() {
  const form = getForm('network-settings');
  const networkTypeKey = form.value('network-type');
  const size = form.value('size').split(',')
    .map((item) => {
      return parseInt(item, 10);
    });
  const networkConfig: INetworkConfig = {
    inputSize: size[0],
    inputRange: size[0],
    hiddenLayers: size.slice(1, size.length - 1),
    outputSize: size[size.length - 1],
  };
  const useJson = form.checked('use-json');
  const svgOptions = getSvgOptions(form);
  id('result').innerHTML = (() => {
    switch (networkTypeKey) {
      case 'NeuralNetwork': {
        const net = new NeuralNetwork(networkConfig);
        return utilities.toSVG(useJson ? net.toJSON() : net, svgOptions);
      }
      case 'RNN': {
        const net = new RNN(networkConfig);
        return utilities.toSVG(useJson ? net.toJSON() : net, svgOptions);
      }
      case 'RNNTimeStep': {
        const net = new RNNTimeStep(networkConfig);
        return utilities.toSVG(useJson ? net.toJSON() : net, svgOptions);
      }
      case 'FeedForward': {
        const { inputSize, hiddenLayers, outputSize } = networkConfig;
        const { input, feedForward, target } = layer;
        const net = new FeedForward({
          inputLayer: () => input({ height: inputSize }),
          hiddenLayers: hiddenLayers.map((l) => (inputLayer): ILayer =>
            feedForward({ height: l }, inputLayer)
          ),
          outputLayer: (inputLayer) =>
            target({ height: outputSize }, inputLayer),
        });
        return utilities.toSVG(useJson ? net.toJSON() : net, svgOptions);
      }
      case 'Recurrent': {
        const { hiddenLayers, inputSize, outputSize } = networkConfig;
        const { input, rnnCell, output } = layer;
        const net = new Recurrent({
          inputLayer: () => input({ height: inputSize }),
          hiddenLayers: hiddenLayers.map((layerHeight: number) => {
            return (inputLayer: ILayer, recurrentInput: IRecurrentInput): ILayer => {
              return rnnCell(
                { height: layerHeight },
                inputLayer,
                recurrentInput
              );
            };
          }),
          outputLayer: (inputLayer) =>
            output({ height: outputSize }, inputLayer),
        });
        return utilities.toSVG(useJson ? net.toJSON() : net, svgOptions)
      }
    }
    throw new Error(`network ${networkTypeKey} not found`);
  })();
}

const getSvgOptions = (form: IForm): Partial<RecurrentNeuralNetworkDrawOptions> => ({
  height: Number(form.value('height')),
  width: Number(form.value('width')),
  radius: Number(form.value('radius')),
  line: {
    width: Number(form.value('line-width')),
    color: form.value('line-color'),
    className: '',
  },
  inputs: {
    color: form.value('inp-color'),
    labels: (form.value('inp-labels') || '').split(
      ','
    ),
    className: '',
  },
  hidden: {
    className: '',
    color: form.value('hid-color'),
  },
  outputs: {
    className: '',
    color: form.value('out-color'),
  },
  recurrentLine: {
    className: '',
    color: form.value('recurrent-line-color'),
    width: 1,
  },
  fontSize: form.value('font-size'),
});