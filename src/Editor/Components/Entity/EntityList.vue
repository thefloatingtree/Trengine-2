<template>
    <div>
        <div class="field is-grouped">
            <div class="control is-expanded">
                <input
                    class="input"
                    type="text"
                    placeholder="Search for an Entity..."
                />
            </div>
            <div class="control">
                <button @click="addEntity()" class="button is-primary">
                    <span>Create Entity</span>
                    <span class="icon">
                        <font-awesome-icon icon="plus" />
                    </span>
                </button>
            </div>
        </div>
        <div class="wrapper">
            <entity :entity="e" v-for="e in entities" :key="e.id"></entity>
        </div>
    </div>
</template>

<script>
import { Treditor } from '../../Treditor';
import Entity from "./Entity.vue";
export default {
    components: { Entity },
    computed: {
        entities() {
            return this.$store.state.scene.entities
        }
    },
    methods: {
        addEntity() {
            Treditor.ECS.addEmptyEntity()
            this.$store.commit('updateScene', Treditor.ECS.scene)
        }
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 70vh;
}
</style>