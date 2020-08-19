
function solution(nums){
    return nums? nums.sort((a,b)=>a-b) : []
}

console.log(solution(null))