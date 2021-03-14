<template>
    <div @click="onClick()" class="level mr-3 is-mobile">
        <div class="level-left">
            <div class="level-item">
                <p>{{ bundle }}</p>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <button
                    @click="onDelete()"
                    class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom is-pulled-right"
                    data-tooltip="Delete Bundle"
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
import { Treditor } from '../../Treditor';
export default {
    props: ["bundle"],
    methods: {
        onDelete() {
            Treditor.ECS.scene.removeBundle(this.bundle);
            this.$store.commit("updateScene", Treditor.ECS.scene);
        },
        onClick() {
            this.$emit("click", this.bundle);
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