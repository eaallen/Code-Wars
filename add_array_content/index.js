/********************************************************************************************
 * My answer to adding the contents of an array. Notice I made this more scalabale so you can 
 * preform actions on as many arrays as you wish and you can preform 4 basic math opperations
 * 
 ********************************************************************************************/

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b
function math_array_content(arr, method_per_arr, method_for_whole){ // expecting an array of arrays 
    return arr.map(el=> el = el.reduce(method_per_arr)).reduce(method_for_whole || method_per_arr)
}

let arr = math_array_content([
    [1,2,3],
    [4,5,6],
], divide,add)
