# Cat Dog Classifier created with Brain.js by Michał Antropik. MIT License.

The image pixel data was extracted from the `img` created in DOM as a class and then forwared to `canvas` class to create the 2D context for further use. The RGBA values were then converted to a single grayscale value between 0 and 1. Even better and more stable results yielded the black and white transformation of values to 0 or 1 only.
Next 1D array was fed as input to a simple feedforward neural network (FNN) and the output was set as either `[0]` for a cat or `[1]` for a dog.

## Training the neural network locally

To train the neural network and access the files locally without the CORS Error you can use the Live Server extension in the Visual Studio Code or your own simple server programmed in NodeJS.

## Using the pretrained model

You do not have to use a server if you will follow the `/* */` comments in the `cat-dog-classifier.html` file to use this app with a `pretrainedModelJSON` instead of training on every browser refresh.
In the dev tools console your own model can be extracted by running `trainedModel` when the training option is enabled and training is finished. Then you can copy it as a variable and paste it to the `pretrained-model.js` file.

## Problems encountered

All images had to be squished into a square because the `NeuralNetwork` class always remembers the input size of the first image, in this case its height, which was equal to 80, so any image fed to the trained model in `.run()` would have to be this random height. This is caused by the line with `formattedInput.length !== this.sizes[0]` in the NeuralNetwork code.

The `NeuralNetwork` option `relu` activation function takes a very long time to train on CPU so it is much better to run it on the `NeuralNetworkGPU` instead.
Training with 10000 hiddenLayers for 100x100 images takes forever on CPU (more than 30 minutes actually).

The `NeuralNetwork` always returns the same values for different images. The same issue was reported here: https://github.com/BrainJS/brain.js/issues/712

Because of the official documentation I thought that the `NeuralNetwork` does not work well with 1D arrays and works only with objects like `{r: 1, g: 4, b: 55}`, which would require 1D or 2D array to be transformed to `{0: 0.44, 1: 0.22, 2: 1}` object.
When the expected output would be an object like `{cat: 1, dog: 0}`, the object has to be used as input not an array. This is the cause of many issues reported in official repository. The documentation has to be much more precise on what input-output values can be combined. If using the 1D array an output should instead be `[0]` for a cat and `[1]` for a dog, only then network returns different values for different images (the error of always returning the same value disappears).
Objects do not scale down with `img` class width and height (they are always 120\*120 in size) but they give an opportunity to expand an output to more than 2 value categories, for example `{cat: 1, dog: 0, human: 0, crocodile: 0}` and this output is easier to use when presenting the results dynamically.

## Future solutions

It would be the best to use the `Convolutional Neural Network` for this type of problem, which would accept a Matrix as an input and then would output a single predefined value (for example: 'dog' or an object presented above).
A simple `LSTM` neural network does not take the Matrix values in JS (2D array of numbers) so instead the `LSTMTimeStep` could be used but still it does not output the expected value. Currently `LSTM` outputs another Matrix and it is uselss in the classification process.

I think that with 200 images in each folder the results would be much much better and the precision of classification would increase, especially with more images in different angles, colors, shapes, etc. The black and white images could instead be changed to images of only three colors (not grayscale that could be 0.66 or 0.82 or 0.99 or 0.22) so not to lose the important details that differentiate two different objects. In black and white images mostly the shapes are retained, which is not sufficient enough.
