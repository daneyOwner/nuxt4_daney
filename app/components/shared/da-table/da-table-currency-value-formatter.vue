<template>
	<span>{{formatMoney(row[field])}}</span>
</template>

<script>
export default defineComponent({
    name: "da-table-currency-value-formatter",
    props: {
        row: Object,
        field: String
    },
	methods: {
		formatMoney(amount) {
			return amount.toLocaleString('da-DK', { style: 'currency' });
		}
	}
});
</script>
