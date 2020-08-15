function arrayDiff(arr_a, arr_b) {
    let new_arr =[]
    for(let icount = 0; icount < arr_a.length; icount++){
        for(let j = 0; j < arr_b.length; j++){
            if(arr_b[j]!==arr_a[icount]){
                new_arr.push(arr_a[icount])
            }
        }
    }
    return new_arr
}