<template>
	<span>{{formatNumber(row[field])}}</span>
</template>

<script>
export default defineComponent({
    name: "da-table-number-value-formatter",
    props: {
        row: Object,
        field: String
    },
	methods: {
		formatNumber(amount) {
			return amount.toLocaleString('da-DK');
		}
	}
});
</script>
