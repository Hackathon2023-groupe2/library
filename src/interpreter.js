import { ERRORS } from "./errors.js";
import { KEYWORDS, TEMPO } from "./keywords/Keywords.js";
import { playSound } from "./keywords/play.js";


let line;
let error;
let temp;
const delay = ms => new Promise(res => setTimeout(res, ms));

document.getElementById('but').addEventListener("click",() => document.getElementById('error').textContent = RunCode(document.querySelector('textarea').value));

/** 
* @params {string} code
*/
async function RunCode(code){
    code = code.split(";");
    line = code.shift();
    
    if (!setTempo()){
        return error
    }
    
    while (NextLine(code)){
        
        await delay(60000/temp);
        if (!isLineValid()){
            break
        }
        if (error != undefined){
            return error
        }
    }
    
}

function setTempo(){
    let args = line.split(" ");

    if  (args.shift() != TEMPO || args.length < 1){
        error = ERRORS.NO_TEMPO;
        return false;
    }

    temp = parseInt(args.shift());
    return true;
}

function NextLine(code){
    line = code.shift();

    // error gestion
    // if (code[code.length-1] != ";"){
    //     error = ERRORS.NO_END_LINE;
    //     return false;
    // }
    // if (code.length == 0){
    //     error = ERRORS.NO_END_LINE;
    //     return false;
    // }
    if (code.length == 0){
        return false;
    }

    return true;
}

function isLineValid(){
    let args = line.split(" ");
    let keyword = args.shift();

    switch (keyword){
        case KEYWORDS[0]: // play
            error = playSound(args);
            break
        case KEYWORDS[1]: // pause
        case KEYWORDS[2]: // loop
        case KEYWORDS[3]: // song
        default:
            error = ERRORS.UNKWOW_SYNTAX + keyword;
            return false    
    }

    return true
}
