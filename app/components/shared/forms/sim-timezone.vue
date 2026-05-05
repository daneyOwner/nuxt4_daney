<template>
    <div>
        <sim-select :id="id" :name="name" :options="options" :disabled="disabled" :required="required"
                    :title="title" :settings="settings" v-model="val"></sim-select>
    </div>
</template>

<script>
export default {
    name: "sim-timezone",
    props: {
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
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
        value: null
    },
    data() {
        return {
            val: null,
            options: [],
        }
    },
    watch: {
        val: function (val, oldVal) {
            this.$emit("input", val)
        },
        value: function (val, oldVal) {
            this.val = val;
        }
    },
    mounted() {
        let options = [];

        for (let i = 0; i < this.$const.zones.length; i++) {
            let zone = this.$const.zones[i];
            options.push({id: zone.id, text: zone.gmt + " " + zone.text})
        }

        this.options = options;
    },
}
</script>