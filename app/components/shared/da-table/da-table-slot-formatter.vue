<script>
export default defineComponent({
	name: "da-table-slot-formatter",
	props: {
		column: {
			type: Object,
			required: true
		},
		row: {
			type: Object,
			required: true
		},
		field: {
			type: String,
			required: true
		},
		fieldWrapperClass: {
			type: String,
			default: null
		},
	},
	render(h, context) {
		let scopedSlots = context.props.column.$scopedSlots.default({ column: context.props.column, row: context.props.row, field: context.props.field });

		return !context.props.fieldWrapperClass ? ((scopedSlots && scopedSlots.length > 0) ? scopedSlots[0] : h("span")) : h("span", { class: [context.props.fieldWrapperClass, `column-` + context.props.column.field] }, [(scopedSlots && scopedSlots.length > 0) ? scopedSlots[0] : h("span")]);
	}
});
</script>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

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
