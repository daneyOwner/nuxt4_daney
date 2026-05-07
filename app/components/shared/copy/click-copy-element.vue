<template>
	<div @click.prevent="copyText" :title="text">
		<slot/>
	</div>
</template>

<script>
import copyText from "./copyText";
let { $toast } = useNuxtApp();

export default {
	name: "click-copy-element",
	props: {
		text: {
			type: String,
			required: true
		},
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
    div {
		cursor: pointer;
    }
</style>
