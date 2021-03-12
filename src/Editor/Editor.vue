<template>
    <editor-container>
        <editor-nav-bar></editor-nav-bar>
        <keep-alive>    
            <scene v-if="showScene"></scene>
        </keep-alive>
    </editor-container>
</template>

<script>
import EditorNavBar from './Components/Editor/EditorNavBar.vue';
import Scene from './Components/Scene/Scene.vue';
import EditorContainer from './Components/Editor/EditorContainer.vue';
export default { 
    computed: {
        showScene() {
            return !this.$store.state.hideEditor
        }
    },
    components: { EditorNavBar, Scene, EditorContainer },
};
</script>

<style lang="scss" scoped>
</style>