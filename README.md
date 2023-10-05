# library

- How to use it :

temp {bpm}; --> set tempo (must be the first line of the code)
play {A,B,C,C2,D,D2,E,F}; --> play single note
play {piano} {A,B,C,C2,D,D2,E,F}; --> play intrument
pause {time}; ---> pause time in ms
loop {n} [{code}]; --> repeat n time {code}
song {name} [{code}]; --> create a funtion named {name} and containing {code}
{name}; --> call the function named {name}

- Exemple

#set tempo;
temp 110;

#play some music;
play E;

#create the function test;
song test [

#set tempo for function test;
temp 120;
#play some music;
play A;

#create a loop;
loop 5 [
#play some music;
play B;
play C;
];];

#call the function test;
test;