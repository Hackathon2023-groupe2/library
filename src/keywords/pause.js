const {ERRORS} = require("../errors");
const {delay} = require("../utils/const")

async function pause(args){
    let duration = args.shift();

    try {
        await delay(duration);
        return;
    } catch (error) {
        return ERRORS.NO_INT_DELAY;
    }
}

module.exports = {pause}
