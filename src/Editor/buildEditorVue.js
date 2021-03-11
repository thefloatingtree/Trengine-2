import Vue from 'vue'
import Vuex from 'vuex'
import Editor from './Editor'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleRight, faClone, faCog, faEdit, faFolderOpen, faPause, faPlay, faPlus, faSave, faSearch, faStop, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Treditor } from './Treditor'

export function buildEditorVue() {

    require('./assets/main.scss')

    
    library.add(faPlay, faPause, faStop, faSave, faClone, faFolderOpen, faEdit, faPlus, faCog, faSearch, faAngleDown, faAngleRight, faTrash)
    Vue.component('font-awesome-icon', FontAwesomeIcon)

    Vue.use(Vuex)

    const store = new Vuex.Store({
        state: {
            scene: Treditor.ECS.scene,
            hideEditor: false
        },
        mutations: {
            updateScene(state, updatedScene) {
                state.scene = updatedScene
            },
            hideEditor(state) {
                state.hideEditor = true
            },
            showEditor(state) {
                state.hideEditor = false
            }
        }
    })

    return new Vue({
        store,
        render: h => h(Editor)
    })
}