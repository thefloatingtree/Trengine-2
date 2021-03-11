<template>
    <div class="columns is-mobile">
        <div class="column">
            <h1 v-if="!hideEditor" class="title">Editor</h1>
        </div>
        <div class="column is-narrow">
            <game-controls></game-controls>
        </div>
        <div class="column">
            <button
                v-if="!hideEditor"
                class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom is-pulled-right"
                data-tooltip="Editor Settings"
            >
                <span class="icon">
                    <font-awesome-icon icon="cog" />
                </span>
            </button>
        </div>
    </div>
</template>

<script>
import GameControls from '../GameControls.vue';
export default {
    computed: {
        hideEditor() {
            return this.$store.state.hideEditor
        }
    },
    components: { GameControls },};
</script>

<style lang="scss" scoped>
</style>