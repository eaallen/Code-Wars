function* gen(array){
    yield* array
}

const a = gen([1,2,3,4,5,6,7,8,9,0])
for(const item of a){
    console.log(item)
}
for(const item of a){
    console.log(item)
}