import { mountVue, unmountVue } from "./Util/vueTools"


export class UIManager {
    constructor() {
        this.UILayers = new Map()
    }

    addVue(buildVue, name) {
        const vue = buildVue()
        const wrapper = mountVue(vue, name)
        this.UILayers.set(name, { vue, wrapper })
    }

    removeVue(name) {
        const { vue, wrapper } = this.UILayers.get(name)
        unmountVue(vue, wrapper)
    }
}