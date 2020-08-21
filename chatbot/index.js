window.onload = build_ui
function build_ui(){
    let input = document.createElement('input')
    let btn = document.createElement("button")
    btn.innerHTML = "submit"
    let div = document.createElement('div')
    div.appendChild(input)
    div.appendChild(btn)
    div.style.position = "absolute";
    div.style.right = "5%"
    div.style.bottom = "5%"
    document.getElementsByTagName('body')[0].appendChild(div)
}

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
    let entities = resp.data.entities
    document.getElementById('output').innerHTML = intent + " : " + resp.data.intents[0].confidence
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