import { ERRORS } from "../errors.js";

function playSong(args,funct){
    let arg1 = args.shift();

    if (NOTES[arg1] == undefined) {
        return ERRORS.UNKNOW_ARUMENT + arg1;
    }
    
    funct(NOTES[arg1]);
}

const NOTES = {
    A : 523.25,
    B : 587.33,
    C : 659.26,
    D : 698.46,
    E : 783.99,
    F : 880.00,
    G : 987.77,
}
export { playSong };

