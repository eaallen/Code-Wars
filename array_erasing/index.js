function arrayErasing(arr) {
  console.log(arr)
  let res = 0
  while (arr.length > 0) {
    const idx_consec_map = {}
    let original_idx
    let found = false
    for (let i = 0; i < arr.length - 1; i++) {
      let k = i + 1
      original_idx = i
      while (arr[i] === arr[k]) {
        idx_consec_map[original_idx] = 1 + idx_consec_map[original_idx] || 2
        i++
        k++
        found = true
      }
      if(found){
        break
      }
    }

    if(!found){
      arr.pop()
    }else{
      arr.splice(original_idx, idx_consec_map[original_idx])
    }
    res ++

    console.log('-->',arr)
  }


  return res

}

console.log(arrayErasing([1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1]))