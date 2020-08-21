function fire(str){
    axios.get('https://api.wit.ai/message',{
        headers:{'Authorization': 'Bearer NDE5TQ3JWRA327RQF2USO4TIQ7SW234B'},
        params:{
            'v': '20200819',
            'q': str,
        }
    }).then(handle_data).catch(err=>document.getElementById('output').innerHTML = err)
    // document.getElementById('output').innerHTML = ""

}
function handle_data(resp){
    console.log(resp)
    let intent = resp.data.intents[0].name
    document.getElementById('output').innerHTML = intent + " : " + resp.data.intents[0].confidence
}