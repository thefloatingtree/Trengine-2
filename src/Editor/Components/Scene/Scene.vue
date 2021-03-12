<template>
    <div>
        <scene-nav-bar></scene-nav-bar>

        <div class="columns is-mobile">
            <div class="column">
                <tabs @onTabSelect="onMainTabSelect($event)">
                    <tab title="Entities">
                        <entity-list @entitySelected="onEntitySelect($event)"></entity-list>
                    </tab>
                    <tab title="Systems"></tab>
                    <tab title="Singletons"></tab>
                    <tab title="Bundles"></tab>
                </tabs>
            </div>
            <div v-if="rightColumnComponent !== 'empty'" class="column">
                <component :subject="rightColumnSubject" :is="rightColumnComponent"></component>
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
                Singletons: "empty",
                Bundles: "empty",
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
        }
    },
};
</script>

<style lang="scss" scoped>
</style>