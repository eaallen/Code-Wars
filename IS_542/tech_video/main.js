function sendIt() {
    console.log('sending')
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const subject = document.getElementById('subject').value
    const message = document.getElementById('message').value
    console.log(name, email, subject, message)

    const api_id = "AKfycbz-Ce58uBHxB_kG6ELzuwYjKlPsJtemSKF84ext-unkAftQMDNq79UvtkyZuEQwpyySag"
    const uri = `https://script.google.com/macros/s/${api_id}/exec`
    const encoded_data = encodeURI(JSON.stringify({ name: name, email: email, subject: subject, message: message }))
    const request = `${uri}?data=${encoded_data}`
    fetch(request).then(resp => resp.json()).then(data => console.log(data))
}