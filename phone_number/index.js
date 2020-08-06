/***********************************************************
 * turn an array of 10 numbers into a phone number string
 **********************************************************/

function createPhoneNumber(numbers){
    let str = numbers.join('')
    let match_arr = str.match(/^(\d{3})(\d{3})(\d{4})$/)
    return `(${match_arr[1]}) ${match_arr[2]}-${match_arr[3]}`
}

let phone = createPhoneNumber([1,2,3,4,5,6,7,8,9,0])
console.log(phone)