<template>
	<span>
		<slot/>
	</span>
</template>

<script lang="ts">
import DaTableDefaultValueFormatter from "./da-table-default-value-formatter.vue";
import {v4 as newGuid} from "uuid";

export default defineComponent({
	name: "da-table-column",
	inheritAttrs: false,
	props: {
		field: {
			default() {
				return newGuid();
			}
		},
		name: {default: ""},
		filterName: {default: "", type: [String]},
		sortable: {default: false},
		textAlign: {default: "left", type: [String]},
		wrapText: {default: false},
		replaceZero: {default: false},
		sticky: {default: false},
		noDecimals: {default: false},
		sortFunction: {
			default() {
				return function sortFunction(a, b) {
					let aField = a[this.field];
					let bField = b[this.field];
					if (this.sortField) {
						aField = a[this.sortField];
						bField = b[this.sortField];
					}
					if (aField > bField) return 1;
					if (aField < bField) return -1;
					return 0;
				};
			}
		},
		extraData: {
			default: null
		},
		sortField: {
			default: null
		},
		show: {
			default: true
		},
		hideable: {
			default: true
		},
		component: {
			default() {
				return DaTableDefaultValueFormatter;
			}
		},
		width: {
			default: null
		},
		fieldWrapperClass: {
			type: [String, null],
			required: false,
			default: "wrapper"
		}
	},
	data() {
		return {
			table: null
		};
	},
	computed: {
		visibilityKey() {
			if (this.table) {
				return this.table.visibilityKey;
			}

			return null;
		},
		visibleColumns() {
			if (this.table) {
				return this.table.visibleColumns;
			}

			return null;
		},
		visibleByConfig() {
			if (this.visibilityKey === null) return true;
			if (this.visibleColumns === null) return true;

			const keyValue = this.visibleColumns[this.field];
			if (keyValue !== undefined && keyValue !== null) {
				if (typeof keyValue === "boolean")
					return keyValue;

				if (typeof keyValue === "string")
					return keyValue.toLowerCase() === "true";
			}

			return null;
		},
		shown() {
			if (!this.hideable) return this.show;

			return this.show;
		}
	},
	created() {
		this._isColumn = true;
		let columns = this;
		while (!this._columns && columns.$parent) {
			if (columns._isTable) {
				this.table = columns;
				columns.columns.push(this);
                //@ts-ignore
				this._columns = columns;

			}
			columns = columns.$parent;
		}
		if (!this._columns) throw Error('da-table-column depend on da-table.');
	},
	beforeDestroy() {
		if (this._columns) {
			this._columns.columns = this._columns.columns.filter(el => el !== this);
		}
		if (this._columns) {
			if (this._columns.active === this.index) {
				this._columns.index = 0;
			}
		}
		if (this._columns) {
			let id = this._columns.columns.indexOf(this);
			if (~id) this._columns.columns.splice(id, 1);
		}
	}
});
</script>
