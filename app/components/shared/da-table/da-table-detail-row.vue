<template>
	<tr :key="row[rowKey]+'_details'">
		<td v-if="hasSelectColumn">&nbsp;</td>
		<td :colspan="columns.length">
			<slot :row="row"></slot>
		</td>
	</tr>
</template>

<script>
export default defineComponent({
	name: "da-table-detail-row",
	props: {
		row: {
			required: true
		},
		rowKey: {
			required: true
		},
		hasSelectColumn: {
			required: true
		},
		columns: {
			required: true
		},
	}
});
</script>

<style scoped>

</style>