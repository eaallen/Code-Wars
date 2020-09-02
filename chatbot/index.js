// window.onload = build_ui
window.onload = build_ui
function build_ui(){
    let input = document.createElement('input')
    let btn = document.createElement("button")
    let title = document.createElement('div')
    let output = document.createElement('div')
    let br = document.createElement('br')
    input.id = "bot_input"

    title.id = "bot_title"
    title.innerHTML = "Assistant"
    // --------------------------------BTN----------------------------------
    btn.id = "bot_btn"
    btn.innerHTML = "submit"
    btn.onclick = fire

    output.id="bot_output"

    let div = document.createElement('div')
    div.id="bot"
    div.appendChild(title)
    div.appendChild(output)
    div.appendChild(input)
    div.appendChild(br)
    div.appendChild(btn)
    document.getElementsByTagName('body')[0].appendChild(div)
}

function fire(str){
    // http://localhost:5001/heraresult/us-central1/hera?data=about
    // axios.get('https://api.wit.ai/message',{
    //     headers:{'Authorization': 'Bearer NDE5TQ3JWRA327RQF2USO4TIQ7SW234B'},
    //     params:{
    //         'v': '20200819',
    //         'q': document.getElementById("bot_input").value,
    //     }
    // }).then(handle_data).catch(err=>document.getElementById('output').innerHTML = err)
    document.getElementById('output').innerHTML = ""
    axios.get('http://localhost:5001/heraresult/us-central1/hera',{
        // headers:{'Authorization': 'Bearer NDE5TQ3JWRA327RQF2USO4TIQ7SW234B'},
        params:{
            // 'v': '20200819',
            'data': document.getElementById("bot_input").value,
        }
    }).then(handle_data).catch(err=>document.getElementById('output').innerHTML = err)


}
function handle_data(resp){
    console.log(resp)
    let intent = resp.data.data.intents[0].name
    let entities = resp.data.data.entities
    document.getElementById('bot_output').innerHTML = intent + " : " + resp.data.data.intents[0].confidence
    console.log("DATA----->",show_bot_action(intent, {...entities}))
}

function show_bot_action(intent, obj){
    const intents = {
        IN_CHANGE_PAGE: change_page,
        IN_ELIJAHALLEN_GET_WEATHER:"handle intent only",
        IN_ELIJAHALLEN_GREETING: read_entity,
    }
    if(typeof intents[intent] === "function"){
       return intents[intent](obj)
    }
    return intents[intent]
    
    
}

function read_entity(obj){
    console.log(obj)
}

function change_page(entity){
    let cmd = entity['page_of_website:change_page'][0].value
    const links = {
        home: "https://codewarsdemos.firebaseapp.com/",
        about:"https://codewarsdemos.firebaseapp.com/Code-Wars/about/",
        index:"./"
    }
    window.location.href = links[cmd]
    return links[cmd]
}