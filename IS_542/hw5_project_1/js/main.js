// put all my other functionas in here if they render somthing 


function main(data) {
   



}


function legeacyCode(){
    console.log('in the main function', data)
    const volume_names = data.map(x => {
        return { fullName: x.fullName, id: x.id }
    })
    console.log(volume_names)
    // ----------------------------Intializations---------------------------------
    const header = new UI('header')
    const navigator = new UI('navigator')
    navigator.pushElement(null, 'div', null,null,'<br><br><br>',null)
    
    
    for (const item of data) {
        const eventHandler = {
            name: 'click',
            method: ()=> {
                if(navigator.state.DOM.test){
                    navigator.removeChild(navigator.state.master.id,navigator.state.DOM.test)
                }
                // populate the navigator with nested data  
                navigator.pushElement(null, 'div', 'test', null, `<strong> ${item.books.map(x=>x.fullName).join('<br>')} </strong>`)
            }
        }
        header.pushElement('header', 'div', item.fullName, 'link', null, eventHandler)
        header.pushElement(item.fullName, 'div', null, null, `${item.fullName}`)
    }
}