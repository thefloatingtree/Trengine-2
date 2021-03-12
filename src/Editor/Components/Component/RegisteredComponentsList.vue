<template>
    <div>
        <input
            v-model="searchValue"
            class="input mb-2"
            type="text"
            placeholder="Search for a registered component..."
        />
        <registered-component-view
            :component="c"
            :entity="entity"
            v-for="c in filteredRegisteredComponents"
            :key="c"
        ></registered-component-view>
    </div>
</template>

<script>
import { Treditor } from "../../Treditor";
import RegisteredComponentView from "./RegisteredComponentView.vue";
export default {
    components: { RegisteredComponentView },
    props: ["entity"],
    data() {
        return {
            searchValue: ""
        }
    },
    computed: {
        filteredRegisteredComponents() {
            const components = Treditor.ECS.getRegisteredComponents();
            const filteredComponents = components.filter(component => component.name.toLowerCase().includes(this.searchValue.toLowerCase()))
            return this.searchValue.length == 0 ? components : filteredComponents 
        }
    },
};
</script>

<style lang="scss" scoped>
</style>