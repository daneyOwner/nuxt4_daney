<style scoped lang="scss">
.simInput {
    position: relative;

    input[type=checkbox] {
        cursor: pointer;
    }

    &__black {
        background-color: hsl(0deg 0% 6%) !important;
    }

    &__input {
        border-radius: 3px;
        background-color: #202225;
        border-color: hsl(216, calc(1 * 7.2%), 13.5%);
        color: hsl(210, calc(1 * 2.9%), 86.7%);
        width: 100%;
        margin-bottom: 0;
        transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        padding: .4rem 1.5rem .2rem .75rem;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;

        &__hasMax {
            padding-right: 4rem;
        }

        &:focus {
            box-shadow: none;
        }
    }

    &__labelText {
        position: absolute;
        left: calc(.8rem - 4px);
        top: 50%;
        height: auto;
        padding: 0 4px 0 4px;
        color: #999;
        user-select: none;
        pointer-events: none;
        transform: translateY(-50%);
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        transition-property: transform, color;
        transition-duration: 150ms, 150ms;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: 0s, 0s;
        transform-origin: left top;
        text-align: left;
        text-overflow: ellipsis;
        will-change: transform;

        & > div {
            -webkit-user-select: all;
            -moz-user-select: all;
            user-select: all;
            pointer-events: all;
        }
    }

    &__labelTextFocus {
        top: 1px;
        line-height: 0;
        height: 2px;
        color: hsl(210, calc(1 * 2.9%), 86.7%);
        transform: translateY(-68%) scale(0.75);
    }

    &__labelTextFocused {
        height: 3px;
        line-height: 2px;
    }

    &__charCounter {
        top: 50.5%;
        transform: translateY(-50%);
        right: 8px;
        color: grey;
        font-size: 12px;
        position: absolute;
    }
}
</style>

<template>
    <div class="simInput" :class="[classes]">
        <label class="simInput__labelText" :class="[labelClasses]">
            {{ title }}
            <client-only>
                <u-tooltip arrow :popper="{ placement: 'top' }" class="inline-block!" :text="helpText">
                    <div>
                        <font-awesome-icon icon="fa-solid fa-circle-question" fixed-width />
                    </div>
                </u-tooltip>
            </client-only>
        </label>
        <input :type="type" id="input-" v-model="val" @focus="onFocus" @blur="onBlur"
               @keydown.enter.prevent="$emit('keydown')" :disabled="disabled"
               class="form-control w-100 simInput__input"
               :class="[inputClasses, {'simInput__input__hasMax': max !== 0}, {'simInput__black': black}]"
               :maxlength="max !== 0 ? max : ''"/>
        <span v-if="hasCounter" class="simInput__charCounter position-absolute">{{
                val?.length == null ? 0 : val?.length
            }}{{ max !== null ? " / " + max : "" }}</span>
    </div>
</template>

<script>
import isNullOrEmpty from "~~/isNullOrEmpty";

export default {
    name: "sim-input",
    props: {
        type: {
            default: "text",
        },
        modelValue: {
            default: null,
        },
        max: {
            default: null,
        },
        title: {
            default: "",
        },
        classes: {
            default: "",
        },
        inputClasses: {
            default: "",
        },
        disabled: {
            default: false,
        },
        hasCounter: {
            default: true,
        },
        black: {
            default: false,
        },
        helpText: null,
    },
    watch: {
        val: {
            handler: function (val, oldVal) {
                this.$emit('update:modelValue', val);
                this.onFocus();
                this.onBlur();
            },
            deep: true,
        },
        modelValue: {
            handler: function (val, oldVal) {
                this.val = val;
            },
            deep: true,
            immediate: true,
        },
    },
    data() {
        return {
            labelClasses: "",
            val: "",
        }
    },
    methods: {
        onFocus() {
            this.labelClasses = "simInput__labelTextFocus simInput__labelTextFocused";
        },
        onBlur() {
            if (isNullOrEmpty(this.val)) {
                this.labelClasses = "";
            } else {
                this.labelClasses = "simInput__labelTextFocus";
            }
        },
    },
    mounted() {
        if (!isNullOrEmpty(this.val)) {
            this.labelClasses = "simInput__labelTextFocus simInput__labelTextFocused";
        }
    }
}
</script>