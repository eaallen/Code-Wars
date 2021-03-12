class HTMLHelper {
    static anchor(volume) {
        return `<a name="${volume.name}"><a/>`
    }

    static div(params) {
        let class_name = ''
        let content = ''
        let id = ''


        if (params.class_name !== undefined) {
            class_name = `class="${params.class_name}"`
        }

        if (params.content !== undefined) {
            content = params.content
        }

        if (params.id !== undefined) {
            id = `id="${params.id}"`
        }

        return `<div ${id} ${class_name}>${content}</div>`
    }

    static element(tag_name, content) {
        return `<${tag_name}>${content}</${tag_name}>`
    }

    static link(params) {
        let class_name = ''
        let content = ''
        let id = ''
        let href = ''

        if (params.class_name !== undefined) {
            class_name = `class="${params.class_name}"`
        }

        if (params.content !== undefined) {
            content = params.content
        }

        if (params.id !== undefined) {
            id = `id="${params.id}"`
        }

        if (params !== undefined) {
            href = `href=${params.href}`
        }

        return `<a ${id} ${class_name} ${href}>${content}</a>`
    }

    static hashLink(hash_args, content) {
        return `<a href="#${hash_args}" >
        ${content}
        </a>`
    }

    static createOnClickById(node_id, callback){
        document.getElementById(node_id).addEventListener('click',callback)
    }

}