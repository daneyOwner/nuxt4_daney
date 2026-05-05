<style scoped lang="scss">
.simTextArea {
    position: relative;

    &__black {
        background-color: hsl(0deg 0% 6%) !important;
    }
    
    &__textarea {
        margin-bottom: 0;
        border-radius: 3px;
        width: 100%;
        background-color: #202225;
        border-color: hsl(216, calc(1 * 7.2%), 13.5%);
        color: hsl(210, calc(1 * 2.9%), 86.7%);
        transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        line-height: 25px;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        font-size: 1rem;

        &:focus {
            box-shadow: none;
        }
    }

    &__labelText {
        position: absolute;
        left: calc(.8rem - 4px);
        top: 25px;
        padding: 0 4px 0 4px;
        color:  #999;
        user-select: none;
        pointer-events: none;
        font-size: 1rem;
        transform: translateY(-60%);
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
        transform: translateY(-68%) scale(0.75);
        height: 2px;
        line-height: 2px;
        color: hsl(210, calc(1 * 2.9%), 86.7%);
    }

    &__labelTextFocused {
        height: 3px;
        padding-top: 1px;
    }

    &__charCounter {
        position: absolute;
        bottom: 5px;
        right: 8px;
        color: grey;
        font-size: 12px;
    }
}
</style>

<template>
    <div class="simTextArea" :class="[classes]">
        <label class="simTextArea__labelText" :class="[labelClasses]">{{ title }}</label>
        <textarea @focus="onFocus" @blur="onBlur" style="height: 62px;" :disabled="disabled"
                  class="form-control simTextArea__textarea" :class="[textareaClasses]"
                  :maxlength="max !== 0 ? max : ''" ref="textarea" @input="expand">{{value}}</textarea>
        <span class="simTextArea__charCounter">{{ val?.length == null ? 0 : val?.length }}{{ max !== 0 ? " / " + max : "" }}</span>
    </div>
</template>

<script>
import isNullOrEmpty from "~~/isNullOrEmpty";

export default {
    name: "sim-textarea",
    props: {
        value: {
            default: null,
        },
        max: {
            default: 0,
        },
        title: {
            default: "",
        },
        classes: {
            default: "",
        },
        textareaClasses: {
            default: "",
        },
        disabled: {
            default: false,
        },
        autoExpand: {
            default: false,
        }
    },
    data() {
        return {
            labelClasses: "",
            val: null,
        }
    }, methods: {
        onFocus() {
            this.labelClasses = "simTextArea__labelTextFocus simTextArea__labelTextFocused";
        },
        onBlur() {
            if (isNullOrEmpty(this.val)) {
                this.labelClasses = "";
            } else {
                this.labelClasses = "simTextArea__labelTextFocus";
            }
        },
        expand() {
            this.$refs.textarea.style.height = 'auto'; this.$refs.textarea.style.height = (this.$refs.textarea.scrollHeight) + 'px';
        }
    },
    mounted() {
        if (!isNullOrEmpty(this.val)) {
            this.labelClasses = "simTextArea__labelTextFocus simTextArea__labelTextFocused";
        }
    }
}
</script>