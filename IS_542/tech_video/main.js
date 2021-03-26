// action="https://script.google.com/macros/s/AKfycbylM6jXM7aqwpsbBCa4wPvIYep543PLLbZGAtvo-U24zAUkESEPM4xPjOkeUT3uTUxz/exec"  
function getRequest(){
    // e.preventDefualt()
    const data = {
        email: document.getElementById('exampleInputEmail1').value,
        message:  document.getElementById('exampleFormControlTextarea1').value
    }

    console.log(data.email, data.message)

    // fetch API to send the data via JS to our email sender endpoint 
    const api_id = "AKfycbx_CmkoTlBHHTTOQdNEYNDhMZypu_5xmu1X24Pz23185YxH0dTbBwpAxPYWPF5YrVGP"
    const uri = `https://script.google.com/macros/s/${api_id}/exec`
    const encoded_data = encodeURI(JSON.stringify(data))
    const request = `${uri}?data=${encoded_data}`
    fetch(request).then(resp=>resp.json()).then(data=>console.log(data))
}