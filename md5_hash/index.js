function passHash(str) {
    return require('crypto').createHash('md5').update(str).digest('hex')
}