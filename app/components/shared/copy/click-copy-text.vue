<template>
	<abbr @click.prevent="copyText" :title="text">{{ label || text }}</abbr>
</template>

<script>
import copyText from "./copyText";
let { $toast } = useNuxtApp();

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
	methods: {
		copyText() {
			copyText(this.text);
			$toast({type: "info", text: `Copied: ${this.text}`, header: "Info"});
		}
	}
};
</script>

<style scoped>
    span {
        text-underline: #0c0c0c;
    }
</style>
