/**
 * AUTHOR: ELIJAH ALLEN
 * NOTES:
 * This code is used for testing potential emplyees in the most epic of software 
 * development roles. Viewing this code while takeing the test is prohibited. 
 */
class TestMachineArray {
  constructor() {
    this.array = this.generateArray()
  }
  generateArray = () => {
    const arr = []
    for (let i = 0; i < 2000; i++) {
      arr.push(Math.floor(Math.random() * 10000))
    }
    return arr
  }

  mergeSort(arr = this.array) {
    // terminating clause
    if (arr.length <= 1) {
      return arr
    }
    const mid = Math.floor(arr.length / 2)
    const arr_a = arr.slice(0, mid)
    const arr_b = arr.slice(mid, arr.length)

    return this.merge(this.mergeSort(arr_a), this.mergeSort(arr_b))
  }

  merge = (arr_a, arr_b) => {
    let a_idx = 0
    let b_idx = 0
    const sorted_array = []
    while (a_idx < arr_a.length && b_idx < arr_b.length) {
      if (arr_a[a_idx] <= arr_b[b_idx]) {
        sorted_array.push(arr_a[a_idx])
        a_idx++
      }
      if (arr_b[b_idx] < arr_a[a_idx]) {
        sorted_array.push(arr_b[b_idx])
        b_idx++
      }
    }

    const left_over = a_idx >= arr_a.length
      ? arr_b.slice(b_idx)
      : arr_a.slice(a_idx)
    return [...sorted_array, ...left_over]

  }
  split = (arr) => {
    if (arr_a.length > 2) {
      this.split(arr_a)
    }
    if (arr_b.length > 2) {
      this.split(arr_b)
    }
    return [arr_a, arr_b]
  }
  test = (answerCallback, dom_id) => {
    for (let i = 0; i < 50; i++) {
      const arr = this.generateArray()
      const unique = new Set(this.mergeSort(arr))
      const my_answer = [...unique][1]
      const your_answer = answerCallback(arr)
      const correct = your_answer === my_answer ? '<p style="color:green">Passed' : '<p style="color:red">Failed'
      document.getElementById(dom_id).innerHTML += `${correct}, Your Answer: ${your_answer},  My Answer: ${my_answer} <br> </p>`
    }
  }
}
