
function handleSubmit(){
    let obj ={}
    obj.email = document.getElementById('inputEmail').value
    obj.text = document.getElementById('inputPassword').value

    console.log(encodeURI(JSON.stringify(obj)))
    let tag = document.createElement("script");
    tag.src = "https://script.google.com/macros/s/AKfycbyXoUiVgGyZmPKk8ZLJykH0LJpuWFlX_YPGSVW-pTzSeZNbwC0/exec?data="+encodeURI(JSON.stringify(obj))
    document.getElementsByTagName("head")[0].appendChild(tag)
}

function reviewInfo(){
    document.getElementById('modal_email').innerHTML = document.getElementById('inputEmail').value
    document.getElementById('modal_color').innerHTML = document.getElementById('inputPassword').value
}




function fire(){
    console.log("FIRE!")
    // window.location.href = './example.html'
}