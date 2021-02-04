class HTMLHelper {
    static anchor(volume) {
        return `<a name="v${volume.name}><a/>`
    }

    static fn() {
        return
    }

    static div(params) {
        let class_string = ''
        let content_string = ''
        let id_string = ''


        if (params.class_key !== undefined) {
            class_string = `class="${params.class_key}"`
        }

        if (params.content !== undefined) {
            content_string = params.content
        }

        if (params.id !== undefined) {
            id_string = `id="${params.class_key}"`
        }

        return `<div ${id_string} ${class_string}>${content_string}</div>`
    }

    static element(tag_name, content) {
        return `<${tag_name}>${content}</${tag_name}>`
    }

    static link(params) {
        let class_string = ''
        let content_string = ''
        let id_string = ''
        let href_string = ''

        if (params.class_key !== undefined) {
            class_string = `class="${params.class_key}"`
        }

        if (params.content !== undefined) {
            content_string = params.content
        }

        if (params.id !== undefined) {
            id_string = `id="${params.class_key}"`
        }

        if (params !== undefined) {
            href_string = `href=${params.href}`
        }

        return `<a ${id_string} ${class_string} ${href_string}>${content_string}</a>`
    }

    static hashLink(hash_args, content) {
        return `<a href="javascript:void(o)" onclick="changeHash(${hash_args})">
        ${content}
        </a>`
    }

}