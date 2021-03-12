<template>
    <div>
        <div class="level my-2">
            <div class="level-left">
                <div class="level-item">
                    {{ componentName }}
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <checkbox @checked="onChecked($event)" :initial="entityHasComponent"></checkbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Treditor } from '../../Treditor';
import Checkbox from '../Common/Checkbox.vue';
export default {
    props: [ 'component', 'entity' ],
    components: { Checkbox },
    data() {
        return {
            checked: false,
        };
    },
    computed: {
        componentName() {
            return this.component.name
        },
        entityHasComponent() {
            return this.entity.hasComponent(this.component)
        }
    },
    methods: {
        onChecked(checked) {
            if (checked) {
                Treditor.ECS.scene
                    .getEntityById(this.entity.id)
                    .addComponentWithConstructor(this.component)
            } else {
                Treditor.ECS.scene
                    .getEntityById(this.entity.id)
                    .removeComponent(this.component)
            }
            this.$store.commit('updateScene', Treditor.ECS.scene)
        }
    },
};
</script>

<style lang="scss" scoped>
label {
    user-select: none;
}
</style>