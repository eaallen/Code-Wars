// testing for fetch
async function getData(url){
    const data = await fetch(url).then(success=>success.text()).catch(err=>console.error(err))
}
// getData()
let a = `https://scriptures.byu.edu/mapscrip/mapgetscrip.php?book=${1}&chap=${101}&verses=${''}` // bad HTTP request
getData(a)
// fetch('https://scriptures.byu.edu/mapscrip/model/volumes.php').then(success=>success.json()).then(data=>console.log(data))
