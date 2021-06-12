function start() {
  document.getElementById('sean').style.display = 'none'
  // sean.style.display = 
  let q = document.getElementById('question')
  q.style.display = 'none'
}

function gma() {
  let sean = document.getElementById('sean')
  sean.style.display = 'block'
  let q = document.getElementById('question')
  q.style.display = 'block'
}


function play() {
  var audio = new Audio('./heck_no.mp3');
  audio.play();
}
// play()
start()