<template>
    <div class="level is-mobile">
        <div class="level-left">
            <div class="level-item">
                <h5 class="subtitle">Untitled Scene</h5>
            </div>
            <div class="level-item">
                <button
                    class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom"
                    data-tooltip="Edit Scene Name"
                >
                    <span class="icon">
                        <font-awesome-icon icon="edit" />
                    </span>
                </button>
            </div>
        </div>
        <div class="level-right">
            <scene-controls></scene-controls>
        </div>
    </div>
</template>

<script>
import SceneControls from './SceneControls.vue';
export default {
    components: { SceneControls },};
</script>

<style lang="scss" scoped>
</style>