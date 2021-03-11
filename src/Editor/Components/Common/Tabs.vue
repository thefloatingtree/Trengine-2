<template>
    <div>
        <div class="tabs">
            <ul>
                <li
                    v-for="(tab, index) in tabs"
                    :key="tab.title"
                    :class="{ 'is-active': index === selectedIndex }"
                    @click="selectTab(index)"
                >
                    <a>{{ tab.title }}</a>
                </li>
            </ul>
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedIndex: 0,
            tabs: [],
        };
    },
    created() {
        this.tabs = this.$children;
    },
    mounted() {
        this.selectTab(0);
    },
    methods: {
        selectTab(index) {
            this.selectedIndex = index

            this.tabs.forEach((tab, i) => {
                tab.isActive = i === index
            })

            this.$emit('onTabSelect', this.tabs[index].title)
        }
    },
};
</script>

<style lang="scss" scoped>
</style>