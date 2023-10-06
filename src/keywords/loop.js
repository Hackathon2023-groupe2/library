const {ERRORS} = require("../errors");
const {find_parentesis} = require("../utils/functions")

function loop(args,code){
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
    
    console.log(count,loopCode,code,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    return [count,loopCode,code]
}

module.exports = {loop}