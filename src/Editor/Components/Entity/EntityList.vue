<template>
    <div>
        <div class="field is-grouped">
            <div class="control is-expanded">
                <input
                    v-model="searchValue"
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
            <entity
                @click="selectEntity(e)"
                :class="{ selected: e.id == selectedEntity.id }"
                :entity="e"
                v-for="e in filteredEntities"
                :key="e.id"
            ></entity>
            <p
                v-if="searchValue && !filteredEntities.length"
                class="has-text-grey"
            >
                No entities match "{{ searchValue }}"
            </p>
        </div>
    </div>
</template>

<script>
import { Treditor } from "../../Treditor";
import Entity from "./Entity.vue";
export default {
    components: { Entity },
    mounted() {
        this.$store.state.eventBus.$on("loadScene", () => {
            this.selectEntity(this.filteredEntities[0]);
        });
        this.$store.state.eventBus.$on("deleteEntity", (entity) => {
            if (entity.id === this.selectedEntity.id) {
                this.selectEntity(this.filteredEntities[0]);
            }
        });
    },
    data() {
        return {
            searchValue: "",
            selectedEntity: { id: "" },
        };
    },
    computed: {
        filteredEntities() {
            const entities = this.$store.state.scene.entities;
            const filteredEntities = entities.filter((entity) =>
                entity.id.toLowerCase().includes(this.searchValue.toLowerCase())
            );
            return this.searchValue.length == 0 ? entities : filteredEntities;
        },
    },
    methods: {
        addEntity() {
            Treditor.ECS.addEmptyEntity();
            this.$store.commit("updateScene", Treditor.ECS.scene);
            this.selectEntity(this.filteredEntities[0]);
        },
        selectEntity(entity) {
            this.selectedEntity = entity;
            this.$emit("entitySelected", entity);
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 70vh;
}
.selected {
    border-style: solid;
    border-width: 1px;
    border-color: black;
}
</style>