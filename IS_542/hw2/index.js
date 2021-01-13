
class Homework2 {
    /*
    Given a number of cents, print to the browser console the corresponding U.S. 
    coins that total to the given number.  Print the solution that needs the fewest coins. 
    Only use pennies, nickels, dimes, and quarters.  
    Example: for 113, the answer is “4 quarters”, “1 dime”, “3 pennies”. 
    Do not print the case where the solution calls for 0 of the coin (e.g. don’t print “0 nickels”). 
    Use the singular word if the value is 1, or the plural if the coin count is greater than 1.
    */
    centConverter = cents => {
        const quarter = Math.floor(cents / 25)
        const dime = Math.floor((cents - (quarter * 25)) / 10)
        const nickle = Math.floor((cents - (quarter * 25) - (dime * 10)) / 5)
        const penny = 
            Math.floor((cents - (quarter * 25) - (dime * 10) - (nickle * 5)) / 1)

        const obj = { quarter: quarter, dime: dime, nickle: nickle, penny: penny }

        console.table(obj)
        let str = 'You have: '
        for (const key in obj) {
            // would love to get some feed back on 
            // line (27) not sure if this is good or bad practice, 
            // i have an if statementshich is only here 
            // for one particular case, "Penny v Pennies"
            key === 'penny'
                ? str += obj[key] 
                    ? `"${obj[key]} ${obj[key] > 1 
                        ? 'pennies' 
                        : key}" ` 
                    : '' 
                : str += obj[key] 
                    ? `"${obj[key]} ${obj[key] > 1 
                        ? key + 's' 
                        : key}" ` 
                    : ''
        }
        return str
    }

    // Compute the ith Fibonacci number 
    // (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, …)
    fibonacci = number => {
        let num = 1
        const arr = [0, 1]
        for (let i = 0; i < number; i++) {
            num = arr[0] + arr[1]
            arr.unshift(num)
        }
        return num
    }

    // Compute n! (factorial) for integer n ≥ 0
    factorial = number => {
        let sum = number
        for (let i = number - 1; i > 0; i--) sum *= i
        return sum
    }

    // Compute the sum of all integers
    //  between two given integers (inclusive)
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
console.log(hw2.sumBetweenInts(12,4))
console.log(hw2.factorial(4))
console.log(hw2.fibonacci(10))
console.log(hw2.centConverter(11861))


class DOMBuilder {
    createFunctionUI = (func, params) => {
        const form = document.createElement('form')
        form.setAttribute('id', params.id + '_form')

    }
}
