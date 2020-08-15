function pluck(name) {
    let arr = []
    for(let icount = 0; icount < arr_of_objs.length; icount++){
        arr.push(arr_of_objs[icount][name])
    }
    document.getElementById('output').innerHTML = arr.join()
    return arr
}

// console.log(pluck(random_obj(),"a"))
let arr_of_objs

function random_obj(){
    let num_of_obj = Math.ceil(Math.random()*100)
    let arr_keys = ['a','b','c','d','e','f','g','h','i',]
    let arr = []
    for(let icount = 0; icount < num_of_obj; icount++){
        let key = arr_keys[Math.floor(Math.random()*arr_keys.length)] 
        arr.push({[key]:Math.floor(Math.random()*1000)})
    }
    document.getElementById("info").innerHTML = arr.map(item=>JSON.stringify(item)).join()
    arr_of_objs = arr
    return arr
}
// console.log(random_obj())


















function arr_loop(arr){
    console.log("ARR---",arr)
    // console.log("lenght--->",arr.length)
    let i = 0
    let name = "b"
    while (i< arr.length){
        // console.log(i)
        console.log(arr[i]) // {a:1}
        console.log(arr[i][name]) // 
        i++
        
    }
}

arr_loop([{a:1}, {b:3}, {a:2}])