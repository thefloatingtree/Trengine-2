<template>
    <div>
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <modal>
                        <button
                            slot="trigger"
                            @click="onAddComponent()"
                            class="button is-primary"
                        >
                            <span>Add Component</span>
                            <span class="icon">
                                <font-awesome-icon icon="plus" />
                            </span>
                        </button>
                        <div slot="content">
                            <registered-components-list
                                :entity="entity"
                            ></registered-components-list>
                        </div>
                    </modal>
                </div>
            </div>
            <div class="level-right"></div>
        </div>
        <component-view
            @propertyChange="onPropertyChange($event)"
            @delete="onDeleteComponent($event)"
            :component="c"
            v-for="c in components"
            :key="c.className()"
        ></component-view>
        <p v-if="components.length === 0" class="has-text-grey">
            No components to display
        </p>
    </div>
</template>

<script>
import { Treditor } from "../../Treditor";
import Modal from "../Common/Modal.vue";
import ComponentView from "./ComponentView.vue";
import RegisteredComponentsList from "./RegisteredComponentsList.vue";
export default {
    props: ["components", "entity"],
    components: { ComponentView, Modal, RegisteredComponentsList },
    methods: {
        onAddComponent() {},
        onPropertyChange({ component, property }) {
            Treditor.ECS.scene
                .getEntityById(this.entity.id)
                .getComponentByInstance(component)[property.name] = property.value
        },
        onDeleteComponent(component) {
            Treditor.ECS.scene
                .getEntityById(this.entity.id)
                .removeComponentByInstance(component)
            this.$store.commit('updateScene', Treditor.ECS.scene)
        }
    },
};
</script>

<style lang="scss" scoped>
</style>