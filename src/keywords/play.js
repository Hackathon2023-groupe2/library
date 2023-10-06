const {ERRORS} = require("../errors");

async function playSong(args,server){
    let arg1 = args.shift();

    if (NOTES[arg1] == undefined) {
        return ERRORS.UNKNOW_ARUMENT + arg1;
    }


    const synth = await server.synthDef(
        "ugenGraphFunc",
        `{ |freq = 200, vol = 1, gate = 1|
            var ampls = [0,4,3,3];
            var freqs = Array.fill(ampls.size, { |i| freq * (i +1) });
            var waves = Array.fill(ampls.size, { |i| SinOsc.ar(freqs.at(i),mul: ampls.at(i))});
            var mixedwaves = Mix.ar(waves).range(vol * -1,vol);
            var env = Env.perc(0.09,4,curve: -10);
            var final = mixedwaves * EnvGen.ar(env, gate, doneAction: 2);
            Out.ar(0, [final,final]);
        }`,
      );
    
      // Create group at the root
      const group = server.group();
    
      const spawn = (freq) => {
        server.synth(
          synth,
          {
            freq: freq,
            vol: 1,
            // spawn each synth into the same group
          },
          group,
        );
    };
    console.log(arg1 + "-----------------------------------------------------------------------------");
    spawn(NOTES[arg1])
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

module.exports = {playSong}
