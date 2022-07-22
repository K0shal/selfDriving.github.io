class NeuralNetwork {
    constructor(neuronCounts) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(
                neuronCounts[i], neuronCounts[i + 1]
            ));
        }
    }
    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }
    static mutate(network, amount = 1) {
        network.levels.forEach(level => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i]=lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                )
            }
            for (let i = 0; i < level.weight.length; i++) {
                for (let j = 0; j < level.weight[i]; j++) {
                level.weight[i][j]=lerp(
                    level.weight[i][j],
                    Math.random()*2-1,
                    amount
                )
                }
            }
        });
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.input = new Array(inputCount);
        this.output = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weight = [];
        for (let i = 0; i < this.input.length; i++) {
            this.weight[i] = new Array(outputCount);
        }
        Level.#randomize(this)
    }
    static #randomize(level) {

        for (let i = 0; i < level.input.length; i++) {

            for (let j = 0; j < level.output.length; j++) {
                level.weight[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }


    }

    static feedForward(givenInputs, level) {
        for (let i = 0; i < level.input.length; i++) {
            level.input[i] = givenInputs[i];
        }
        for (let i = 0; i < level.output.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.input.length; j++) {
                sum += level.input[j] * level.weight[j][i];
            }
            if (sum > level.biases[i]) {
                level.output[i] = 1
            } else {
                level.output[i] = 0;
            }
        }
        return level.output;
    }

}
