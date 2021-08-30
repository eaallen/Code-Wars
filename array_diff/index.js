function arrayDiff(a, b) {
  // put item in b in an object
  const obj = {}
  for(const item of b){
    obj[item] = true
  }

  const output = []
  for(const item of a){
    if(!obj[item]){
      output.push(item)
    }
  }

  return output
}