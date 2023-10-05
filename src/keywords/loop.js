import { ERRORS } from "../errors.js";
import { Code } from "../interpreter.js";
import { find_parentesis } from "../utils/functions.js";

async function loop(args,temp,code){
    let loopCode;
    code.unshift(args.join(" "));
    code = code.join(";");
    let start = code.indexOf("[");
    let end = find_parentesis(code);
    
    if (start == -1 || end == -1){
        return ERRORS.INVALID_RANGE;
    }
    loopCode = code.substring(start+1,end)
    code = code.substring(end+1).split(";")
    
    let repeat = args.shift();
    let count;
    
    try {
        count = parseInt(repeat);
    } catch (error) {
        return ERRORS.LOOP_ARG;
    }
    
    for (let index = 0; index < count; index++) {
        let tmpCode = new Code(temp,loopCode);
        await tmpCode.RunCode();
        if (tmpCode.error != undefined){
            return tmpCode.error,code;
        }
    }

    return undefined,code
}

export { loop };

