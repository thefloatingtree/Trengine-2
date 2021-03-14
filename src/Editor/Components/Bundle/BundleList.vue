<template>
    <div>
        <div class="field has-addons">
            <div class="control is-expanded">
                <input
                    v-model="bundleInput"
                    class="input"
                    type="text"
                    placeholder="Add a bundle..."
                />
            </div>
            <div class="control">
                <button @click="onAddBundle()" class="button is-primary">
                    <span>Add Bundle</span>
                    <span class="icon">
                        <font-awesome-icon icon="plus" />
                    </span>
                </button>
            </div>
        </div>

        <div v-for="bundle in bundles" :key="bundle">
            <bundle :bundle="bundle"></bundle>
        </div>
    </div>
</template>

<script>
import { Treditor } from '../../Treditor';
import Bundle from "./Bundle.vue";
export default {
    components: { Bundle },
    data() {
        return {
            bundleInput: "",
        };
    },
    computed: {
        bundles() {
            return this.$store.state.scene.bundles;
        },
    },
    methods: {
        onAddBundle() {
            Treditor.ECS.scene.addBundle(this.bundleInput)
            this.$store.commit("updateScene", Treditor.ECS.scene);
            this.bundleInput = ""
        }
    },
};
</script>

<style lang="scss" scoped>
</style>