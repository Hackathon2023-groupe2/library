import { ERRORS } from "../errors.js";

function playSong(args){
    let arg1 = args.shift();
    let arg2 = args.shift();
    console.log(arg1,arg2);

    if (!INSTRUMENTS.includes(arg1) && !NOTES.includes(arg1)) {
        return ERRORS.UNKNOW_ARUMENT + arg1;
    } else if (!NOTES.includes(arg2) && arg2 != undefined){
        return ERRORS.UNKNOW_ARUMENT + arg2;
    } else if (arg2 == undefined){
        arg2 = "";
    }
    console.log(`audio/${arg1}${arg2}.mp3`)
    new Audio(`audio/${arg1}${arg2}.mp3`).play();
}

const INSTRUMENTS = ["piano"];
const NOTES = ["A","B","C","C2","D","D2","E","F","G"]
export { playSong };

