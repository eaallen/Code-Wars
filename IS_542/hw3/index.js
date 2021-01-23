/************************************************************
It took me about 3 hours to complete this assigment
The most part was easy, that hardest part was actually figuring 
out if a number was NaN or not. Once I realized that isNaN was the method I 
need then things got alot better.

I learned that I should be using function instead of =>
so that I can call the function with this.
*************************************************************/

const stringValidator = function () {
    let is_valid = null
    return {
        isNumeric:  function(text_array){
            for (const txt of text_array) {
                if (isNaN(txt)) {
                    is_valid = false
                    return false
                }
            }
            is_valid = true
            return is_valid
        },
        isInteger: function(text) {
            if (this.isNumeric([text])) {
                is_valid = text.match(/[^\-][^\d]/g) ? false : true
                return is_valid
            }
            return is_valid
        },
        isPositiveInteger: function(text) {
            if (this.isNumeric([text])) {
                is_valid = (!text.match(/[^\d]/g) && text > 0) ? true : false
                return is_valid
            }
            return is_valid
        },
        isNonNegetiveInteger: function(text) {
            if (this.isNumeric([text])) {
                is_valid = (!text.match(/[^\d]/g) && text >= 0) ? true : false
                return is_valid
            }
            return is_valid
        },
        isInRange: function(text, m, n) {
            if (this.isNumeric([text, m, n])) {
                m = parseFloat(m)
                n = parseFloat(n)
                const min = m >= n ? n : m
                const max = min === n ? m : n
                const num = parseFloat(text)
                if (num >= min && num <= max) {
                    is_valid = true
                    return is_valid
                }
                is_valid = false
                return is_valid
            }
            return is_valid
        },
        isValidEmail: function(text) {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            is_valid = regex.test(String(text).toLowerCase())
            return is_valid
        },
        isNonEmpty: function(text) {
            is_valid = (text === '') ? false : true
            return is_valid
        },
        lengthIsInRange: function(text, m, n){
            if (this.isNumeric([m, n])) {
                m = parseFloat(m)
                n = parseFloat(n)
                const min = m >= n ? n : m
                const max = min === n ? m : n
                const num = text.length
                if (num >= min && num <= max) {
                    is_valid = true
                    return is_valid
                }
                is_valid = false
                return is_valid
            }
            return is_valid
        },
        matchesRegex: function(text, regex) {
            is_valid = regex.test(String(text).toLowerCase())
            return is_valid
        },
        isValid: () => is_valid,
        reset: () => is_valid = null,
    }
}()


console.table({
    isNumeric: stringValidator.isNumeric('-2'),
    isInteger: stringValidator.isInteger('-2'),
    isPositiveInteger: stringValidator.isPositiveInteger('1'),
    isNonNegetiveInteger: stringValidator.isNonNegetiveInteger('2'),
    isInRange: stringValidator.isInRange('2', '0', '4'),
    isValidEmail: stringValidator.isValidEmail('kandy3kane@gmail.com'),
    lengthIsInRange: stringValidator.lengthIsInRange('hello', 2, 100),
    matchesRegex: stringValidator.matchesRegex('hello world', /\s/g),
    isValid: stringValidator.isValid(),
})


// test API


