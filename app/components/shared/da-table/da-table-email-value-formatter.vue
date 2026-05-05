<template>
	<span><a :href="'mailto:'+row[field]" class="text-body">{{ row[field] }}</a></span>
</template>

<script>

export default defineComponent({
	name: "da-table-email-value-formatter",
	props: {
		row: Object,
		field: String
	}
});
</script>