/*
Compute the ith Fibonacci number (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …)
Compute n! (factorial) for integer n ≥ 0
Compute the sum of all integers between two given integers (inclusive)
Given a number of cents, print to the browser console the corresponding U.S. 
    coins that total to the given number.  Print the solution that needs the fewest coins. 
    Only use pennies, nickels, dimes, and quarters.  
    Example: for 113, the answer is “4 quarters”, “1 dime”, “3 pennies”. 
    Do not print the case where the solution calls for 0 of the coin (e.g. don’t print “0 nickels”). 
    Use the singular word if the value is 1, or the plural if the coin count is greater than 1.
Feeling adventurous?  
    Hook up your code to a web interface that lets the user specify the inputs 
    and invoke the various methods at the click of a button.

Turn in on Learning Suite by submitting a PDF document of your web page that includes the 
JavaScript code for these four tasks.
*/
class Homework2 {

    centConverter = cents => {
        const quarter = Math.floor(cents / 25)
        const dime = Math.floor((cents - (quarter * 25)) / 10)
        const nickle = Math.floor((cents - (quarter * 25) - (dime * 10)) / 5)
        const penny = Math.floor((cents - (quarter * 25) - (dime * 10) - (nickle * 5)) / 1)

        const obj = { quarter: quarter, dime: dime, nickle: nickle, penny: penny }

        console.table(obj)
        let str = 'You have: '
        for (const key in obj) {
            key === 'penny'
                ? str += obj[key] ? `"${obj[key]} ${obj[key] > 1 ? 'pennies' : key}" ` : ''
                : str += obj[key] ? `"${obj[key]} ${obj[key] > 1 ? key + 's' : key}" ` : ''
        }
        return str
    }

    fibonacci = number => {
        let num = 1
        const arr = [0, 1]
        for (let i = 0; i < number; i++) {
            num = arr[0] + arr[1]
            arr.unshift(num)
        }
        return num
    }

    factorial = number => {
        let sum = number
        for (let i = number - 1; i > 0; i--) sum *= i
        return sum
    }

    sumBetweenInts = (a, b) => {
        let start = a <= b ? a : b // get the lowest number to start
        let end = start === a ? b : a
        let sum = 0
        for (let i = start; i <= end; i++) {
            sum += i
        }
        return sum
    }

}

const hw2 = new Homework2()
// console.log(hw2.factorial(4))
// console.log(hw2.fibonacci(10))
console.log(hw2.centConverter(2))


class DOMBuilder {
    createFunctionUI = (func, params) => {
       const form = document.createElement('form')
       form.setAttribute('id',params.id+'_form')
       
    }
}
