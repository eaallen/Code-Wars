/*
Given a positive number n > 1 find the prime factor decomposition of n.
 The result will be a string with the following form :

 "(p1**n1)(p2**n2)...(pk**nk)"
with the p(i) in increasing order and n(i) empty if n(i) is 1.

Example: n = 86240 should return "(2**5)(5)(7**2)(11)"
*/

function primeFactors(n) {
  const prime_numbers = {}
  let prime = 2
  while (prime <= n) {
    if (n % prime === 0) {
      // found a prime number of n
      prime_numbers[prime] = 1 + prime_numbers[prime] || 1
      n = n / prime
    } else {
      prime++
    }
  }
  console.log(prime_numbers)
  // create the output
  str = ''
  for (const key in prime_numbers) {
    const value = prime_numbers[key]
    str += `(${key}${value > 1 ? '**' + value : ''})`
  }
  return str
}

console.log(primeFactors(86240))