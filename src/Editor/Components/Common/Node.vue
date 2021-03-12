<template>
    <div>
        <div class="level is-mobile mb-0 my-3">
            <div class="level-left pointer" @click="onClick">
                <div class="level-item">
                    <div class="icon">
                        <font-awesome-icon
                            :icon="expanded ? 'angle-down' : 'angle-right'"
                        />
                    </div>
                </div>
                <div class="level-item">
                    <slot name="parent" class="no-select"></slot>
                </div>
            </div>
            <div class="level-right pointer">
                <div class="level-item">
                    <slot name="options"></slot>
                </div>
            </div>
        </div>
        <div class="child">
            <slot class="child" name="child" v-if="expanded"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            expanded: false,
        };
    },
    methods: {
        onClick() {
            this.expanded = !this.expanded;
        },
    },
};
</script>

<style lang="scss" scoped>
.child {
    padding-left: 2.35rem;
}
.level-left:hover {
    cursor: pointer;
}
</style>