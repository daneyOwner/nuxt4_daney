<template>
	<span>{{ date }}</span>
</template>

<script lang="ts">
const dayjs = useDayjs();
import isNullOrEmpty from "~/isNullOrEmpty";

export default defineComponent({
	name: "da-table-int-date-value-formatter",
	props: {
		row: Object,
		field: String
	},
	computed: {
		date() {
			let intDate = this.row[this.field];
			if (isNullOrEmpty(intDate) || isNaN(intDate)) {
				return null;
			}
            
			intDate = intDate.toString().padStart(8, "0");

			const date = dayjs(intDate, "YYYYMMDD");
			if (date.isValid())
				return date.format('DD-MM-YYYY');

			return null;
		}
	},
});
</script>
