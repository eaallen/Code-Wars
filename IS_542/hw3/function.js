console.log('big test')

Function.prototype.addMethod = function(name,func){
    this.prototype[name] = func
    return this
}

String.addMethod('condense',function(){
    return this.replace(/\s+/g,' ')
})

Number.addMethod('floatEquals', function(x,y){
    return Math.abs(x - y) < Number.EPSILON;
})

console.log('A  E  I  O  U'.condense())
console.log('A  E  I  O  U')

console.log(Number().floatEquals(0.1+0.2,0.3))