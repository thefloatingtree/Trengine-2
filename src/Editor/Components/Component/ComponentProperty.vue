<template>
    <div>
        <div class="columns mb-0 is-mobile">
            <div class="column py-2 is-one-quarter has-text-right">
                <span class="mr-2">{{ property.name }}</span>
            </div>
            <div class="column py-2">
                <input
                    v-if="property.type !== 'object'"
                    class="input is-small"
                    type="text"
                    :value="property.value"
                    :placeholder="property.type"
                    @input="onPropertyChange($event.target.value)"
                />
                <textarea
                    v-if="property.type === 'object'"
                    class="textarea is-small"
                    placeholder="e.g. Hello world"
                    :value="stringifiedValue"
                    rows="1"
                    @input="onPropertyChange($event.target.value)"
                ></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { convertToType } from '../../Util/convertToType'
export default {
    props: ["property"],
    computed: {
        stringifiedValue() {
            return JSON.stringify(this.property.value)
        }
    },
    methods: {
        onPropertyChange(newValue) {
            if (newValue === "") return
            let value
            try {
                value = convertToType(newValue, this.property.type)
            } catch {
                return
            }
            const newProperty = { 
                ...this.property, 
                value 
            }
            this.$emit('propertyChange', newProperty)
        }
    },
};
</script>

<style lang="scss" scoped>
</style>