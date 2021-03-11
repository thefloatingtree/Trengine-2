<template>
    <div>
        <div class="level">
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
    padding-left: 3em;
}
.level {
    margin-bottom: 0;
}
.level-right {
    margin-right: 1em;
}
</style>