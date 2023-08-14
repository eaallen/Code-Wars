/**
 * a and b are of type Node
 * return whether there is a route from a to b
 * @param {any} a a node
 * @param {any} b a node
 * @returns {boolean}
 */
function getRoute(a, b) {
    const nodeQueue = [...a.edges]
    const visitedNodes = new Set()
    let currentNode

    if (!a.edges.length) {
        return false
    }
    
    while (currentNode = nodeQueue.shift()) {
        if (!visitedNodes.has(currentNode)) {
            // we have already been to this node, we should skip it and most importantly not add its edges
            nodeQueue.push(...currentNode.edges)
            visitedNodes.add(currentNode)
        }
        if (currentNode.value === b.value){
            // we found it!
            return true
        }
    }


    return false;
}


class Node {
    constructor (value, edges = []) {
      this.value = value;
      this.edges = edges;
    }
  }

const E = new Node('E'), D = new Node('D'), C = new Node('C');
const B = new Node('B', [C, D]);
const A = new Node('A', [B, C]);