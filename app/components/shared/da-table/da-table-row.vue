<template>
	<tr @click="clickedRow($event)" :class="rowClasses" class="da-table-row">
		<td v-if="hasSelectColumn" style="width: 10px;" class="!p-0 select-column">
			<template v-if="row.hasSelect === undefined || row.hasSelect">
				<label :for="'selectRow_' + row[rowKey]"
					class="hidden">Select {{ row[rowKey] }}</label>
				<!--suppress HtmlFormInputWithoutLabel -->
				<input type="checkbox" class="form-check-input" @click="selectRow(row[rowKey])" :id="'selectRow_' + row[rowKey]" v-model="row.selected">
			</template>
		</td>
		<td v-for="column in shownColumns" :key="column.field" :class="classes[column.field]" :style="'width: ' + (column.width ? column.width : null) ">
			<component v-if="column.component" :is="column.component" :no-decimals="column.noDecimals" :extra-data="column.extraData" :field-wrapper-class="column.fieldWrapperClass"
				:wrap-text="column.wrapText" :replace-zero="column.replaceZero" :field="column.field" :row="row" :column="column"
				@clicked="$emit('clicked', column.field)" @set-class="updateColumnClassesEvent" @set-row-classes="updateRowClassesEvent" />
		</td>
	</tr>
</template>

<script lang="ts">
export default defineComponent({
	name: "da-table-row",
	props: {
		hasSelectColumn: {
			default: false,
			type: Boolean
		},
		rowKey: {
			required: true,
			type: String
		},
		row: {
			required: true,
			type: Object
		},
		columns: {
			required: true,
			type: Array
		}
	},
	data() {
		return {
			classes: {},
			rowClasses: []
		};
	},
	computed: {
		shownColumns() {
			return this.columns.filter(c => c.shown);
		}
	},
	created() {
		for (let i = 0; i < this.columns.length; i++) {
			let column = this.columns[i];
			this.classes[column.field] = this.setColumnClasses(column);
		}
	},
	methods: {
		clickedRow(event) {
			this.$emit("clicked-row", event);
		},
		selectRow(id) {
			this.$emit("select-row", id);
		},
		setColumnClasses(column) {
			let classes = [];
			if (column.textAlign === 'left') classes.push("text-start");
			if (column.textAlign === 'right') classes.push("text-end");
			if (column.textAlign === 'center') classes.push("text-center");
			if (column.sticky) classes.push(`sticky-${column.sticky}`);

			if (column.$attrs.class)
				return [...classes, column.$attrs.class];
			else
				return [...classes];

		},
		updateColumnClassesEvent(args: {field: string, add: string[], remove: string[]}) {
			this.$nextTick(() => {
				let classes = [...this.classes[args.field]];

				for (let i = 0; i < args.remove.length; i++) {
					let index = classes.indexOf(args.remove[i]);
					while (index > -1) {
						classes.splice(index, 1);
						index = classes.indexOf(args.remove[i]);
					}

				}

				for (let i = 0; i < args.add.length; i++) {
					classes.push(args.add[i]);
				}

				this.$set(this.classes, args.field, classes);
				this.$forceUpdate();
			});
		},
		updateRowClassesEvent(args: {add: string[], remove: string[]}) {
			this.$nextTick(() => {
				let classes = [...this.rowClasses];

				for (let i = 0; i < args.remove.length; i++) {
					let index = classes.indexOf(args.remove[i]);
					while (index > -1) {
						classes.splice(index, 1);
						index = classes.indexOf(args.remove[i]);
					}

				}

				for (let i = 0; i < args.add.length; i++) {
					classes.push(args.add[i]);
				}

				this.rowClasses = classes;
				//this.$forceUpdate();
			});
		}
	}
});
</script>
<style lang="scss" scoped>
	@import "~/assets/scss/variables";

	.da-table-row {
		td > span {
			padding-left: 18px;

			white-space: nowrap;
			* {
				white-space: nowrap;
			}
		}
		td > div {
			white-space: nowrap;
		}
		.form-check-input {
			margin: ($line-height-base - $form-check-input-width) * .5 0 0;
		}
		.select-column {
			.form-check-input {
				margin: 0.8rem;
			}
		}
	}
</style>
