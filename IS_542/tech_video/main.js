function sendIt() {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const subject = document.getElementById('subject').value
    const message = document.getElementById('message').value

    const api_id = GOOGLE_APP_ID
    const uri = `https://script.google.com/macros/s/${api_id}/exec`
    const encoded_data = encodeURI(JSON.stringify({ name: name, email: email, subject: subject, message: message }))
    const request = `${uri}?data=${encoded_data}`
    fetch(request).then(resp => resp.json()).then(data => console.log(data))
}