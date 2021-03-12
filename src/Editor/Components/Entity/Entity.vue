<template>
    <div @click="onClick()" class="level mr-3 is-mobile">
        <div class="level-left">
            <div class="level-item">
                <p>{{ entity.id }}</p>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <button
                    class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom is-pulled-right"
                    data-tooltip="Edit Entity Name"
                >
                    <span class="icon">
                        <font-awesome-icon icon="edit" />
                    </span>
                </button>
            </div>
            <div class="level-item">
                <button
                    class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom is-pulled-right"
                    data-tooltip="Duplicate Entity"
                >
                    <span class="icon">
                        <font-awesome-icon icon="clone" />
                    </span>
                </button>
            </div>
            <div class="level-item">
                <button
                    @click="onDelete()"
                    class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom is-pulled-right"
                    data-tooltip="Delete Entity"
                >
                    <span class="icon">
                        <font-awesome-icon icon="trash" />
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { Treditor } from "../../Treditor";
export default {
    props: ["entity"],
    methods: {
        onDelete() {
            Treditor.ECS.scene.removeEntity(this.entity);
            this.$store.commit("updateScene", Treditor.ECS.scene);
        },
        onClick() {
            this.$emit("click", this.entity);
        },
    },
};
</script>

<style lang="scss" scoped>
.level {
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: lightgrey;

    padding: 0.5rem 1rem 0.5rem 1rem;

    box-shadow: 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);

    &:hover {
        border-color: grey;
        cursor: pointer;
    }
}
</style>