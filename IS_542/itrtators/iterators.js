/*=======================================================================================
 * TITLE: iterators
 * AUTHOR: ELIJAH ALLEN
 * 
 * DESCRIPTION: This is why I am leanring how to use iterators. 
 *              Do not expect anythong super usefull in this file.
 * 
 * SOURCES: 
 *  MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
 *       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol
 * 
 ======================================================================================*/

// more syntax magic
function* gen(){
    yield* ['a','b','c','d']
}

console.log(gen().next())

// will iterate as expected
for(const item of gen()){
    console.log('>>>----->',item)
}


// Make my own iterable
const myIterable = {
    *[Symbol.iterator]() {
        yield 10
        yield 10
        yield 10
        yield 10
    }
}

for (const x of myIterable) {
    console.log('--->',x)
}


// Generator
function* makeIterator() {
    yield 1
    yield 'Elijah Allen'
}

const simpleIterator = makeIterator()

for (const item of simpleIterator) {
    console.log(item)
}
// as you can see if you run this code, the iterator can only be called once
for (const item of simpleIterator) {
    console.log(item)
}

// lets change this iterator so we can iterate many times
simpleIterator[Symbol.iterator] = function* () {
    for (let index = 0; index < 3; index++) {
        yield index
    }
}

for (const item of simpleIterator) {
    console.log(item)
}

for (const item of simpleIterator) {
    console.log(item)
}


console.log(simpleIterator[Symbol.iterator]() === simpleIterator)




function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iteration_count = 0
    for (let i = start; i < end; i += step) {
        iteration_count++
        yield i
    }
    return iteration_count
}

// const genIt = makeRangeIterator(1, 10, 2);

// let result = genIt.next();
// while (!result.done) {
//     console.log(result.value); // 1 3 5 7 9
//     result = genIt.next();
// }

// console.log("Iterated over sequence of size: ", result.value)


class RangeIterator {
    constructor(start = 0, end = Infinity, step = 1) {
        this.start = start
        this.end = end
        this.step = step // move up by this many
        this.iteration_count = 0 // keep track of how many iterations 
    }

    next() {
        let result
        if (this.start < this.end) {
            result = { value: this.start, done: false }
            this.start += this.step // step up
            this.iteration_count++
            return result
        }
        return { value: this.iteration_count, done: true }
    }
}

const it = new RangeIterator(1, 10, 2);

// let result = it.next();
// while (!result.done) {
//     console.log(result.value); // 1 3 5 7 9
//     result = it.next();
// }

// console.log("Iterated over sequence of size: ", result.value)