<template>
	<div @click.prevent="copyText" :title="text">
		<slot/>
	</div>
</template>

<script lang="ts">
import copyText from "./copyText";

export default {
	name: "click-copy-element",
	props: {
		text: {
			type: String,
			required: true
		},
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
    div {
		cursor: pointer;
    }
</style>
