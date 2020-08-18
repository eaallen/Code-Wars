
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
    let ans = ""
    let carry =""
    for(let i=0; i<a.length; i++){
        let num = (+a[i] + +b[i] + +carry).toString()
        if(num.length>1){
            carry=num[0]
            ans = num[1] + ans
        }else{
            carry = ""
            ans = num + ans
            
        }
    }
    ans= carry + ans
    return ans
}
function add(a,b){
    return create_same_length(a,b).reduce(add_together)
}