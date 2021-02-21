// as of ES 11 (2020)
// you can use the (?.) to chain objects together, if the object is undefuend 
// instead of the normal error message undefiund will be returned 
// see MDN for more details: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

const test_optional_chaning = (obj) => {
    try {
        console.log('not optional chaning:',obj.person.isMafia())
    } catch (e) {
        console.error('error caused by not optional chaning:',e)
    } finally {
        console.log('optional chaining:',obj?.person?.isMafia?.())
    }
    return 'done with test'
}

const obj = {
    person: {
        name: 'eli',
        // isMafia(){
        //     return `${this.name} is ${Math.floor(Math.random()*2)? '' : 'not'} mafia`
        // }
    }
}

test_optional_chaning(obj)