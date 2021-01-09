class Performance {
    
    performance = callback =>{
        const t0 = performance.now()
        callback()
        const t1 = performance.now()
        console.log(`Performance: ${(t2-t1)/1000} seconds`)
    }

}
const p = new Performance()
export default p