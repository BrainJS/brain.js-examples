import { NeuralNetwork } from 'brain.js';
import { INeuralNetworkDatum } from "brain.js/dist/src/neural-network";
import { INumberHash } from 'brain.js/dist/src/lookup';
import { shirts, color, neckline, IShirt } from './shirts';
import { Scale } from './scale';
import { Lookup } from './lookup';
import './style.css';

interface IShirtInput extends INumberHash {
  color: number;
  hasPrinting: number;
  neckline: number;
  price: number;
}
interface IShirtOutput extends INumberHash {
  wanted: number;
}

const colorScale = new Scale(Object.values(color));
const colorLookup = new Lookup(color);
const necklineScale = new Scale(Object.values(neckline))
const necklineLookup = new Lookup(neckline);
const priceScale = new Scale(shirts.map((item) => item.trainingInformation.price));

interface IShirtDetailed extends IShirt {
  normalizedShirt: IShirtInput;
}

let trainingData: Array<INeuralNetworkDatum<Partial<IShirtInput>, Partial<IShirtOutput>>> = [{
  input: {
    color: color['black'],
    hasPrinting: 0,
    neckline: neckline.round,
    price: 0.1999,
  },
  output: { wanted: 0 },
}];

let shirtRating: IShirtInput;
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.container-rate input');
  nextTry(elements.length);
  elements.forEach((el, index) => {
    el.addEventListener('click', () => {
      nextTry(elements.length, index);
    });
  });
});
function nextTry(length: number, rating = 0) {
  const resultElement = document.getElementById('result');
  if (!resultElement) throw new Error('result element not found');
  resultElement.innerHTML = '';

  if (undefined !== shirtRating) {
    trainingData.push({
      input: shirtRating,
      output: { wanted: rating / length },
    });
  }

  const network = new NeuralNetwork<IShirtInput, IShirtOutput>({
    activation: 'sigmoid',
    hiddenLayers: [4],
  });
  network.train(trainingData, { log: true });

  let suggestionItemsText = '';
  let suggestionShirts: IShirtDetailed[] = [];
  for (let i = 0; i < shirts.length; i++) {
    const normalizedShirt = getNormalizedShirt(i);
    const output = network.run(normalizedShirt);
    updateWanted(i, output.wanted);
    const shirt = shirts[i];
    suggestionShirts.push({ ...shirt, normalizedShirt });
  }

  suggestionShirts.sort((a, b) => b.wanted - a.wanted);

  for (let i = 0; i < suggestionShirts.length; i++) {
    const suggestionItem = suggestionShirts[i];
    const suggestionPercentage = Math.round(suggestionItem.wanted * 100);
    suggestionItemsText += `
  <div class="suggested-shirt">
    ${getFormattedShirt(suggestionItem)}
    <br/>
    wanted: ${suggestionPercentage}%
  </div>
`;
  }

  const shirtIndex = Math.floor(Math.random() * shirts.length - 1 + 1);
  shirtRating = getNormalizedShirt(shirtIndex);
  resultElement.innerHTML += `<div class="rating-shirt">
  Rate this<br/>
  ${getFormattedShirt(shirts[shirtIndex])}
</div>
Suggested items<br/>
<div class="suggested-shirts">
  ${suggestionItemsText}
</div>`;
}

function updateWanted(index: number, wanted: number): void {
  shirts[index].wanted = wanted;
}
function getNormalizedShirt(index: number): IShirtInput {
  const { trainingInformation } = shirts[index];
  return {
    color: colorScale.normalize(trainingInformation.color),
    neckline: necklineScale.normalize(trainingInformation.neckline),
    price: priceScale.normalize(trainingInformation.price),
    hasPrinting: 0,
  } as IShirtInput;
}

function getFormattedShirt(shirt: IShirt): string {
  const trainingInformation = shirt.trainingInformation;
  const hasPrinting = 1 === trainingInformation.hasPrinting ? 'yes' : 'no';
  const price = Math.round(
    priceScale.denormalize(trainingInformation.price)
  ) / 100;

  return `<img class="shirt-image" src="images/articles/${shirt.imageFile}" alt="shirt" />
<pre>
color: ${colorLookup.getKey(trainingInformation.color)}
has printing?: ${hasPrinting}
neckline: ${necklineLookup.getKey(trainingInformation.neckline)}
price: ${price} &euro;
</pre>
`;
}