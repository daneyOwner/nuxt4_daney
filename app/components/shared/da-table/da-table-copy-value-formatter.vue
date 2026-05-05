<template>
	<span><click-copy-text :text="row[field]" :label="row[field]" /></span>
</template>

<script>
import ClickCopyText from "~/components/shared/copy/click-copy-text.vue";

export default defineComponent({
	name: "da-table-copy-value-formatter",
	components: {ClickCopyText},
	props: {
		row: Object,
		field: String
	}
});
</script>
