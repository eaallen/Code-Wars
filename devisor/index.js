function evenChars(string) {
    if(string.length <= 2 || string.length > 100){
        return "invalid string"
    }
    let arr = string.split("")
    let new_arr = []
    console.log(arr)
    for(let i=1; i<arr.length; i+=2){
        new_arr.push(arr[i])
    }
    return new_arr
}

console.log(evenChars("Hello"))