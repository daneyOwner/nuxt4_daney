<style scoped lang="scss">
.simSelect {
    position: relative;

    &__labelText {
        z-index: 1;
        position: absolute;
        left: calc(0.8rem - 4px);
        padding: 0 4px 0 4px;
        color: hsl(210deg, 2.9%, 86.7%);
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        pointer-events: none;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        transition-property: transform, color;
        transition-duration: 150ms, 150ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: 0s, 0s;
        transform-origin: left top;
        text-align: left;
        text-overflow: ellipsis;
        will-change: transform;
        top: 1px;
        line-height: 0;
        height: 14px;
        transform: translateY(-68%) scale(0.75);

        & > div {
            -webkit-user-select: all;
            -moz-user-select: all;
            user-select: all;
            pointer-events: all;
        }
    }

    :deep(.u-tooltip__content) {
        max-width: none !important;
    }
}
</style>

<template>
    <div class="simSelect" :class="classes">
        <label class="simSelect__labelText" v-if="title != null">
            {{ title }}
            <client-only>
                <u-tooltip arrow :popper="{ placement: 'top' }" class="inline-block!" :text="helpText">
                    <div>
                        <font-awesome-icon icon="fa-solid fa-circle-question" fixed-width />
                    </div>
                </u-tooltip>
            </client-only>
        </label>
        <u-select-menu value-key="id" label-key="text" ref="select2" :id="id" :items="options" 
                       :disabled="disabled" :required="required" v-model="val" :multiple="multiple"
                       :search-input="{
                          placeholder: 'Filter...',
                          icon: 'i-lucide-search'
                       }"
                       
                       @change="(change) => $emit('change', change)"
                       @blur="(closing) => $emit('closing', closing)"
                       @focus="(opening) => $emit('opening', opening)"
                       @clear="() => $emit('clear')">
        </u-select-menu>
    </div>
</template>

<script>
export default {
    name: "sim-select",
    props: {
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        options: {
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        title: null,
        helpText: null,
        modelValue: null,
        classes: null,
    },
    data() {
        return {
            val: null,
            items: Array,
        }
    },
    watch: {
        val: {
            handler: function (val, oldVal) {
                if (val == null) return;
                this.$emit("update:modelValue", val)
            },
            deep: true,
            immediate: true,
        },
        modelValue: {
            handler: function (val, oldVal) {
                this.val = val;
            },
            deep: true,
            immediate: true,
        },
    },
}
</script>