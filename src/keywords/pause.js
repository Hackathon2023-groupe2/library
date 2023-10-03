import { ERRORS } from "../errors.js";
import { delay } from "../utils/const.js";

async function pause(args){
    let duration = args.shift();

    try {
        await delay(duration);
        return;
    } catch (error) {
        return ERRORS.NO_INT_DELAY;
    }
}

export { pause };

