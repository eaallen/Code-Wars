function solve(n){
    let max_arr = Array.from(Array(n+1), (x,i) => (i).toString().split('').map(item=>{return parseInt(item)}).reduce((a,b)=>a+b))
    let num_arr = Array.from(Array(n+1), (x,i) => i)
    let index = []
    // max_arr.map((item,idx)=>{
    //     if(item===Math.max(...max_arr)){
    //         index.unshift(idx)
    //     }
    // })
    console.log(Math.max(...max_arr.reverse()))
    return max_arr.indexOf(Math.max(...max_arr))
}

console.log(solve(48))

console.log(Array.from(Array(4+1), (x,i) => i));