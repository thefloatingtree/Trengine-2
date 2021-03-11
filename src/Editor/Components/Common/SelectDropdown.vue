<template>
    <div
        class="dropdown"
        :class="{ 'is-active': isActive }"
        v-click-outside="handleClickOutside"
    >
        <div class="dropdown-trigger" @click="isActive = !isActive && !loading">
            <button
                class="button" :class="{ 'is-loading': loading }"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
            >
                <span>{{ selected }}</span>
                <span class="icon is-small">
                    <font-awesome-icon icon="angle-down" />
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <a
                    v-for="item in items"
                    class="dropdown-item"
                    :key="item"
                    :class="{ 'is-active': item === selected }"
                    @click="itemSelected(item)"
                    >{{ item }}</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

// Black magic from https://stackoverflow.com/questions/53013471/vuejs-2-custom-directive-to-close-when-clicked-outside-not-working
Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        window.event = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', window.event)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', window.event)
    },
});

export default {
    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        initial: {
            type: String,
            default() {
                return this.items[0]
            }
        },
        loading: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data() {
        return {
            isActive: false,
            selected: this.initial,
        };
    },
    methods: {
        itemSelected(item) {
            this.selected = item;
            this.isActive = false;

            this.$emit('item-selected', item)
        },
        handleClickOutside() {
            this.isActive = false;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>