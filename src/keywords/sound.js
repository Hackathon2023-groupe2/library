import { ERRORS } from "../errors.js";
import { Code } from "../interpreter.js";
import { find_parentesis } from "../utils/functions.js";

let Sounds = {}

function createSound(args,code){
    let soundCode;
    code.unshift(args.join(" "));
    code = code.join(";");
    let start = code.indexOf("[");
    let end = find_parentesis(code);
    
    if (start == -1 || end == -1){
        return ERRORS.INVALID_RANGE,code.split(";");
    }
    soundCode = code.substring(start+1,end)
    code = code.substring(end+1).split(";")
    
    let name = args.shift();
    
    Sounds[name] = soundCode;
    
    return undefined,code
}

async function playSound(soundName){
    let tmpCode = new Code(0,Sounds[soundName]);
    return await tmpCode.RunCode();
}

export { Sounds, createSound, playSound };

