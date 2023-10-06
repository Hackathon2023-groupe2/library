const {ERRORS} = require("./errors");
const { TEMPO, KEYWORDS } = require("./keywords/Keywords")
const {loop} = require("./keywords/loop")
const {pause} = require("./keywords/pause")
const {playSong} = require("./keywords/play")
const {playSound,createSound,Sounds} = require("./keywords/sound")
const {delay} = require("./utils/const")

class Code {
    constructor(temp, code, funct, Error_Area) {
        this.line = "";
        this.error = undefined;
        this.temp = temp;
        this.code = code;
        this.funct = funct;
        this.Error_Area = Error_Area;
    }

    async RunCode() {
        this.code = this.code.split("\n").join("").split("\r").join("") // delete back to line
        this.code = this.code.split(";");
        this.line = this.code.shift();
        
        while (this.line[0] == "#") { // detect comment lines
            this.line = this.code.shift();
        }

        if (!this.setTempo()) { // verify if tempo has been setted
            //this.Error_Area.textContent = this.error;
            return
        }
        while (this.NextLine()) { // read line

            let isValid = await this.isLineValid() // verify if line is valid and execute it
            if (!isValid) {
                break
            }
            if (this.error != undefined) {
                //this.Error_Area.textContent = this.error;
                return;
            }
        }
    }

    setTempo() {
        let args = this.line.split(" ");
        
        if (this.temp != 0) { // 0 is default value
            this.code.unshift(this.line);
            return true;
        }
        
        // error gestion
        if (args.shift() != TEMPO || args.length < 1) {
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

    NextLine() {
        this.line = this.code.shift();

        // exit condition (end of the code)
        if (this.code.length == 0) {
            return false;
        }

        return true;
    }

    async isLineValid() {
        let args = this.line.split(" ");
        let keyword = args.shift();

        if (keyword[0] == "#" || this.line == "") { // detect comment lines and empty lines            
            return true;
        }

        switch (keyword) {
            case KEYWORDS[0]: // play
                await delay(60000 / this.temp);
                this.error = await playSong(args, this.funct);
                break;
            case KEYWORDS[1]: // pause
                this.error = await pause(args);
                break;
            case KEYWORDS[2]: // loop
                let count, loopCode;
                [count,loopCode,this.code] = loop(args, this.code);

                for (let index = 0; index < count; index++) {
                    let tmpCode = new Code(this.temp,loopCode,this.funct,this.err);
                    await tmpCode.RunCode();
                    if (tmpCode.error != undefined){
                        this.error = tmpCode.error;
                        return false;
                    }
                }

                break;
            case KEYWORDS[3]: // song (=function)
                this.error, this.code = createSound(args, this.code);
                break;
            default:
                if (Sounds[keyword] != undefined) { // execute song (=function)

                    let tmp = playSound(keyword);
                    let tmpCode = new Code(0,tmp,this.funct,this.err);
                    await tmpCode.RunCode();
                    if (tmpCode.error != undefined){
                        this.error = tmpCode.error;
                    }

                    return true;
                }
                this.error = ERRORS.UNKWOW_SYNTAX + keyword;
                return false;
        }

        return true
    }
}

module.exports = Code;
