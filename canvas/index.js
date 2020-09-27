class LoadingBar{
    state = {
        ctx: null,
        width: 400,
        height: 100,
        counter: 0,
        hue: 0,
        max:100
    }

    constructor(id, width, height, max){
        this.state.ctx = document.getElementById(id).getContext('2d')
        this.state.width = width
        this.state.height = height
        this.state.max = max
    }

    draw = (ctx) =>{
        ctx.fillstyle = '777'
        
    }
}