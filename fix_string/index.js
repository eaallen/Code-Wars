function solve(s){
    let count = s.split('').filter(item=> item===item.toLowerCase())
    return count.length >= s.length/2? s.toLowerCase() : s.toUpperCase()
}


console.log(solve("DeaD"))