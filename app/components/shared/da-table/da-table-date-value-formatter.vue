<template>
	<span>{{getDate(row[field])}}</span>
</template>

<script>
let dayjs = useDayjs();

export default defineComponent({
    name: "da-table-date-value-formatter",
    props: {
        row: Object,
        field: String
    },
    methods: {
      getDate(value){
          return dayjs(value, 'dd-MM-yyyy').format('DD-MM-YYYY');
      }  
    }
})
</script>
