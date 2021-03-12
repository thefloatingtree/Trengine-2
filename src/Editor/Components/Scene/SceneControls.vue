<template>
    <div class="field is-grouped">
        <div class="control">
            <button
                @click="createScene()"
                class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom"
                data-tooltip="Create a New Scene"
            >
                <span class="icon">
                    <font-awesome-icon icon="plus" />
                </span>
            </button>
        </div>
        <div class="control">
            <button
                @click="openScene()"
                class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom"
                data-tooltip="Open"
            >
                <span class="icon">
                    <font-awesome-icon icon="folder-open" />
                </span>
            </button>
        </div>
        <div class="control">
            <button
                class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom"
                data-tooltip="Save"
            >
                <span class="icon">
                    <font-awesome-icon icon="save" />
                </span>
            </button>
        </div>
        <div class="control">
            <button
                @click="saveSceneAs()"
                class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom"
                data-tooltip="Save As"
            >
                <span class="icon">
                    <font-awesome-icon icon="clone" />
                </span>
            </button>
        </div>
    </div>
</template>

<script>
import { Treditor } from "../../Treditor.js";
import { remote } from "electron";
import { promises as fs } from "fs";

export default {
    methods: {
        createScene() {
            const scene = Treditor.ECS.loadEmptyScene()
            this.$store.commit('updateScene', scene)
            this.$store.state.eventBus.$emit('createScene', scene)
        },
        async openScene() {
            const { filePaths, canceled } = await remote.dialog.showOpenDialog({ properties: ["openFile"] })
            if (canceled) return
            const rawData = await fs.readFile(filePaths[0])
            const sceneData = JSON.parse(rawData)
            const scene = await Treditor.ECS.loadScene(sceneData)
            this.$store.commit('updateScene', scene)
            this.$store.state.eventBus.$emit('loadScene', scene)
        },
        async saveScene() {

        },
        async saveSceneAs() {
            const { filePath, canceled } = await remote.dialog.showSaveDialog({ defaultPath: "scene.level.json" })
            if (canceled) return
            const scene = Treditor.ECS.serializeScene()
            const serializedScene = JSON.stringify(scene)
            await fs.writeFile(filePath, serializedScene)
        }
    },
};
</script>

<style lang="scss" scoped>
</style>