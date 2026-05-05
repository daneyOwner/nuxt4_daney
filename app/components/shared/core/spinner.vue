<template>
    <client-only>
        <template v-if="!disabled" v-show="active || locked">
            <div :class="[{'absolute': !fixed}, {'fixed': fixed}]" class="inset-x-0 inset-y-0">
                <div class="absolute z-[9998] text-center left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <font-awesome-icon icon="fa-solid fa-spinner" class="text-[#ff8c00]" spin :size="size"/>
                    <div v-if="text" class="mt-3">{{ text }}</div>
                </div>
            </div>
        </template>
    </client-only>
</template>

<script>
export default {
    name: "spinner",
    props: {
        fixed: {type: Boolean, default: false},
        size: {type: String, default: '5x'},
        text: {type: String, default: ''},
        disabled: {type: Boolean, default: false},
        value: {default: false},
    },
    data() {
        return {
            active: this.value,
            locked: false,
            _body: null,
        }
    },
    watch: {
        active(val, old) {
            if (val !== old) this.$emit('input', val);
        },
        value(val, old) {
            if (val !== old) this[val ? 'show' : 'hide']();
        }
    },

}
</script>