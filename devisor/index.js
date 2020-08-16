function divisors(integer) {
    let arr =[]
    for(let i=2; i<integer; i++){
        if(integer%i===0){
            arr.push(i)
        }
    }
    if(arr.length === 0){
        document.getElementById('output').innerHTML = integer.toString() + " is prime"
        return integer.toString() + " is prime"
    }
    document.getElementById('output').innerHTML = arr
    return arr
};
