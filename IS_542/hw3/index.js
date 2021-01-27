/************************************************************
HW 4, I used a contact form from online. I only needed to 
validate for empty inputs and corect email address.  
*************************************************************/

const stringValidator = function () {
    let is_valid = null
    const validation_messages = {
        is_non_empty: {
            msg: 'required',
            pass: null,
        },
        is_valid_email: {
            msg: 'Must be a valid email address',
            pass: null,
        },
    }
    return {
        isNumeric: function (text_array) {
            for (const txt of text_array) {
                if (isNaN(txt)) {
                    is_valid = false
                    return false
                }
            }
            is_valid = true
            return is_valid
        },
        isInteger: function (text) {
            if (this.isNumeric([text])) {
                is_valid = text.match(/[^\-][^\d]/g) ? false : true
                return is_valid
            }
            return is_valid
        },
        isPositiveInteger: function (text) {
            if (this.isNumeric([text])) {
                is_valid = (!text.match(/[^\d]/g) && text > 0) ? true : false
                return is_valid
            }
            return is_valid
        },
        isNonNegetiveInteger: function (text) {
            if (this.isNumeric([text])) {
                is_valid = (!text.match(/[^\d]/g) && text >= 0) ? true : false
                return is_valid
            }
            return is_valid
        },
        isInRange: function (text, m, n) {
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
        isValidEmail: function (text) {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            is_valid = regex.test(String(text).toLowerCase())
            validation_messages.is_valid_email.pass = is_valid
            return is_valid
        },
        isNonEmpty: function (text) {
            is_valid = (text === '') ? false : true
            validation_messages.is_non_empty.pass = is_valid
            return is_valid
        },
        lengthIsInRange: function (text, m, n) {
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
        matchesRegex: function (text, regex) {
            is_valid = regex.test(String(text).toLowerCase())
            return is_valid
        },
        isValid: () => is_valid,
        reset: () => is_valid = null,
        getValidationMessages: function () {
            return validation_messages
        }
    }
}()


// console.table({
//     isNumeric: stringValidator.isNumeric('-2'),
//     isInteger: stringValidator.isInteger('3.0'),
//     isPositiveInteger: stringValidator.isPositiveInteger('1'),
//     isNonNegetiveInteger: stringValidator.isNonNegetiveInteger('2'),
//     isInRange: stringValidator.isInRange('2', '0', '4'),
//     isValidEmail: stringValidator.isValidEmail('kandy3kane@gmail.com'),
//     lengthIsInRange: stringValidator.lengthIsInRange('hello', 2, 100),
//     matchesRegex: stringValidator.matchesRegex('hello world', /\s/g),
//     isNonEmpty:stringValidator.isNonEmpty(''),
//     isValid: stringValidator.isValid(),
// })

// console.table({...stringValidator.getValidationMessages()})

const shouldSubmit = function (){
    let form_is_valid = true
    return{
        passForm(bool){
            if(form_is_valid !== false){
                form_is_valid = bool
            }
        },
        shouldSubmit(){
            return form_is_valid
        }
    }
}()

function onSubmit() {
    const { email, message, name, subject } = document.getElementsByClassName('input1')
    const output = document.getElementById('output')
    output.innerHTML = ''
    const validation_error_message = {
        email: [],
        message: [],
        name: [],
        subject: [],
    }
    console.log(email.value)
    const array_of_inputs = [email, message, name, subject]

    // Check all for empty strings
    for (const el of array_of_inputs) {
        stringValidator.isNonEmpty(el.value)
        const validation_results = stringValidator.getValidationMessages()
        if(!validation_results.is_non_empty.pass){
            shouldSubmit.passForm(validation_results.is_non_empty.pass)
            validation_error_message[el.name].push(`${validation_results.is_non_empty.msg}`)
        }
 
    }

    // Validate email address 
    if (!stringValidator.isValidEmail(email.value)) {
        shouldSubmit.passForm(false)
        validation_error_message[email.name].push('must have correct email')
    }

    console.table(validation_error_message)

    for (const key of Object.keys(validation_error_message)) {
        if (validation_error_message[key].length > 0) {
            output.innerHTML += `<p class='output-msg'>
                ${key}: ${handleList(validation_error_message[key])}
            </p>`
        }
    }



}


function handleList(list) {
    switch (list.length) {
        case 1:
            return list[0] + '.'
        case 2:
            return list[0] + ' and ' + list[1] + '.'
        default:
            let str = ''
            for (let i = 0; i < list.length; i++) {
                if (i < list.length - 1) {
                    str += `${list[i]}${i !== list.length - 2 ? ', ' : ' and '}`
                } else {
                    str += list[i]
                }
            }
            str += '.'
            return str
    }
}


