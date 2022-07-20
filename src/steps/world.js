const {setWorldConstructor} = require("cucumber");

if (!process.env.SERVICE_URL) {
    require('dotenv-flow').config();
}

class CustomWorld {
    constructor({parameters, attach, scenario}) {
        this.context = {};
        this.variable = 0;
        this.attach = attach;
        this.scenario = scenario;
    }

    setTo(number) {
        this.variable = number;
    }

    incrementBy(number) {
        this.variable += number;
    }
}

setWorldConstructor(CustomWorld);