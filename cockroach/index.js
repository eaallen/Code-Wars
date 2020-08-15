function cockroachSpeed(speed) {
    document.getElementById("answer").innerHTML = Math.floor(speed * 100000/60/60).toString() + " cm/sec"
    return Math.floor(speed * 100000/60/60)
}
