// this is a way to handle tempaltes
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
const tag = function (strings, name, level) {
    let rank = ''
    if(level < 3)  rank = 'noob'
    else if(level < 5)  rank = 'crook'
    else if(level < 7)  rank = 'hitman'
    else if(level < 9)  rank = 'boss'
    else if(level >= 9)  rank = 'godfather'

    return `${strings[0]}${name.toUpperCase()}${strings[1]}${rank}${strings[2]}`
}
let _name = 'eli'
let level = Math.floor(Math.random()*11)
console.log
let str = tag `here is ${_name}, he is a mafia ${level}!`
console.log(str)