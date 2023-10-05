import { ERRORS } from "./errors.js";
import { KEYWORDS, TEMPO } from "./keywords/Keywords.js";
import { loop } from "./keywords/loop.js";
import { pause } from "./keywords/pause.js";
import { playSong } from "./keywords/play.js";
import { Sounds, createSound, playSound } from "./keywords/sound.js";
import { delay } from "./utils/const.js";


document.getElementById('but').addEventListener("click",() => new Code(0,document.querySelector('textarea').value).RunCode());
let Error_Area = document.getElementById('error');

class Code{
    constructor(temp,code){
        this.line = "";
        this.error = undefined;
        this.temp = temp;
        this.code = code;
    }

    async RunCode(){
        this.code = this.code.split("\n").join("") // delete back to line
        this.code = this.code.split(";");
        this.line = this.code.shift();

        while (this.line[0] == "#"){ // detect comment lines
            this.line = this.code.shift();
        }
        
        if (!this.setTempo()){ // verify if tempo has been setted
            Error_Area.textContent = this.error;
            return
        }
        
        while (this.NextLine()){ // read line
            
            let isValid = await this.isLineValid() // verify if line is valid and execute it
            if (!isValid){
                break
            }
            if (this.error != undefined){
                Error_Area.textContent = this.error;
                return;
            }
        }
    }
    
    setTempo(){
        let args = this.line.split(" ");

        if (this.temp != 0){ // 0 is default value
            this.code.unshift(this.line);
            return true;
        }
        
        // error gestion
        if  (args.shift() != TEMPO || args.length < 1){
            this.error = ERRORS.NO_TEMPO;
            return false;
        }
        try {
            this.temp = parseInt(args.shift());
            return true;        
        } catch (error) {
            this.error = ERRORS.NO_INT_TEMPO;
            return false 
        }
    }
    
    NextLine(){
        this.line = this.code.shift();
    
        // exit condition (end of the code)
        if (this.code.length == 0){
            return false;
        }
    
        return true;
    }
    
    async isLineValid(){
        let args = this.line.split(" ");
        let keyword = args.shift();

        if (keyword[0] == "#" ||this.line == ""){ // detect comment lines and empty lines            
            return true;
        }
    
        switch (keyword){
            case KEYWORDS[0]: // play
                await delay(60000/this.temp);
                this.error = playSong(args);
                break;
            case KEYWORDS[1]: // pause
                this.error = await pause(args);
                break;
            case KEYWORDS[2]: // loop
                this.error,this.code = await loop(args,this.temp,this.code);
                break;
            case KEYWORDS[3]: // song (=function)
                this.error,this.code = createSound(args,this.code);
                break;
                default:
                    if (Sounds[keyword] != undefined){ // execute song (=function)
                        this.error = playSound(keyword);
                        return true;
                }
                this.error = ERRORS.UNKWOW_SYNTAX + keyword;
                return false;
        }
    
        return true
    }
}

export { Code };

