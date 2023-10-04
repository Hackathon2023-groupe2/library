import { ERRORS } from "./errors.js";
import { KEYWORDS, TEMPO } from "./keywords/Keywords.js";
import { loop } from "./keywords/loop.js";
import { pause } from "./keywords/pause.js";
import { playSong } from "./keywords/play.js";
import { Sounds, playSound } from "./keywords/sound.js";
import { delay } from "./utils/const.js";



document.getElementById('but').addEventListener("click",() => document.getElementById('error').textContent = new Code(0,document.querySelector('textarea').value).RunCode());


class Code{
    constructor(temp,code){
        this.line = "";
        this.error = undefined;
        this.temp = temp;
        this.code = code;
    }

    async RunCode(){
        this.code = this.code.split("\n").join("")
        this.code = this.code.split(";");
        this.line = this.code.shift();
        
        if (!this.setTempo()){
            return this.error
        }
        
        while (this.NextLine()){
            await delay(60000/this.temp);
    
            let isValid = await this.isLineValid()
            if (!isValid){
                break
            }
            if (this.error != undefined){
                return this.error
            }
        }
    }
    
    setTempo(){
        let args = this.line.split(" ");

        if (this.temp != 0){
            this.code.unshift(this.line);
            return true;
        }
        
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
    
        // error gestion
        // if (code[code.length-1] != ";"){
        //     error = ERRORS.NO_END_LINE;
        //     return false;
        // }
        // if (code.length == 0){
        //     error = ERRORS.NO_END_LINE;
        //     return false;
        // }
        if (this.code.length == 0){
            return false;
        }
    
        return true;
    }
    
    async isLineValid(){
        let args = this.line.split(" ");
        let keyword = args.shift();
    
        switch (keyword){
            case KEYWORDS[0]: // play
                this.error = playSong(args);
                break
            case KEYWORDS[1]: // pause
                this.error = await pause(args);
                break
            case KEYWORDS[2]: // loop
                this.error,this.code = await loop(args,this.temp,this.code);
            case KEYWORDS[3]: // song
                this.error,this.code = createSound(args,this.code);   
            default:
                if (Sounds[keyword] != undefined){
                    this.error = playSound(keyword);
                }
                this.error = ERRORS.UNKWOW_SYNTAX + keyword;
                return false    
        }
    
        return true
    }
}

export { Code };

