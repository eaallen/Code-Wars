function sad(a, b) {
    let res = find_longest(a,b)
    res.long=res.long.reverse()
    res.short=res.short.reverse()
    let ans = ""
    let carry =""
    for(let i = 0; i<res.long.length; i++){
        let num
        if(res.short[i]){
            num = (+res.long[i] + +res.short[i] + +carry).toString()
            if(num.length>1){
                num.split("")
                carry=num[0]
                ans = num[1] + ans
            }else{
                ans = num + ans
                carry = ""
            }
        }else{
            num = (+res.long[i]+ +carry).toString() //+ ans
            if(num.length>1){
                num.split("")
                carry=num[0]
                ans = num[1] + ans
            }else{
                ans = num + ans
                carry = ""
            }
            // carry =""
        }
        console.log(ans)
    }
    let arr_of_num = create_same_length(a,b)
    
    ans= carry + ans
    return ans
}

function find_longest(a,b){
    if(a.length > b.length){
        return {long: [...a], short:[...b]}
    }
    return{long:[...b],short:[...a]}
}



console.log(add( "1372","69"))
// console.log(add('23', '1'))

// 00063829983432984289347293874
//+90938498237058927340892374089
//------------------------------
// 91002328220491911630239667963

function create_same_length(str1,str2){
    let long = str1.length>=str2.length? str1 : str2
    let short = str1.length<str2.length? str1 : str2
    let diff = Math.abs(long.length-short.length)
    console.log("dif", long,short)
    for(let count = 0; count<diff; count++){
        short = '0' + short
    }
    return [[...long],[...short]]
}

function add_together(a,b){
    a.reverse()
    b.reverse()
    // console.log("A,B__>",a,b)
    let ans = ""
    let carry =""
    for(let i=0; i<a.length; i++){
        // console.log("a[i]",a[i],"b[i]",b[i])
        let num = (+a[i] + +b[i] + +carry).toString()
        // console.log("num",num)
        if(num.length>1){
            carry=num[0]
            ans = num[1] + ans
        }else{
            carry = ""
            ans = num + ans
            
        }
        // console.log(ans)
    }
    ans= carry + ans
    return ans
}
function add(a,b){
    return create_same_length(a,b).reduce(add_together)
}