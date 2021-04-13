/**
 * AUTHOR: ELIJAH ALLEN
 * NOTES:
 * This code is used for testing potential emplyees in the most epic of software 
 * development roles. Viewing this code while takeing the test is prohibited. 
 */
class AllenTree {
  constructor(value) {
    this.root = null
    if (value) this.root = this.createNode(value)
  }

  createNode(value) {
    let height = null
    return {
      value: value,
      left: null,
      right: null,
      height: height,
      depth: null,
    }
  }

  getHeight = (root) => {
    let height = 0
    if (root) {
      height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1
      root.height = height - 1
    }
    return height
  }
  search(value) {
    const searchHelper = (node, value) => {
      if (node.value === value || node.value === null) {
        return node.count
      } else if (node.value > value) {
        searchHelper(node.left, value)
      } else {
        searchHelper(node.right, value)
      }
    }
    return searchHelper(this.root, value)
  }

  // insert will not self ballence
  insert(value) {
    const _insert = (node, value) => {
      if (this.root === null) {
        this.root = this.createNode(value)
      } else if (value === node.value) {
        console.error('only unique values')
        return false
      } else if (value < node.value) {
        // go Left
        // check for balence
        node.is_balenced = this.nodeIsBalenced(node)
        if (node.left === null) {
          node.left = this.createNode(value)
          return true
        } else {
          _insert(node.left, value) // step into next node
        }
      } else if (value > node.value) {
        // go right
        // check for balence
        node.is_balenced = this.nodeIsBalenced(node)
        if (node.right === null) {
          node.right = this.createNode(value)
          return true
        } else {
          _insert(node.right, value) // step into next node
        }
      } else {
        console.error('Logic Error in AllenTree Insert Method')
      }

    }
    return _insert(this.root, value)
  }

  add(data) {
    const _insert = (root, node) => {
      // if(node.value===70) debugger
      if (!root) {
        root = node
      } else if (node.value < root.value) {
        // go left
        root.left = _insert(root.left, node)
        if (root.left !== null && !this.nodeIsBalenced(root)) {
          // rotation
          if (root.left.value > node.value) { // node is on left 
            root = this.rotateLL(root)
          } else {
            root = this.rotateLR(root)
          }
        }
      } else if (node.value > root.value) {
        // go right
        root.right = _insert(root.right, node)
        if (root.right !== null && !this.nodeIsBalenced(root)) {
          // rotation 
          if (root.right.value < node.value) { // node is on left 
            root = this.rotateRR(root)
          } else {
            root = this.rotateRL(root)
          }
        }
      }
      return root
    }

    const node = this.createNode(data)
    if (!this.root) {
      this.root = node
    } else {
      this.root = _insert(this.root, node)
    }
    return
  }
  rotateLL(root) {
    const z = root
    const y = root.left
    const x = root.left.left

    z.left = y.right

    y.left = x
    y.right = z

    return y
  }

  rotateLR(root) {
    const z = root
    const y = root.left
    const x = root.left.right

    z.left = x.right
    y.right = x.left

    x.right = z
    x.left = y
    return x
  }


  rotateRR(root) {
    const z = root
    const y = root.right
    const x = root.right.right

    z.right = y.left


    y.right = x
    y.left = z

    return y
  }
  rotateRL(root) {
    const z = root
    const y = root.right
    const x = root.right.left

    z.right = x.left
    y.left = x.right

    x.left = z
    x.right = y
    return x
  }

  inspect() { console.log(this) }

  getTreeHeight() {
    return this.getHeight(this.root)
  }
  /**
   * returns true if the differance of depth in 
   * node.left and node.right is less than 2
   * @param {object} node 
   * @returns {true}
   */
  nodeIsBalenced(node) {
    return Math.abs(this.getHeight(node.left) - this.getHeight(node.right)) < 2
  }

  traverse(root = this.root, valuesOnly = true) {
    // const arr = []
    // arr.push(root.value,root.left.value,root.right.value)

    const queue = []
    const arr = []
    if (!root) return

    queue.push(root)
    while (queue.length) {
      let temp = queue.shift()
      // console.log(temp)
      arr.push(valuesOnly ? temp.value : temp)
      if (temp.left) queue.push(temp.left)
      if (temp.right) queue.push(temp.right)
    }
    return arr
  }

  findNodesAtKDepthMaster(k) {
    let trav_count = 0
    const arr= []
    const traverse = (node) => {
      if (node.left && trav_count < k) {
        trav_count++
        traverse(node.left)
      }
      if (node.right && trav_count < k) {
        trav_count++
        traverse(node.right)
      }
      if (trav_count >= k) {
        arr.push(node.value)
      }
      trav_count --
    }
    traverse(this.root)
    return arr
  }

  // overrider
  findNodesAtKDepth(callback){
  }

  populate(){
    for (let i = 1; i < 50; i++) {
      this.add(i)
    }
  }

  test(callback, dom_id){
    const k = 3
    const s = ', '
    const your_array = callback(k, this.root)
    const my_array = this.findNodesAtKDepthMaster(k)
    let message = `<p style='color:green;'>success, your array: ${your_array.join(s)} <br> is the same as my array ${my_array.join(s)}</p>`

    for(const item of my_array){
      if(!your_array.includes(item)){
        message = `<p style='color:red;'>falure, your array: ${your_array.join(s)} <br> is not the same as my array ${my_array.join(s)}</p>`
        break
      }
    }
    document.getElementById(dom_id).innerHTML = message
  }
}
