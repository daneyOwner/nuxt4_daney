<style scoped lang="scss">
.simInput {
    position: relative;

    &__input {
        transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        padding: 0;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        height: 33px;
        border: none;

        &__hasMax {
            padding-right: 4rem;
        }

        &:focus {
            box-shadow: none;
        }
    }
}
</style>

<template>
    <div class="simInput" :class="[classes]">
        <input type="color" id="input-" v-model="val" @focus="onFocus" @blur="onBlur" :disabled="disabled"
               :maxlength="max !== 0 ? max : ''" :style="inputStyle"
               class="form-control w-100 simInput__input pointer"/>
    </div>
</template>

<script>
import isNullOrEmpty from "@/isNullOrEmpty";

export default {
    name: "sim-color-input",
    props: {
        inputStyle: {
            default: "",
        },
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
        }
    },
    watch: {
        val: function (val, oldVal) {
            this.$emit("input", val)
            this.onFocus();
            this.onBlur();
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