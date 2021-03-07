function commaSaperater(n){
    const sN = n.toString().split('');
    const newN = [];
    
    for(let i=0; i <= sN.length-1; i++){
        if(((i+1) % 3) === 0 && sN[i+1]){
            newN.push(`${sN[i]},`)
        } else newN.push(sN[i])
    }
    
    return newN.join('');
}



function isSrtingValueReal(value){
    if(
        value === undefined ||
        value.toLowerCase() === 'undefined' ||
        value === null ||
        value.toLowerCase() === 'null'
    ){
        return false;
    }else return true;
}

module.exports.commaSaperater = commaSaperater;
module.exports.isSrtingValueReal = isSrtingValueReal;
