
const testFunction = function () {
    let value = 0
    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1
        },
        getValue: () => value
    }
}()

const stringValidator = function () {
    let is_valid = null
    return {
        isNumeric: text => {
            // rewrite
            text.match(/[^\-][^\d][^\.][^\d]/g) ? is_valid = false : is_valid = true
            typeof parseFloat(text) === 'number' ? is_valid = true : is_valid = false
            return is_valid
        },
        isInteger: text => {
            text.match(/[^\-][^\d]/g) ? is_valid = false : is_valid = true
            return is_valid
        },
        isPositiveInteger: text => {
            if (!text.match(/[^\d]/g) && text > 0) is_valid = true
            else is_valid = false
            return is_valid
        },
        isNonNegetiveInteger: text => {
            if (!text.match(/[^\d]/g)) is_valid = true
            else is_valid = false
            return is_valid
        },
        isInRange: (text, m, n) => {
            const min = m >= n ? n : m
            const max = min === n ? m : n
            // const num = 
            // if()
            return is_valid
        },
        isValidEmail: text => { },
        isNonEmpty: text => { },
        lengthIsInRange: text => { },
        matchesRegex: text => { },
        isValid: text => { },
        reset: () => { is_valid = null },
    }
}()

console.log(parseFloat("1.@"))
console.log(stringValidator.isNonNegetiveInteger('1e2'))





console.table({
    isNumeric: stringValidator.isNumeric('--124'),
    isInteger: stringValidator.isInteger('-12-'),
    isPositiveInteger: stringValidator.isPositiveInteger('2'),
    isNonNegetiveInteger: stringValidator.isNonNegetiveInteger('0'),
    isInRange: null,
})