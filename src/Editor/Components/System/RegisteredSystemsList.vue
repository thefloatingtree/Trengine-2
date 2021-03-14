<template>
    <div>
        <input
            v-model="searchValue"
            class="input mb-2"
            type="text"
            placeholder="Search for a registered system..."
        />
        <registered-system-view
            :system="s"
            v-for="s in filteredRegisteredSystems"
            :key="s"
        ></registered-system-view>
    </div>
</template>

<script>
import { Treditor } from "../../Treditor";
import RegisteredSystemView from './RegisteredSystemView.vue';
export default {
    components: { RegisteredSystemView },
    data() {
        return {
            searchValue: ""
        }
    },
    computed: {
        filteredRegisteredSystems() {
            const systems = Treditor.ECS.getRegisteredSystems()
            const filteredSystems = systems.filter(system => system.name.toLowerCase().includes(this.searchValue.toLowerCase()))
            return this.searchValue.length == 0 ? systems : filteredSystems 
        }
    },
};
</script>

<style lang="scss" scoped>
</style>