<template>
    <div>
        <tabs>
            <tab title="Components">
                <component-list
                    :entity="entity"
                    :components="components"
                    v-if="subject"
                ></component-list>
            </tab>
            <tab title="Options"></tab>
        </tabs>
        <p v-if="!subject" class="has-text-grey">No entity selected</p>
    </div>
</template>

<script>
import HelloWorld from "../Common/HelloWorld.vue";
import Tab from "../Common/Tab.vue";
import Tabs from "../Common/Tabs.vue";
import ComponentList from "../Component/ComponentList.vue";
export default {
    props: ["subject"],
    components: { HelloWorld, Tabs, Tab, ComponentList },
    mounted() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type == "updateScene") {
                if (!this.subject) return;
                this.entity = {} // Force computed property to update
                this.entity = this.$store.state.scene.getEntityById(this.subject.id)
            }
        });
    },
    data() {
        return {
            entity: this.subject,
        };
    },
    computed: {
        components() {
            if (!this.subject) return [];
            return this.entity.getComponents();
        },
    },
    watch: {
        subject(newValue, oldValue) {
            this.entity = newValue
        }
    },
};
</script>

<style lang="scss" scoped>
</style>