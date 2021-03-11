<template>
    <div>
        <scene-nav-bar></scene-nav-bar>

        <div class="columns">
            <div class="column">
                <tabs @onTabSelect="onMainTabSelect($event)">
                    <tab title="Entities">
                        <entity-list></entity-list>
                    </tab>
                    <tab title="Systems"></tab>
                    <tab title="Singletons"></tab>
                    <tab title="Bundles"></tab>
                </tabs>
            </div>
            <div class="column">
                <component :is="rightColumnComponent"></component>
            </div>
        </div>
    </div>
</template>

<script>
import Empty from '../Common/Empty.vue';
import Tab from "../Common/Tab.vue";
import Tabs from "../Common/Tabs.vue";
import EntityList from "../Entity/EntityList.vue";
import EntitySettings from "../Entity/EntitySettings.vue";
import SystemSettings from "../System/SystemSettings.vue";
import SceneNavBar from "./SceneNavBar.vue";
export default {
    components: {
        SceneNavBar,
        EntityList,
        Tabs,
        Tab,
        EntitySettings,
        SystemSettings,
        Empty,
    },
    computed: {
        rightColumnComponent() {
            return {
                Entities: "entity-settings",
                Systems: "system-settings",
                Singetons: "empty",
                Bundles: "empty",
            }[this.selectedMainTabTitle];
        },
    },
    data() {
        return {
            selectedMainTabTitle: "Entities",
        };
    },
    methods: {
        onMainTabSelect(tabTitle) {
            this.selectedMainTabTitle = tabTitle;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>