function pigIt(str) {
    str = str.toString()
    const pig = str.split(' ').map(x => {
        if (x.charCodeAt(0) >= 65) {
            x = x.split('')
            if (x.length < 2) {
                return x.join('') + 'ay'
            }
            const letter = x.shift()
            // use ascii to determin what the char is
            x[x.length - 1].charCodeAt(0) >= 65 ? x.push(letter + "ay") : x.splice((x.length - 1), 0, (letter + 'ay'))
            return x.join('')
        } else {
            return x
        }
    })
    return pig.join(' ')
}

function submit(){
    document.getElementById('output').innerHTML = pigIt(document.getElementById('input').value)
}