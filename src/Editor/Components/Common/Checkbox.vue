<template>
    <div>
        <button
            @click="onChecked()"
            class="button is-inverted"
            :class="{ 'is-dark': !checked, 'is-primary': checked }"
        >
            <span class="icon">
                <font-awesome-icon :icon="checked ? 'check-square' : 'square'" />
            </span>
        </button>
    </div>
</template>

<script>
export default {
    props: [ "initial" ],
    data() {
        return {
            checked: this.initial
        }
    },
    methods: {
        onChecked() {
            this.checked = !this.checked
            this.$emit('checked', this.checked)
        }
    },
    watch: {
        initial(newValue, oldValue) {
            this.checked = newValue
        }
    },
};
</script>

<style lang="scss" scoped>
</style>