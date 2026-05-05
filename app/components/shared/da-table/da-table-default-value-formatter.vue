<template>
    <span class="wrapper" :class="{'wrap-text': wrapText}" >
        <!--suppress HtmlFormInputWithoutLabel -->
        <input v-if="typeof row[field] === 'boolean'" type="checkbox" class="form-check-input" :checked="row[field]" onclick="return false;">
        <span v-else-if="typeof row[field] === 'number' && !noDecimals">{{formatNumber(row[field])}}</span>
        <span v-else-if="replaceZero">{{ row[field] === undefined || row[field] === null || row[field].toString() == "0" ? "-" :  row[field]}}</span>
        <span v-else>{{row[field]}}</span>
    </span>
</template>

<script>
export default defineComponent({
    name: "da-table-default-value-formatter",
    abstract: true,
    props: {
        row: Object,
        field: String,
        wrapText: Boolean,
        replaceZero: Boolean,
		noDecimals: Boolean,
        formatNumber: {
            default() {
                return function(value) {
					return parseFloat(value).toLocaleString('da-DK');
                }
            }
        }
    }
});
</script>

<style lang="scss" scoped>
@import "~~/assets/scss/variables";

.wrapper {
	padding-left: $da-table-cell-padding-left;
    white-space: nowrap;
    * {
        white-space: nowrap;
    }
}

.wrap-text {
    white-space: break-spaces !important;
    * {
        display: inline-block;
        white-space: break-spaces !important;
    }
}
</style>
