class UI {
    ui = {
        div: null,
        p: null,
        ol: null,
        ul: null,
        li: null,
        a: null,
    }

    state = {
        DOM: {},
        master: {
            node: null,
            id: null
        },
    }

    constructor(master_div_id) {
        // createing the parent div
        this.state.master.div = document.getElementById(master_div_id)
        this.state.master.id = master_div_id
        this.state.DOM[master_div_id] = []

        // DOM creating functions 
        for (const key of Object.keys(this.ui)) {
            this.ui[key] = (id, class_name, inner_html = '', eventHandler = null) => {
                // create element
                const element = document.createElement(key)


                // add class name
                element.setAttribute('class', class_name ? class_name : `${master_div_id} ${master_div_id}-${key}`)

                // add eventListener
                if (eventHandler && eventHandler.name && eventHandler.method) {
                    element.addEventListener(eventHandler.name, eventHandler.method, false)
                }

                element.innerHTML = inner_html

                // add ID
                if (id) {
                    element.setAttribute('id', id)
                    this.state.DOM[id] = element
                }

                return element
            }
        }
    }

    pushElement(parent_node_id, tag_name, id, class_name, inner_html, eventHandler) {
        const element = this.ui[tag_name](id, class_name, inner_html, eventHandler)
        this.appendChild(parent_node_id, element)
    }

    // can only append nodes that have ID's
    appendChild(parent_node_id, element) {
        if (parent_node_id) {
            document.getElementById(parent_node_id).appendChild(element)
        } else {
            this.state.master.div.appendChild(element)
        }

    }

    removeChild = (parent_node_id, child) => {
        if (parent_node_id) {
            document.getElementById(parent_node_id).removeChild(child)
        } else {
            this.state.master.div.removeChild(child)
        }
    }


}