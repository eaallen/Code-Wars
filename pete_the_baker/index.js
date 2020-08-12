/***********************************************************************************************************
 * Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. 
 * Can you help him to find out, how many cakes he could bake considering his recipes?
 * 
 * Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and 
 * returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts
 * (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, 
 * can be considered as 0. 
 * ***********************************************************************************************************/
function cakes(recipe, available) {
    let obj ={}
    if(!compareKeys(recipe, available)) {return 0} // handle amount of ingrendient for recipe
    for(const KEY in recipe){
        obj[KEY] = Math.floor(available[KEY] / recipe[KEY])
    }
    console.log(obj)
    return Math.min(...Object.values(obj))
}

function compareKeys(a, b) {
    for(const item of Object.keys(a).sort()){
        // do we have all the ingredients
        if(!Object.keys(b).sort().includes(item)){return false}
        // do we have enough 
        if(b[item] < a[item]){return false}
    }
    return true
}

console.log(cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200})) // retuern 2