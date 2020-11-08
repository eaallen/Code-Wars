function pigIt(str) {
    const pig = str.split(' ').map(x => {
        x = x.split('')
        const letter = x.shift()
        x.push(letter + "ay")
        return x.join('')
    })
    return pig.join(' ')

}
console.log(pigIt('eli awesome face.'))
