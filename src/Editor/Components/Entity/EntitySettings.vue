<template>
    <tabs>
        <tab title="Components">
            <hello-world></hello-world>
        </tab>
        <tab title="Options"></tab>
    </tabs>
</template>

<script>
import HelloWorld from '../Common/HelloWorld.vue';
import Tab from '../Common/Tab.vue';
import Tabs from '../Common/Tabs.vue';
export default {
    components: { HelloWorld, Tabs, Tab },};
</script>

<style lang="scss" scoped>
</style>