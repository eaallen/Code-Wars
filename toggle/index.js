/***********************************************************
 * Create a class that can handle toggles indepentd of main 
 * 
 * 
 **********************************************************/
class Toggle {
    constructor(arr, start_idx){ // [], index of [] 
        this.arr = arr || [false, true]
        this.start_idx = start_idx || 0
    }

    toggle(){
        if(this.start_idx < this.arr.length - 1){
            this.start_idx ++
        }else{
            this.start_idx = 0
        }
        return this.arr[this.start_idx]
    }

    toggle_up(){
        this.toggle()
    }

    toggle_down(){
        if(this.start_idx === 0){
            this.start_idx = this.arr.length -1
        }else{
            this.start_idx -= 1
        }
        return this.arr[this.start_idx]
    }

    show(){
        return this.arr[this.start_idx]
    }
}

let tog = new Toggle(['a','b','c'])

function handle_click(){
    console.log(tog.toggle_down())
}
