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
        color: #999;
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

        & > div {
            -webkit-user-select: all;
            -moz-user-select: all;
            user-select: all;
            pointer-events: all;
        }
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
        <label class="simTextArea__labelText" :class="[labelClasses]">
            {{ title }}
            <client-only>
                <u-tooltip arrow :popper="{ placement: 'top' }" class="inline-block!" :text="helpText">
                    <div>
                        <font-awesome-icon icon="fa-solid fa-circle-question" fixed-width />
                    </div>
                </u-tooltip>
            </client-only>
        </label>
        <textarea v-model="val" @focus="onFocus" @blur="onBlur" style="height: 62px;" :disabled="disabled"
                  class="form-control simTextArea__textarea" :class="[textareaClasses]"
                  :maxlength="max !== 0 ? max : ''" ref="textarea" @input="expand"></textarea>
        <span class="simTextArea__charCounter">{{
                val?.length == null ? 0 : val?.length
            }}{{ max !== 0 ? " / " + max : "" }}</span>
    </div>
</template>

<script setup>
import {ref, watch, onMounted, nextTick} from "vue";

let props = defineProps({
    modelValue: {
        type: [String, Number, null],
        default: null,
    },
    max: {
        type: Number,
        default: 0,
    },
    title: {
        type: String,
        default: "",
    },
    classes: {
        type: String,
        default: "",
    },
    textareaClasses: {
        type: String,
        default: "",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    autoExpand: {
        type: Boolean,
        default: false,
    },
    helpText: null,
});

const emit = defineEmits(['update:modelValue']);

const val = ref();
const labelClasses = ref("");

const onFocus = () => {
    labelClasses.value = "simTextArea__labelTextFocus simTextArea__labelTextFocused";
};

const onBlur = () => {
    if (isNullOrEmpty(val.value)) {
        labelClasses.value = "";
    } else {
        labelClasses.value = "simTextArea__labelTextFocus";
    }
};

const expand = () => {
    const textarea = textareaRef.value;
    if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
};

const isNullOrEmpty = (value) => {
    return value === null || value === undefined || value === "";
};

// Watchers
watch(
    () => val.value,
    async (newVal) => {
        emit('update:modelValue', newVal);
        onFocus();
        onBlur();
        if (!props.autoExpand) return;
        await nextTick();
        expand();
    },
    {deep: true}
);

watch(
    () => props.modelValue,
    (newVal) => {
        val.value = newVal;
    },
    {immediate: true}
);


// Refs
const textareaRef = ref(null);

// Lifecycle hooks
onMounted(() => {
    if (!isNullOrEmpty(val.value)) {
        labelClasses.value = "simTextArea__labelTextFocus simTextArea__labelTextFocused";
    }
});
</script>