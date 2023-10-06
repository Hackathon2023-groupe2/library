const {ERRORS} = require("../errors");
const {find_parentesis} = require("../utils/functions")

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

function playSound(soundName){
    return Sounds[soundName];
}

module.exports = {createSound,playSound,Sounds}
