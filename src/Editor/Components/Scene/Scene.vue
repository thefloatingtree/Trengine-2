<template>
    <div>
        <scene-nav-bar></scene-nav-bar>

        <div class="columns is-mobile">
            <div class="column">
                <tabs @onTabSelect="onMainTabSelect($event)">
                    <tab title="Entities">
                        <entity-list @entitySelected="onEntitySelect($event)"></entity-list>
                    </tab>
                    <tab title="Systems">
                        <system-list @systemSelected="onSystemSelect($event)"></system-list>
                    </tab>
                    <tab title="Singletons">
                        <singleton-list></singleton-list>
                    </tab>
                    <tab title="Bundles">
                        <bundle-list></bundle-list>
                    </tab>
                </tabs>
            </div>
            <div class="column">
                <component :subject="rightColumnSubject" :is="rightColumnComponent"></component>
            </div>
        </div>
    </div>
</template>

<script>
import BundleList from '../Bundle/BundleList.vue';
import BundleSettings from '../Bundle/BundleSettings.vue';
import Empty from '../Common/Empty.vue';
import Tab from "../Common/Tab.vue";
import Tabs from "../Common/Tabs.vue";
import EntityList from "../Entity/EntityList.vue";
import EntitySettings from "../Entity/EntitySettings.vue";
import SingletonList from '../Singleton/SingletonList.vue';
import SingletonSettings from '../Singleton/SingletonSettings.vue';
import SystemList from '../System/SystemList.vue';
import SystemSettings from "../System/SystemSettings.vue";
import SceneNavBar from "./SceneNavBar.vue";
export default {
    components: {
        SceneNavBar,
        EntityList,
        SystemList,
        Tabs,
        Tab,
        EntitySettings,
        SystemSettings,
        Empty,
        BundleSettings,
        BundleList,
        SingletonList,
        SingletonSettings,
    },
    mounted () {
        this.$store.state.eventBus.$on('createScene', () => {
            this.onEntitySelect(null)
        });
    },
    computed: {
        rightColumnSubject() {
            return this.subjectLUT[this.selectedMainTabTitle];
        },
        rightColumnComponent() {
            return {
                Entities: "entity-settings",
                Systems: "system-settings",
                Singletons: "singleton-settings",
                Bundles: "bundle-settings",
            }[this.selectedMainTabTitle];
        },
    },
    data() {
        return {
            selectedMainTabTitle: "Entities",
            subjectLUT: {
                Entities: null,
                Systems: null,
                Singletons: null,
                Bundles: null,
            }
        };
    },
    methods: {
        onMainTabSelect(tabTitle) {
            this.selectedMainTabTitle = tabTitle;
        },
        onEntitySelect(entity) {
            this.subjectLUT = { ...this.subjectLUT, Entities: entity }
        },
        onSystemSelect(system) {
            this.subjectLUT = { ...this.subjectLUT, Systems: system }
        }
    },
};
</script>

<style lang="scss" scoped>
</style>