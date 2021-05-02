let seconds = 120
function countDown() {
  let min = Math.floor(seconds / 60)
  let rem = seconds % 60
  if (rem < 10) {
    rem = "0" + rem
  }

  if (seconds > 0) {
    const ui = `${min}:${rem}`
    write("count_down", ui)
  } else {
    write("count_down", "BOOM!")
    var audio = new Audio('s.mp3');
    audio.play();
  }

  if (seconds >= 1) {
    seconds = seconds - 1
    setTimeout(countDown, 1000)
  }
}
function button() {
  seconds = seconds - 15
}
function write(id, value) {
  document.getElementById(id).innerText = value
}


// start count down when page loads
document.addEventListener("DOMContentLoaded", () => {
  countDown()
});

