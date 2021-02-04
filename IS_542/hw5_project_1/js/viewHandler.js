export class ViewHanlder{
    current_state = null
    prev_state = null
    
    constructor(state){
        this.current_state = state
    }

    setState(new_state){
        // only rnder if state is different 
        if(new_state !== this.current_state){
            this.prev_state = this.current_state
            this.current_state = new_state
            this.render()
        }
    }

    render(){

    }
}