<template>
    <div>
        <div class="level my-2">
            <div class="level-left">
                <div class="level-item">
                    {{ systemName }}
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <checkbox
                        @checked="onChecked($event)"
                        :initial="systemActive"
                    ></checkbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Treditor } from '../../Treditor';
import Checkbox from "../Common/Checkbox.vue";
export default {
    components: { Checkbox },
    props: ["system"],
    computed: {
        systemName() {
            return this.system.name;
        },
        systemActive() {
            return this.$store.state.scene.hasSystem(this.system);
        },
    },
    methods: {
        onChecked(checked) {
            if (checked) {
                Treditor.ECS.scene.addSystem(this.system)
            } else {
                Treditor.ECS.scene.removeSystem(this.system)
            }
            this.$store.commit('updateScene', Treditor.ECS.scene)
        },
    },
};
</script>

<style lang="scss" scoped>
</style>