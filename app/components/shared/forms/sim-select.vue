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
                <u-tooltip :popper="{ placement: 'top' }" class="!inline-block" :text="helpText" :open="true">
                    <div>
                        <font-awesome-icon icon="fa-solid fa-circle-question" fixed-width />
                    </div>
                </u-tooltip>
            </client-only>
        </label>
        <select2 ref="select2" :id="id" :name="name" :options="options" :disabled="disabled" :required="required"
                 :settings="settings"
                 v-model="val"
                 @change="(change) => $emit('change', change)" @select="(select) => $emit('select', select)"
                 @closing="(closing) => $emit('closing', closing)" @close="(close) => $emit('close', close)"
                 @opening="(opening) => $emit('opening', opening)" @open="(open) => $emit('open', open)"
                 @clearing="(clearing) => $emit('clearing', clearing)"
                 @clear="(clear) => $emit('clear', clear)">
        </select2>
    </div>
</template>

<script lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
    name: "sim-select",
    components: {FontAwesomeIcon},
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
            type: Array,
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
        settings: {
            type: Object,
            default: () => {
            }
        },
        title: null,
        helpText: null,
        modelValue: null,
        classes: null,
    },
    data() {
        return {
            val: null,
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
    mounted() {
        setTimeout(() => {
            this.$refs.select2.$el.querySelectorAll(".select2-selection__rendered")[0].removeAttribute("title");
        }, 2000);
    }
}
</script>