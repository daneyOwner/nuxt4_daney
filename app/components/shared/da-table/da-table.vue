<style scoped lang="scss">
@media (max-width: 700px) {
	.table-pagination {
		flex-direction: column;

		& > .table-pagination-left {
			margin-bottom: 9px;
		}
	}

	.collapse > .col-auto:nth-child(even) {
		margin-left: 2px !important;
	}
	.collapse > .col-auto:nth-child(odd) {
		margin-right: 2px !important;
	}
	.collapse > .col-auto {
		width: calc(50% - 2px);
		margin-bottom: 4px;
		float: left;

		& button, a {
			width: 100%;
		}

		& button {
			text-align: left;

			&::after {
				position: absolute;
				right: 7px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}

@media (max-width: 600px) {
	.table-pagination {
		flex-direction: column;

		& > .table-pagination-left {
			margin-bottom: 9px;
		}
	}

	.collapse > .col-auto:nth-child(even) {
		margin-left: 0 !important;
	}
	.collapse > .col-auto:nth-child(odd) {
		margin-right: 0 !important;
	}
	.collapse > .col-auto {
		margin-bottom: 4px;
		width: 100%;

		& button, a {
			width: 100%;
		}

		& button {
			text-align: left;

			&::after {
				position: absolute;
				right: 7px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
</style>

<template>
	<div class="da-table rounded" :id="id" :class="{'is-compact': isCompact, 'da-table-padding': hasPadding }">
		<div v-if="hasHead" class="table-header">
			<div class="table-top-row">
				<div class="table-header-left-buttons" v-if="!isCompact && windowWidth >= 700">
					<div class="flex flex-wrap gap-4">
						<div class="col-auto" v-if="hasResetFilters">
							<button @click="resetFilters" class="btn btn-outline-secondary">
								<font-awesome-icon icon="fa-solid fa-filter"/> Reset Filters
							</button>
						</div>
						<div class="col-auto" v-if="visibilityKey">
							<div class="dropdown">
								<button class="btn btn-outline-secondary dropdown-toggle" type="button"
										:id="configDropdownId" data-bs-toggle="dropdown"
										aria-expanded="false" ref="configDropdown">
									<font-awesome-icon icon="fa-solid fa-tools"/> Config
								</button>
								<ul class="dropdown-menu p-3" :aria-labelledby="configDropdownId">
									<li v-for="column in columns" :key="column.field">
										<div class="form-check" v-if="column.show && column.hideable">
											<input type="checkbox" class="form-check-input"
												   :id="column.field + '_' + tableId + '_toggle'"
												   :checked="visibleColumns[column.field]"
												   @change="toggleVisibleColumn(column.field, $event)">
											<label :for="column.field + '_' + tableId + '_toggle'"
												   class="form-check-label text-nowrap">
												{{ !isNullOrEmpty(column.filterName) ? column.filterName : column.name}}
											</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-auto" v-if="selected.length > 0">
							<div class="btn-group">
								<label class="btn btn-outline-secondary btn-brand-color btn-label">
                                    {{ selected.length }} Selected
                                </label>
								<button @click="editSelected" class="btn btn-outline-secondary"
										v-if="editSelected !== editSelectedDefault">
									<font-awesome-icon icon="fa-solid fa-pen"/>
                                    Edit
								</button>
								<button @click="deleteSelected" class="btn btn-outline-secondary btn-light"
										v-if="deleteSelected !== deleteSelectedDefault && allowDeleteSelected">
									<font-awesome-icon icon="fa-solid fa-trash-alt"/>
                                    Delete
								</button>
								<button @click="deselectSelected" class="btn btn-outline-secondary btn-light"
										v-if="clearSelectedOnSearch === false">
									<font-awesome-icon icon="fa-solid fa-trash-alt"/>
                                    Clear
								</button>
								<slot name="table-top-left-actions"/>
							</div>
						</div>
						<div class="col-auto" v-if="$slots['table-top-left-filters']">
							<slot name="table-top-left-filters"/>
						</div>
					</div>
				</div>
				<div v-if="hasCounter && !isCompact" class="table-top-row-title text-center"
					 :class="{'is-compact': isCompact}">
					<h2>{{ title }}</h2>
					<h3>{{ total.toLocaleString('da-DK') }} Results</h3>
				</div>
				<div class="table-top-row-title" v-if="isCompact">
					<h2>{{ title }}</h2>
					<span v-if="total.toString().length <= 2" class="circle-icon">
						{{ total.toLocaleString('da-DK') }}
					</span>
					<strong v-else class="ms-2">{{ total.toLocaleString('da-DK') }}</strong>
					<div class="btn-group ms-2" v-if="$slots['table-top-left-actions']">
						<slot name="table-top-left-actions"/>
					</div>
				</div>
				<div v-if="windowWidth >= 700" class="table-header-right-buttons">
					<div class="flex flex-1 gap-x-3 justify-end">
						<slot name="searchArea" />
						<div class="col-auto" v-if="hasSearch">
							<label for="searchText" class="hidden">Search</label>
							<div class="input-group">
								<input id="searchText" type="text" v-model="search"
									   class="form-control" @input="searchOnInput"
									   :placeholder="placeholder" ref="searchText"
									   @keydown.enter.prevent="searchFunction" autocomplete="off">
								<button @click="searchFunction" class="btn btn-orange">
									<font-awesome-icon icon="fa-solid fa-search"/>
								</button>
							</div>
						</div>
						<slot name="table-top-actions"/>
					</div>
				</div>
			</div>

			<template v-if="windowWidth <= 700">
				<div class="col-auto" style="margin-bottom:-3px;">
					<slot name="searchArea"/>
					<div v-if="hasSearch">
						<label for="searchText" class="hidden">Search</label>
						<div class="input-group">
							<input id="searchText" type="text" v-model="search"
								   class="form-control" @input="searchOnInput"
								   :placeholder="placeholder" ref="searchText"
								   @keydown.enter.prevent="searchFunction" autocomplete="off">
							<button @click="searchFunction" class="btn btn-secondary">
								<font-awesome-icon icon="fa-solid fa-search"/>
							</button>
						</div>
					</div>
				</div>
			</template>

			<template v-if="windowWidth <= 700">
				<font-awesome-icon v-if="!isOpen" @click="isOpen=true;" class="flex pointer text-dark mx-auto mt-2 fa-2x"
								   icon="fa-regular fa-angle-down"/>
				<div class="mt-2" v-if="isOpen" >
					<div class="col-auto" v-if="hasResetFilters">
						<button @click="resetFilters" class="btn btn-outline-secondary">
							<font-awesome-icon fixed-width icon="fa-solid fa-filter"/>
                            Reset Filters
						</button>
					</div>
					<div class="col-auto" v-if="visibilityKey">
						<div class="dropdown">
							<button class="btn btn-outline-secondary dropdown-toggle" type="button"
									:id="configDropdownId" data-bs-toggle="dropdown"
									aria-expanded="false" ref="configDropdown">
								<font-awesome-icon fixed-width icon="fa-solid fa-tools"/>
                                Config
							</button>
							<ul class="dropdown-menu p-3" :aria-labelledby="configDropdownId">
								<li v-for="column in columns" :key="column.field">
									<div class="form-check" v-if="column.show && column.hideable">
										<input type="checkbox" class="form-check-input"
											   :id="column.field + '_' + tableId + '_toggle'"
											   :checked="visibleColumns[column.field]"
											   @change="toggleVisibleColumn(column.field, $event)">
										<label :for="column.field + '_' + tableId + '_toggle'"
											   class="form-check-label text-nowrap">{{
												!isNullOrEmpty(column.filterName) ? column.filterName : column.name
											}}</label>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-auto" v-if="selected.length > 0">
						<div class="btn-group">
							<label class="btn btn-outline-secondary btn-brand-color btn-label">
                                {{ selected.length}} Selected
                            </label>
							<button @click="editSelected" class="btn btn-outline-secondary"
									v-if="editSelected !== editSelectedDefault">
								<font-awesome-icon icon="fa-solid fa-pen"/>
                                Edit
							</button>
							<button @click="deleteSelected" class="btn btn-outline-secondary btn-light"
									v-if="deleteSelected !== deleteSelectedDefault">
								<font-awesome-icon icon="fa-solid fa-trash-alt"/>
                                Delete
							</button>
							<button @click="deselectSelected" class="btn btn-outline-secondary btn-light"
									v-if="clearSelectedOnSearch === false">
								<font-awesome-icon icon="fa-solid fa-trash-alt"/>
                                Clear
							</button>
							<slot name="table-top-left-actions"/>
						</div>
					</div>
					<div class="col-auto" v-if="$slots['table-top-left-filters']">
						<slot name="table-top-left-filters"/>
					</div>
					<slot name="table-top-actions"/>
					<slot name="table-top-filters"/>
					<div class="clearfix"></div>
					<font-awesome-icon @click="isOpen=false;" class="flex pointer text-dark mx-auto mt-2 fa-2x"
									   icon="fa-solid fa-angle-up"/>
				</div>
			</template>
			<div v-else-if="$slots['table-top-filters']" class="row gap-4 gap-y-4 plr-6px">
				<slot name="table-top-filters"/>
			</div>
			<slot name="table-top-bottom-section"/>
		</div>
		<div v-if="caption" class="card">
			<div class="card-body" v-html="caption"/>
		</div>
		<div class="table-outer-container rounded" :class="{'rounded-t-none': hasHead}">
			<template v-if="!isSpinnerDisabled && isLoadingInternal">
				<div class="flex justify-center bg-white min-h-[200px] p-4 relative">
					<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<font-awesome-icon icon="fa-regular fa-spinner" style="color: #6895e3;" spin size="5x"/>
					</div>
				</div>
			</template>
			<div v-show="isSpinnerDisabled ? true : !isLoadingInternal" class="table-container rounded"
				 :class="{'shadow-left': scrollOffsetLeft > 0, 'shadow-right': scrollOffsetRight > 0, 'rounded-t-none': hasHead, 'border-top': !hasHeaderColumns}"
				 ref="tableContainer">
				<slot name="table" :columns="columns" :rows="rows" :total="total">
					<table class="table table-striped table-hover bg-white w-full mb-0 rounded"
						   :class="{'rounded-t-none': hasHead}" v-if="columns.length" ref="table">
						<thead v-if="hasHeaderColumns">
							<tr :class="!hasHead ? 'border-top' : ''">
								<th v-if="!!hasSelectColumn && (visibleColumns.Check === undefined || visibleColumns.Check)"
									class="select-column">
									<label for="selectAll" class="hidden">Select All</label>
									<input type="checkbox" class="form-check-input header-check"
										   v-model="selectAllValue"
										   id="selectAll">
								</th>
								<th v-for="column in columns.filter(c => c.shown)" :key="column.field"
									class="text-nowrap"
									:class="columnClasses(column)" :aria-sort="columnAriaSort(column)">
									<da-table-column-header :column="column"
															@clicked="columnHeaderClick(column)"/>
								</th>
							</tr>
						</thead>
						<slot name="custom-tbody" v-if="$slots['custom-tbody']"
							  :slot-scope="{rows, rowKey, columns}"/>
						<tbody v-else class="da-table-rows">
							<template v-if="rows != null" v-for="row in getFiltered(rows)">
								<slot :slot-scope="{ row, columns, rowKey }" name="custom-row" v-if="$slots['custom-row']"/>
								<template v-else>
									<da-table-row :key="row[rowKey]+'_row'"
												  :class="[rowStyle(row)?.classes, row.cssClasses, rowStyleClasses[row[rowKey]]]"
												  :has-select-column="!!hasSelectColumn"
												  :row-key="rowKey"
												  :row="row"
												  :columns="columns"
												  @select-row="selectRow"
												  @clicked-row="event => clickedRow(event, row)"
												  @clicked="searchFunction"/>

									<da-table-detail-row v-if="row.detailRowOpen"
														 :key="row[rowKey]+'_details'"
														 :row="row"
														 :row-key="rowKey"
														 :columns="columns"
														 :has-select-column="hasSelectColumn">
										<slot :slot-scope="{ row }" name="detail-row"/>
									</da-table-detail-row>
								</template>
							</template>
                            <template v-if="rows.length === 0">
							    <tr class="da-table-row-noItems">
							    	<td :colspan="activeColumns.length" class="text-center">
							    		There are no items in this table.
							    	</td>
							    </tr>
                            </template>
                                
							<tr class="da-table-sub-total-row"
								v-if="$slots['table-sub-total-row']">
								<slot name="table-sub-total-row" :slot-scope="{ rows }"/>
							</tr>
							<tr class="da-table-total-row"
								v-if="$slots['table-total-row']">
								<slot name="table-total-row" :slot-scope="{ rows }"/>
							</tr>
						</tbody>
					</table>
				</slot>
			</div>
		</div>
		<template v-if="hasPagination">
			<div class="table-pagination text-[14px]">
				<div class="table-pagination-left">
					<span aria-hidden="true">Show</span>
					<label for="SelectLimit"/>
					<select v-model="rowLimit" id="SelectLimit" class="form-select"
							@change="setPageSize">
						<option style="border-color: black;" v-for="pageSizeOption in pageSizeOptions" :value="pageSizeOption" :key="pageSizeOption">
							{{ pageSizeOption }}
						</option>
					</select>
					<span aria-hidden="true">Rows per page</span>
				</div>
				<div class="table-pagination-center">
					<div>
						<button class="btn ps-1 pe-1" @click="firstPage" :disabled="!firstPageEnabled">
							<span class="hidden">First</span>
							<font-awesome-icon fixed-width class="sort-icons-asc"
											   icon="fa-solid fa-angles-left"/>
						</button>
						<button class="btn ps-1 pe-1" @click="previousPage" :disabled="!previousPageEnabled">
							<span class="hidden">Previous</span>
							<font-awesome-icon fixed-width class="sort-icons-asc" icon="fa-solid fa-angle-left"/>
						</button>

						<button class="btn btn-outline-secondary"
								:class="{'btn-light': currentPage !== pageNumber, 'btn-passive-dark': currentPage === pageNumber}"
								v-for="pageNumber in paginationPages" :key="pageNumber"
								:disabled="pageNumber === currentPage" @click="setPage(pageNumber)">
							{{ pageNumber }}
						</button>

						<button class="btn ps-1 pe-1" @click="nextPage" :disabled="!nextPageEnabled">
							<span class="hidden">Next</span>
							<font-awesome-icon fixed-width class="sort-icons-asc" icon="fa-solid fa-angle-right"/>
						</button>
						<button class="btn ps-1 pe-1" @click="lastPage" :disabled="!lastPageEnabled">
							<span class="hidden">Last</span>
							<font-awesome-icon fixed-width class="sort-icons-asc"
											   icon="fa-solid fa-angles-right"/>
						</button>
					</div>
				</div>
				<div class="table-pagination-right"/>
			</div>
		</template>
		<div class="d-none">
			<slot/>
		</div>
	</div>
</template>

<script lang="ts">
import DaTableColumnHeader from "./da-table-column-header.vue";
import DaTableDetailRow from "./da-table-detail-row.vue";
import DaTableRow from "./da-table-row.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import isNullOrEmpty from "~/isNullOrEmpty";
import {v4 as newGuid} from "uuid";
import { validate as uuidValidate } from 'uuid';

const editSelected = function editSelected() {
};
const deleteSelected = function deleteSelected() {
};

export default defineComponent({
	name: "da-table",
	components: {FontAwesomeIcon, DaTableDetailRow, DaTableColumnHeader, DaTableRow},
	props: {
		id: {
			default: null,
		},
		placeholder: {
			default() {
				return "Search";
			},
			type: String
		},
		caption: {
			default: null,
			type: String
		},
		pageSizeOptions: {
			default() {
				return [10, 25, 50, 100];
			},
			type: Array
		},
		title: {
			default: null,
			validator: function (value) {
				return typeof value === "string";
			},
			type: String
		},
		limit: {
			default: 50,
			validator: function (value: number) {
				return value > 0;
			}
		},
		offset: {
			default: 0,
			validator: function (value: number) {
				return value >= 0;
			}
		},
		data: {
			required: true,
			validator: function (value) {
				return (typeof value === 'function' || false) || Array.isArray(value);
			}
		},
		editSelected: {
			required: false,
			default: function () {
				return editSelected;
			},
			validator: function (value) {
				return typeof value === 'function' || false;
			}
		},
		deleteSelected: {
			required: false,
			default: function () {
				return deleteSelected;
			},
			validator: function (value) {
				return typeof value === 'function' || false;
			}
		},
		allowDeleteSelected: {
			required: false,
			type: Boolean,
			default: true
		},
		params: {
			required: false,
			default() {
				return function params(searchArgs) {
					return searchArgs;
				};
			},
			validator: function (value) {
				return typeof value === 'function' || false;
			}
		},
		rowStyle: {
			required: false,
			default: function () {
				return function () {
					return {};
				};
			},
			validator: function (value) {
				return typeof value === 'function' || false;
			}
		},
		rowStyleClasses: {
			required: false,
			default: function () {
				return {};
			},
			type: Object
		},
		rowKey: {
			required: false,
			default: "id",
			validator: function (value) {
				return typeof value === "string";
			}
		},
		sort: {
			required: false,
			default: "LastTimeStamp",
			validator: function (value) {
				return typeof value === "string";
			}
		},
		order: {
			required: false,
			default: "desc",
			validator: function (value) {
				return typeof value === "string";
			}
		},
		hasSelectColumn: {
			default: false,
			type: [Boolean, String],
		},
		hasHead: {
			default: true,
			type: [Boolean, String],
		},
		visibilityKey: {
			default: null,
			type: [Boolean, String],
		},
		visibleColumns: {
			default: {
                Check: false,
            },
			type: Object,
		},
		initialSearch: {
			default: null,
			type: String,
		},
		hasResetFilters: {
			default: true,
			type: [Boolean, String],
		},
		hasSearch: {
			default: true,
			type: [Boolean, String],
		},
		hasPagination: {
			default: true,
			type: [Boolean, String],
		},
		initialClearSelectedOnSearch: {
			default: true,
			type: [Boolean, String],
		},
		hasCounter: {
			default: true,
			type: [Boolean, String],
		},
		isCompact: {
			default: false,
			type: [Boolean, String],
		},
		headerHidden: {
			default: false,
			type: [Boolean, String],
		},
		hasPadding: {
			default: true,
			type: Boolean,
		},
		hasHeaderColumns: {
			default: true,
			type: Boolean,
		},
		hasAutoFocus: {
			default: false,
			type: Boolean,
		},
		isLoading: {
			default: false,
			validator: function (value) {
				return typeof value === "boolean";
			}
		},
		overrideInternalLoading: {type: Boolean, default: false},
		isSpinnerDisabled: {type: Boolean, default: false},
		additionalSearchParams: {
			type: Object, default() {
				return {};
			}
		},
		setSearchParamsVisibleColumns: {
            default: false,
        }
	},
	data() {
		return {
			tableId: newGuid(),
			rows: [],
			total: 0,
			columns: [],
			sortField: this.sort,
			sortDirection: this.order,
			rowLimit: this.limit,
			rowOffset: this.offset,
			selectAllValue: false,
			selected: [],
			currentPage: 1,
			search: this.initialSearch,
			clearSelectedOnSearch: this.initialClearSelectedOnSearch,
			throttle: null,
			isLoadingInternal: this.isLoading,
			scrollOffsetLeft: 0,
			scrollOffsetRight: 0,
			resizeObserver: null,
			searchArgs: {},
			deleteSelectedDefault: deleteSelected,
			editSelectedDefault: editSelected,
			disableSelectAllValueWatch: false,
			isOpen: false,
			windowWidth: 1900,
			isNullOrEmpty: isNullOrEmpty,
			collapsed: true,
		};
	},
	computed: {
		configDropdownId() {
			let config = this.visibilityKey;

			while (config.indexOf(".") > -1) {
				config = config.replace(".", "");
			}

			return config;
		},
		activeColumns() {
			let arr = this.columns.filter(c => c.show).map(c => c.field);
			arr.push("LastTimestamp");
			return arr;
		},
		totalPages() {
			return Number(Math.ceil(this.total / this.rowLimit));
		},
		previousPageEnabled() {
			return this.rowOffset !== 0 && this.rows.length > 0 && this.currentPage !== 1;
		},
		nextPageEnabled() {
			return this.currentPage !== this.totalPages && this.rows.length > 0;
		},
		firstPageEnabled() {
			return this.currentPage !== 1;
		},
		lastPageEnabled() {
			return this.currentPage !== this.totalPages;
		},
		paginationPages() {
			let pages = [];
			let currentPage = this.currentPage;
			if (this.totalPages === 0)
				return pages;

			if (this.totalPages - 2 <= currentPage) {
				currentPage = this.totalPages - 4;
			} else if (currentPage - 2 > 0) {
				currentPage = currentPage - 2;
			} else {
				currentPage = 1;
			}

			if (currentPage === 0) {
				currentPage = 1;
			}

			if (currentPage < 0) {
				currentPage = 1;
			}

			while (pages.length < 5) {
				if (currentPage > this.totalPages) break;
				pages.push(currentPage);
				currentPage++;
			}
			return pages;
		},
	},
	watch: {
		isLoading: {
			immediate: true,
			handler(value) {
				this.isLoadingInternal = value;
			}
		},
		initialSearch: {
			immediate: true,
			handler(value) {
				this.search = value;
			}
		},
		sort: {
			immediate: true,
			handler(value) {
				this.sortField = value;
			}
		},
		order: {
			immediate: true,
			handler(value) {
				this.sortDirection = value;
			}
		},
		limit: {
			immediate: true,
			handler(value) {
				this.rowLimit = Number(value);
				this.$nextTick(() => {
					this.currentPage = (Number(this.rowOffset) / Number(this.rowLimit)) + 1;
				});
			}
		},
		offset: {
			immediate: true,
			handler(value) {
				this.rowOffset = Number(value);
				this.$nextTick(() => {
					this.currentPage = (Number(this.rowOffset) / Number(this.rowLimit)) + 1;
				});
			}
		},
		async sortField(value, oldValue) {
			if (value && this.activeColumns.filter(item => item.toLowerCase() === value.toLowerCase()).length === 0) {
				this.sortField = oldValue;
				console.error("Service Module: sortField: needs to be an active column: ", this.activeColumns.join(", "));
				return;
			}
			this.$nextTick(async () => {
				await this.searchFunction();
			});
		},
		async sortDirection(value, oldValue) {
			if (value !== "desc" && value !== "asc") {
				this.sortDirection = oldValue;
				console.error("Service Module: sortDirection: needs to be \"desc\" or \"asc\"");
				return;
			}
			this.$nextTick(async () => {
				await this.searchFunction();
			});
		},
		selectAllValue(value) {
			if (this.disableSelectAllValueWatch) return;
			for (let i = 0; i < this.rows.length; i++) {
				let row = this.rows[i];
				let item = this.rows[i][this.rowKey];

				if (row.hasSelect === false) continue;

				let index = this.findIndex(this.selected, item);
				if (index === -1 && value) {
					this.selected.push(item);
				}

				if (index > -1 && !value) {
					this.selected.splice(index, 1);
				}

				this.rows[i].selected = value;
			}

			this.$emit('selected-rows', {rows: this.rows, selected: value});
		},
		hasHead: {
			immediate: true,
			handler(val) {
				this.updateConfigDropdown(val);
			}
		},
		isCompact: {
			immediate: true,
			handler(val) {
				this.updateConfigDropdown(!val);
			}
		},
		search(val, oldVal) {
			if (val !== oldVal) this.$emit("search-updated", val);
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (this.hasAutoFocus) {
				if (this.$refs.searchText) {
					this.$refs.searchText.focus();
					if (this.$refs.searchText.value) this.$refs.searchText.select();
				}
			}

			if (this.$refs.table) {
				this.resizeObserver = new ResizeObserver(() => {
					try {
						//this.$log("tableContainer.scrollLeft", this.$refs.tableContainer.scrollLeft, "table.scrollWidth", this.$refs.table.scrollWidth, "tableContainer.offsetWidth", this.$refs.tableContainer.offsetWidth)
						this.scrollOffsetLeft = this.$refs.tableContainer.scrollLeft;
						this.scrollOffsetRight = (this.$refs.table.scrollWidth - this.$refs.tableContainer.offsetWidth) - this.$refs.tableContainer.scrollLeft;
					} catch (e) {
					}
				});


				this.resizeObserver.observe(this.$refs.table);
			}

			let __this = this;
			//@ts-ignore
			window.addEventListener('resize', function () {
                __this.resize();
			});
            this.resize();

			this.$refs.tableContainer.addEventListener("scroll", this.setOffsetScroll);
		});
	},
	beforeDestroy() {
		this.$refs.tableContainer.removeEventListener("scroll", this.setOffsetScroll);
		if (this.resizeObserver)
			this.resizeObserver.unobserve(this.$refs.table);
	},
	created() {
		this._isTable = true;

		if (Array.isArray(this.data)) {
			this.$watch("data", (data) => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].selected === undefined) {
						data[i].selected = false;

						for (let j = 0; j < this.selected.length; j++) {
							if (this.selected[j] === data[i][this.rowKey]) {
								if (!data[i].selected)
									data[i].selected = true;
								break;
							}
						}
					} else {
						if (!data[i].selected) continue;
						if (this.selected.indexOf(data[i][this.rowKey]) === -1) {
							this.selected.push(data[i][this.rowKey]);
						}
					}
				}

				this.disableSelectAllValueWatch = true;

				let allSelected = data.length !== 0;
				this.rows = [];
				for (let i = 0; i < data.length; i++) {
					if (!data[i].selected) allSelected = false;
					this.rows.push({...data[i]})
				}

				this.selectAllValue = allSelected;
				this.$nextTick(() => {
					this.disableSelectAllValueWatch = false;
				})
				this.total = data.length;
			}, {immediate: true});
		}
	},
	methods: {
		/*...mapActions({
			setBackendConfig: "setBackendConfig"
		}),*/
		searchOnInput() {
			if (Array.isArray(this.data)) {
				this.searchFunction(true);
			}
		},
		async updateConfigDropdown(show) {
			await this.$nextTick();
			if (!this.$refs.configDropdown) return;

			//GoBack
			/*if (show) {
				this.$bootstrap.Dropdown.getOrCreateInstance(this.$refs.configDropdown, {
					autoClose: "outside"
				});
			} else {
				let dropdown = this.$bootstrap.Dropdown.getInstance(this.$refs.configDropdown);
				if (dropdown)
					dropdown.dispose();

			}*/
		},
        resize() {
            this.$nextTick(() => {
                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < 700) {
                    this.isOpen = false;
                }
            });
        },
		setOffsetScroll() {
			//this.$log("tableContainer.scrollLeft", this.$refs.tableContainer.scrollLeft, "table.scrollWidth", this.$refs.table.scrollWidth, "tableContainer.offsetWidth", this.$refs.tableContainer.offsetWidth)

			this.scrollOffsetLeft = this.$refs.tableContainer.scrollLeft;
			this.scrollOffsetRight = (this.$refs.table.offsetWidth - this.$refs.tableContainer.offsetWidth)
				- this.$refs.tableContainer.scrollLeft;
		},
		async toggleVisibleColumn(field, ev) {
			/*await this.setBackendConfig({key: this.visibilityKey + field, value: ev.target.checked});*/
			this.$emit("visible-columns-updated");
		},
		findIndex(arr, item) {
			let index = -1;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i] === item) {
					index = i;
					break;
				}
			}
			return index;
		},
		deselectSelected() {
			for (let i = 0; i < this.rows.length; i++) {
				this.rows[i].selected = false;
			}

			this.selected = [];
			this.selectAllValue = false;
		},
		setPage(page) {
			this.currentPage = page;

			let val = page - 1;
			this.rowOffset = val * this.rowLimit;
			this.selectAllValue = false;

			this.$nextTick(async () => {
				await this.searchFunction(true, false);
			});
		},
		setPageSize(size) {
			this.rowLimit = Number(size.target.value);
			this.rowOffset = 0;

			this.$nextTick(async () => {
				await this.searchFunction();
			});
		},
		firstPage() {
			this.setPage(1);
		},
		lastPage() {
			this.setPage(this.totalPages);
		},
		previousPage() {
			if (this.previousPageEnabled) {
				this.setPage(this.currentPage - 1);
			}
		},
		nextPage() {
			if (this.nextPageEnabled) {
				this.setPage(this.currentPage + 1);
			}
		},
		columnHeaderClick(column) {
			if (this.sortField !== column.field) {
				this.sortField = column.field;
				this.sortDirection = "desc";
			} else {
				this.sortDirection = (this.sortDirection === "desc") ? "asc" : "desc";
			}
		},
		columnClasses(column) {
			let classes = [];
			if (this.headerHidden)
				classes.push("hidden");

			if (this.sortField === column.field) {
				classes.push(this.sortDirection);
			}
			if (column.sticky) {
				classes.push(`sticky-${column.sticky}`);
			}

			return classes;
		},
		columnAriaSort(column) {
			if (this.sortField === column.field) {
				return this.sortDirection;
			}

			if (column.sortable) {
				return "none";
			}
			return null;
		},
		async resetFilters() {
			this.search = null;
			this.sortField = this.sort;
			this.sortDirection = this.order;

			await this.$emit("reset-filters");

			this.$nextTick(async () => {
				await this.searchFunction(true);
			});
		},
		arraySearch(search: string, rows: any[]) {
			console.time("Service Module: Array search");
			if (search == null || search === "") {
				rows.forEach(row => {
					row.IsHidden = false;
				});
				return;
			}

			const search1 = search ? search.trim().toLowerCase() : null;

			for (let i = 0; i < rows.length; i++) {
				let values = Object.values(rows[i]);
				let shown = false;

				for (let j = 0; j < values.length && !shown; j++) {
					let value = values[j];
					if (value == null) continue;

					if (uuidValidate(value.toString())) {
						shown = uuidValidate(search1) && value.toString() === search1;
					} else {
						shown = value.toString().toLowerCase().includes(search1);
					}
				}

				rows[i].IsHidden = !shown;
			}

			console.timeEnd("Service Module: Array search");
		},
		searchFunction(immediate = false, throttling = true) {
			if (Array.isArray(this.data)) {
				this.throttle = this.throttle || this.throttling(() => {
					if (!this.overrideInternalLoading) this.isLoadingInternal = true;
					try {
						this.arraySearch(this.search, this.rows);
						this.$emit("updated");
					} catch (e) {

					}

					if (!this.overrideInternalLoading) this.$nextTick(() => this.isLoadingInternal = false);

				}, throttling ? 200 : 0, {trailing: true});

				this.throttle();

				return;
			}

			this.throttle = this.throttle || this.throttling(async () => {
				this.isLoadingInternal = true;
				try {
					let visibleColumns = [];
					for (const visibleColumnsKey in this.visibleColumns) {
						if (this.visibleColumns[visibleColumnsKey])
							visibleColumns.push(visibleColumnsKey);
					}
					visibleColumns.push("ClientUid");
					visibleColumns.push(this.rowKey);
					let searchArgs = {
						"sort": this.sortField,
						"order": this.sortDirection,
						"limit": this.rowLimit,
						"offset": this.rowOffset
					};
					if (this.setSearchParamsVisibleColumns)
						searchArgs["visibleColumns"] = visibleColumns.join(",");
					if (this.search) searchArgs["search"] = this.search.trim();
					searchArgs = this.params(searchArgs);
					searchArgs = {...this.additionalSearchParams, ...searchArgs};
					let data = await this.data(searchArgs);
					for (let i = 0; i < data.rows.length; i++) {
						data.rows[i].selected = false;
						for (let j = 0; j < this.selected.length; j++) {
							if (this.selected[j] === data.rows[i][this.rowKey]) {
								data.rows[i].selected = true;
								break;
							}
						}
					}
					this.rows = data.rows;
					this.total = data.total;
					if (this.clearSelectedOnSearch)
						this.selected = [];
					this.$nextTick(() => {
						if (this.totalPages < this.currentPage)
							this.currentPage = 1;
					});
					this.isLoadingInternal = false;
					this.$emit("updated");
				} catch (e) {
					this.isLoadingInternal = false;
				}
			}, throttling ? 200 : 0, {trailing: false});
			this.throttle();
		},
		clickedRow(event, row) {
			this.$emit('clicked-row', event, row);
		},
		selectRowBulk(rows, selected) {
			let allSelected = this.rows.length !== 0;
			for (let i = 0; i < rows.length; i++) {
				let index = this.findIndex(this.selected, rows[i].Uid);

				if (index > -1)
					this.selected.splice(index, 1);
				else {
					this.selected.push(rows[i].Uid);
				}

				for (let b = 0; b < this.rows.length; b++) {
					if (this.rows[b][this.rowKey] === rows[i].Uid) {
						this.rows[b].selected = selected;
						if (!selected) allSelected = false;
					}
				}
			}

			this.disableSelectAllValueWatch = true;
			this.selectAllValue = allSelected;
			this.$nextTick(() => {
				this.disableSelectAllValueWatch = false;
			});
		},
		selectRow(id, selected = null) {
			let index = this.findIndex(this.selected, id);
			let added = false;
			if (selected !== null) {
				added = selected;
				if (index > -1) {
					if (!selected) this.selected.splice(index, 1);
				} else if (selected) {
					this.selected.push(id);
				}
			} else {
				if (index > -1)
					this.selected.splice(index, 1);
				else {
					this.selected.push(id);
					added = true;
				}
			}

			if (!selected) {
				this.disableSelectAllValueWatch = true;
				this.selectAllValue = false;
			}

			this.$nextTick(() => {
				this.disableSelectAllValueWatch = false;
				for (let i = 0; i < this.rows.length; i++) {
					if (this.rows[i][this.rowKey] === id) {
						this.rows[i].selected = added;
						break;
					}
				}

				this.$emit('selected-row', {id: id, selected: added});
			});
		},
		getFiltered(rows) {
			if(rows === "") return rows;
			return rows.filter(m => !m.IsHidden);
		},
		throttling(func, wait, options) {
			let timeout, context, args, result;
			let previous = 0;
			if (!options) options = {};
			let later = function () {
				previous = options.leading === false ? 0 : new Date().getTime();
				timeout = null;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			};
			let throttled = function () {
				let _now = new Date().getTime();
				if (!previous && options.leading === false) previous = _now;
				let remaining = wait - (_now - previous);
				context = this;
				args = arguments;
				if (remaining <= 0 || remaining > wait) {
					if (timeout) {
						clearTimeout(timeout);
						timeout = null;
					}
					previous = _now;
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				} else if (!timeout && options.trailing !== false) {
					timeout = setTimeout(later, remaining);
				}
				return result;
			};
			//@ts-ignore
			throttled.cancel = function () {
				clearTimeout(timeout);
				previous = 0;
				timeout = context = args = null;
			};
			return throttled;
		},
	}
});
</script>

<style lang="scss" scoped>
@import "~~/assets/scss/variables";

.select-column {
    width: 10px;
}

.border-top > th {
    border-top-color: #D4D4D4;
    border-top-width: 1px;
    border-top-style: solid;
}

.btn-brand-color {
    color: $brand-color;
}

.da-table {
    &-padding {
        width: 100%;
    }

    &-row {
        color: white;

        &:hover {
            background-color: #283650 !important;
            color: white;
        }

        &:nth-child(odd) {
            background-color: #36393f;
        }

        &:nth-child(even) {
            background-color: $filler-body-color;
        }

        &-noItems > td {
            background-color: #36393f !important;
            padding: 8px;
        }
    }
}

.table-header {
    background-color: $header-color;
    border: 1px solid $border-color;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px 15px;

    .da-table.is-compact & {
        padding: 5px 15px 8px;
    }

    .da-table.no-border-radius & {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
}

.table-top-row, .table-header-left-buttons, .table-header-right-buttons {
    flex: 1;
    display: flex;
}

.table-top-row {
    justify-content: center;
}

.table-header-left-buttons {
    margin: 6px auto 6px 6px;
    justify-content: flex-start;
}

.table-header-right-buttons {
    margin: 6px 6px 6px auto;
    justify-content: flex-end;

    .da-table.is-compact & {
        margin: 0;
    }
}

.plr-6px {
    padding: 0 6px;
    margin-top: 0;
    margin-bottom: 10px;
}

.table-top-row-title {
    margin: 6px;

    .da-table.is-compact & {
        margin: 0;
    }

    h2 {
        font-weight: bold;
        font-size: 20px;

        .da-table.is-compact & {
            display: inline-block;
            margin: 8px 0 0;
            font-size: 15px;
        }

        margin-bottom: 4px;
    }

    h3 {
        font-weight: 400;
        font-size: 16px;
        color: #d7d7d7;
        margin-bottom: 0;
    }
}

.table-pagination-center {
    & .pagination-button {
        color: #d7d7d7 !important;

        :hover:not(:disabled) {
            color: #fff !important;
        }
    }

    & > div > button {
        border: none;

        &.btn-outline-secondary {
            width: 33px;
            background-color: #5d6066;
            color: #dddddd;
            font-size: 14px;

            &.btn-outline-secondary.btn-dark {
                background-color: #7b7e83;
                color: #fff !important;
            }

            &:hover, &:active {
                background-color: #7b7e83;
                color: #fff !important;
            }

            &:disabled:hover {
                color: #fff !important;
            }
        }

        &:disabled {
            cursor: not-allowed;
            pointer-events: initial;
        }
    }
}


.table-outer-container {
    position: relative;
    border-left: 1px solid $border-color;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    background-color: #36393f !important;
}

.table-container {
    background-color: #36393f !important;
    overflow: auto;

    .table > :not(:last-child) > :last-child > * {
        border-bottom-color: transparent;
    }

    &:deep(.sticky-right) {
        position: sticky;
        right: 0;

        & .table-striped > tbody > tr:nth-of-type(even) {
            background-color: #212529;
        }
    }

    &:deep(.sticky-left) {
        position: sticky;
        left: 0;

        & .table-striped > tbody > tr:nth-of-type(even) {
            background-color: #212529;
        }
    }

    .shadow-left {

    }

    .shadow-right {

    }

    th {
        background-color: #1a1a1a;
        padding: 0;
        position: sticky;
        top: 0;

        & .column-name, button {
            color: white !important;
        }
    }

    &:deep(th), &:deep(td) {
        font-size: $da-table-font-size;
    }

    tr {
        border-style: none;
        border-color: transparent;

        td {
            white-space: nowrap;

            span {
                white-space: nowrap;
            }

            a, button {
                svg {
                    color: currentColor;
                }
            }
        }
    }

    button {
        font-size: $da-table-font-size;
    }
}

.table-pagination {
    padding: 10px;

    &, &-center, &-left, &-right {
        flex: 1;
        display: flex;
        align-items: center;
    }

    &-center {
        justify-content: center;

        > div {
            overflow: hidden;
            white-space: nowrap;
        }

        button {
            margin: 0 2.5px;
            border-radius: 2px;

            &.btn-dark:disabled {
                border-color: $border-color;
                background-color: #212529;
                opacity: 1;
            }
        }

        svg {
            width: 1.1em;
            height: 1.1em;
        }
    }

    &-left {
        margin-right: auto;
        justify-content: flex-start;
        vertical-align: middle;
        white-space: nowrap;

        select {
            width: auto;
            margin: 0 10px;
        }
    }

    &-right {
        margin-left: auto;
        justify-content: flex-end
    }
}

.header-check {
    margin: 0.8em;
}

.card {
    border-top: none;
    border-radius: 0;
}

.table-container {
    tr td {
        a, button {
            color: #8E9DA6;

            body.dark-theme & {
                color: $almost-white-color !important;
            }
        }

        button {
            top: -2px;
            position: relative;
            padding: 0 5px;
        }

        .btn-outline-secondary {
            &:hover, &:active {
                color: #fff;
            }
        }
    }

    .btn-table {
        padding: 1px 8px !important;
        font-size: 11px !important;


        &.btn-outline-secondary {
            color: $da-table-button-secondary-color;
            border-color: $da-table-button-secondary-color;
        }
    }
}

.da-table-total-row {
    td > * {
        padding-left: $da-table-cell-padding-left;
        white-space: nowrap;
    }
}

.btn-label {
    &:hover, &:active, &:focus {
        color: currentColor;
        background: white;
    }
}

#searchText {
    font-size: 14px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: hsl(0deg, 0%, 6%) !important;
    border-color: hsl(0deg, 0%, 6%) !important;
    color: white;
}

.da-table {
    .circle-icon {
        display: inline-block;
        border-radius: 50%;
        width: 21px;
        height: 21px;
        background-color: $grey-color;
        color: $almost-white-color;
        font-size: 14px;
        padding: 0 2px;
        margin-left: 10px;
        text-align: center;
    }

    &.is-compact {
        width: 100%;
        margin: 15px 0;

        .table-header-right-buttons svg {
            margin-top: 20px;
            margin-right: 20px;
        }

        .table-container {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
        }
    }

    .spinner-gritcode .spinner-wrapper {
        @supports (position:sticky) {
            position: sticky;
            top: 50vh;
            transform: none;
        }
    }
}
</style>