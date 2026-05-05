<template>
	<span><click-copy-text :text="row[field]" label="Uid" /></span>
</template>

<script>
import ClickCopyText from "~/components/shared/copy/click-copy-text.vue";

export default defineComponent({
	name: "da-table-uid-value-formatter",
	components: {ClickCopyText},
	props: {
		row: Object,
		field: String
	}
});
</script>
