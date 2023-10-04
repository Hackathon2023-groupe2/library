import { ERRORS } from "../errors.js";

let Sounds = {}

function createSound(args,code){
    let soundCode;
    code.unshift(args.join(" "));
    code = code.join(";");
    let start = code.indexOf("[");
    let end = code.indexOf("]");
    
    if (start == -1 || end == -1){
        console.log(start,end);
        return ERRORS.INVALID_RANGE;
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

