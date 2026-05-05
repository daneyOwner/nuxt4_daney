<template>
	<abbr @click.prevent="copyText" :title="text">{{ label || text }}</abbr>
</template>

<script>
import copyText from "./copyText";

export default {
	name: "click-copy-text",
	props: {
		text: {
			type: String,
			required: true
		},
		label: {
			type: String,
			default: null
		}
	},
	computed: {
		getHref() {
			return "javascript:copy('" + this.text + "')";
		}
	},
	methods: {
		copyText() {
			copyText(this.text);
			this.$toast({type: "info", text: `Copied: ${this.text}`, header: "Info"});
		}
	}
};
</script>

<style scoped>
    span {
        text-underline: #0c0c0c;
    }
</style>
