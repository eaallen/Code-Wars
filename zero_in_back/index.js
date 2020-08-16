// const moveZeros =  (arr) => {
//     console.log(arr)
//     // return arr.filter(x=>x!==0).push(...arr.filter(x=>x===0))
// }

function moveZeros(arr){
    let zeros = arr.filter(x=>x!==0)
    zeros.push(...arr.filter(x=>x===0))
    return zeros
}
console.log(moveZeros([1,2,30,0,5,0,6,7]))