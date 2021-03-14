<template>
    <div>
        <component-list
            :entity="singletonEntity"
            :components="singletonEntity.getComponents()"
        ></component-list>
    </div>
</template>

<script>
import ComponentList from "../Component/ComponentList.vue";
export default {
    components: {
        ComponentList,
    },
    data() {
        return {
            updateComputed: 0
        }
    },
    mounted() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type == "updateScene") {
                this.updateComputed++
            }
        });
    },
    computed: {
        singletonEntity() {
            this.updateComputed
            return this.$store.state.scene.singletonComponents;
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