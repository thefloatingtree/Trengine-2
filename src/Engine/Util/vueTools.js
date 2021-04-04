import { uuidv4 } from './Util'

export function mountVue(vue, id = "app") {
    const wrapper = document.createElement('div')
    wrapper.id = id
    wrapper.style.position = "absolute"
    wrapper.style.width = "100vw"
    wrapper.style.height = "100vh"
    document.body.insertBefore(wrapper, document.body.firstChild)

    const root = document.createElement('div')
    const rootId = 'app-' + uuidv4()
    root.id = rootId
    wrapper.appendChild(root)

    vue.$mount(`#${rootId}`)

    return wrapper
}

export function unmountVue(vue, root) {
    vue.$destroy()
    root.remove()
}