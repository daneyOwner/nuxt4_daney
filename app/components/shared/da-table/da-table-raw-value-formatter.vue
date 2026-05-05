<template>
	<span>{{row[field]}}</span>
</template>

<script>
export default defineComponent({
    name: "da-table-raw-value-formatter",
    props: {
        row: Object,
        field: String
    }
});
</script>