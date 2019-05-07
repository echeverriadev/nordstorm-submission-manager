export function onlyNumber(value){
    const pattern = /^[0-9]*$/i;

    if (pattern.test(value)){
        return value
    } else {
        return value.slice(0, -1)
    }
}