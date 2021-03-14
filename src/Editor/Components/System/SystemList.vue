<template>
    <div>
        <div class="field is-grouped">
            <div class="control is-expanded">
                <input
                    v-model="searchValue"
                    class="input"
                    type="text"
                    placeholder="Search for a System..."
                />
            </div>
            <modal>
                <button
                    slot="trigger"
                    class="button is-primary"
                >
                    <span>Add System</span>
                    <span class="icon">
                        <font-awesome-icon icon="plus" />
                    </span>
                </button>
                <div slot="content">
                    <registered-systems-list></registered-systems-list>
                </div>
            </modal>
        </div>
        <div class="wrapper">
            <system
                @click="selectSystem(s)"
                :system="s"
                v-for="s in filteredSystems"
                :key="s"
                :class="{ selected: s == selectedSystem }"
            ></system>
            <p
                v-if="searchValue && !filteredSystems.length"
                class="has-text-grey"
            >
                No systems match "{{ searchValue }}"
            </p>
        </div>
    </div>
</template>

<script>
import { Treditor } from "../../Treditor";
import Modal from '../Common/Modal.vue';
import RegisteredSystemsList from './RegisteredSystemsList.vue';
import System from "./System.vue";
export default {
    components: { System, Modal, RegisteredSystemsList },
    mounted() {
        this.$store.state.eventBus.$on("loadScene", () => {
            this.selectSystem(this.filteredSystems[0]);
        });
    },
    data() {
        return {
            searchValue: "",
            selectedSystem: {},
        };
    },
    computed: {
        filteredSystems() {
            const systems = this.$store.state.scene.systems;
            const filteredSystems = systems.filter((system) =>
                system.constructor.name
                    .toLowerCase()
                    .includes(this.searchValue.toLowerCase())
            );
            return this.searchValue.length == 0 ? systems : filteredSystems;
        },
    },
    methods: {
        selectSystem(system) {
            this.selectedSystem = system;
            this.$emit("systemSelected", system);
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 70vh;
}
.selected {
    border-style: solid;
    border-width: 1px;
    border-color: black;
}
</style>