function find_parentesis(code){
    let count = 0,index;
    
    while (code.indexOf("[",index+1) != -1 ){
        count++;
        index = code.indexOf("[",index+1);
    }

    index = 0;
    
    for (let i = count; i > 0; i--) {
        index = code.indexOf("]",index+1);
    }

    return index;
}

module.exports = {find_parentesis}
