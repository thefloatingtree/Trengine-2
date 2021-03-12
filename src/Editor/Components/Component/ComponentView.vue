<template>
    <div>
        <node>
            <div class="is-6 main no-select" slot="parent">
                {{ component.className() }}
            </div>
            <div slot="options">
                <button
                    @click="onDelete()"
                    class="button is-dark is-inverted has-tooltip-arrow has-tooltip-left is-pulled-right"
                    data-tooltip="Delete Component"
                >
                    <span class="icon">
                        <font-awesome-icon icon="trash" />
                    </span>
                </button>
            </div>
            <div slot="child">
                <component-property
                    @propertyChange="onPropertyChange($event)"
                    :property="componentProperty"
                    v-for="componentProperty in componentProperties"
                    :key="componentProperty"
                ></component-property>
            </div>
        </node>
    </div>
</template>

<script>
import { Treditor } from '../../Treditor';
import Node from "../Common/Node";
import ComponentProperty from "./ComponentProperty.vue";
export default {
    components: { Node, ComponentProperty },
    props: ["component"],
    computed: {
        componentProperties() {
            return Object.getOwnPropertyNames(this.component).map(
                (propertyName) => {
                    return {
                        name: propertyName,
                        value: this.component[propertyName],
                        type: typeof this.component[propertyName],
                    };
                }
            );
        },
    },
    methods: {
        onPropertyChange(property) {
            this.$emit('propertyChange', { component: this.component, property })
        },
        onDelete() {
            this.$emit('delete', this.component)
        }
    },
};
</script>

<style lang="scss" scoped>
</style>