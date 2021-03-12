<template>
    <div>
        <div @click="show = true">
            <slot name="trigger"></slot>
        </div>
        <div class="modal" :class="{ 'is-active': show }">
            <div @click="show = false" class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <slot name="content"></slot>
                </div>
            </div>
            <button
                @click="show = false"
                class="modal-close is-large"
                aria-label="close"
            ></button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        };
    },
};
</script>

<style lang="scss" scoped>
</style>