<template>
	<span>{{ getDate(row[field]) }}</span>
</template>

<script>
let dayjs = useDayjs();
export default defineComponent({
	name: "da-table-datetime-value-formatter",
	props: {
		row: Object,
		field: String
	},
    methods: {
        getDate(value){
            return dayjs(value, 'dd-MM-yyyy hh:mm:ss').format('DD-MM-YYYY hh:mm:ss');
        }
    }
});
</script>
