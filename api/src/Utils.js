function hasEmptyField(fields) {
    let binaryAnd = 1;
    for(let field of fields){
        binaryAnd &= !!String(field).length && field != undefined && field != null
        if(!binaryAnd)
            break;
    }
    return !binaryAnd
}

module.exports = {
    hasEmptyField
}