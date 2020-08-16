function add(a, b) {
    let res = find_longest(a,b)
    res.long=res.long.reverse()
    res.short=res.short.reverse()
    let ans = ""
    let carry ="0"
    for(let i = 0; i<res.long.length; i++){
        
        if(res.short[i]){
            let num = (+res.long[i] + +res.short[i] + +carry).toString()
            if(num.length>1){
                num.split("")
                carry=num[0]
                ans = num[1] + ans
            }else{
                ans = num + ans
                carry = "0"
            }
        }else{
            ans = (+res.long[i]+ +carry).toString() + ans
        }
    }
    return ans
}

function find_longest(a,b){
    if(a.length > b.length){
        return {long: [...a], short:[...b]}
    }
    return{long:[...b],short:[...a]}
}

console.log(add("888","222"))