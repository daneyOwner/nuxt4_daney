<template>
	<span v-html="row[field]" />
</template>

<script>
export default defineComponent({
	name: "da-table-html-value-formatter",
	props: {
		row: Object,
		field: String
	}
});
</script>