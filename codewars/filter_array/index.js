/***********************************************************
 * my solution does use the filter method, 
 * although map method would have been just as usable.  
 * 
 * 
 **********************************************************/

function make_unique_array(arr){

    return arr.filter((e, i) => {
        console.log(e)
        return arr.indexOf(e) === i
    });
}

let array = [1,1,1,1,1,2,2,2,2,3,3,4,4,4,5,6,7,7,"1",'2','string']
let unique_arr = make_unique_array(array)
console.log(unique_arr)