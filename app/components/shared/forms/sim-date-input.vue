<style scoped lang="scss">
.simInput {
    position: relative;

    &__black {
        background-color: hsl(0deg 0% 6%) !important;
    }

    &__input {
        margin-bottom: 0;
        border-radius: 3px;
        background-color: #202225;
        border-color: hsl(216, calc(1 * 7.2%), 13.5%);
        color: hsl(210, calc(1 * 2.9%), 86.7%);
        width: 100%;
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
        color: hsl(210, calc(1 * 2.9%), 86.7%);
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
    }

    &__labelTextFocus {
        top: 1px;
        line-height: 0;
        height: 2px;
        transform: translateY(-68%) scale(0.75);
    }

    &__labelTextFocused {
        height: 3px;
        line-height: 2px;
    }

    & > svg {
        position: absolute;
        top: 51%;
        right: 7px;
        transform: translateY(-50%);
    }
}
</style>

<template>
    <div class="simInput" :class="[classes]">
        <label class="simInput__labelText simInput__labelTextFocus simInput__labelTextFocused">{{ title }}</label>
        <input type="datetime-local" id="input-" v-model="val" :disabled="disabled"
               class="form-control w-100 simInput__input" :class="[inputClasses, {'simInput__black': black}]"
               :maxlength="max !== 0 ? max : ''"/>
        <u-tooltip text="Erase date">
            <font-awesome-icon class="pointer" icon="fa-solid fa-eraser"
                               @click="clearDate"></font-awesome-icon>
        </u-tooltip>
    </div>

</template>

<script>
export default {
    name: "sim-date-input",
    props: {
        value: {
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
        black: {
            default: false,
        },
    },
    watch: {
        val: function (val, oldVal) {
            this.$emit("input", val)
        },
        value: function (val, oldVal) {
            this.val = val;
        }
    },
    data() {
        return {
            val: "",
        }
    },
    methods: {
        clearDate() {
            this.$nextTick(() =>
                this.val = "")
        }
    }
}
</script>