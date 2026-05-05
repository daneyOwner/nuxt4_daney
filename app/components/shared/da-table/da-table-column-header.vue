<style lang="scss" scoped>
@import "~/assets/scss/variables";
@import "~/assets/scss/functions";

.no-button {
    background-color: transparent;
    border: none;
    padding:  $table-cell-padding-y $table-cell-padding-x $table-cell-padding-y calc(#{$table-cell-padding-x} + 18px);
    width: 100%;
    font-weight: 600;
    color: $black;
}
button {
    background-color: transparent;
    border: none;
    padding: $table-cell-padding-y $table-cell-padding-x;
    width: 100%;

    span {
        display: inline-block;
    }
    &:hover, &:active {
        background-color: $menu-hover-link;
    }
}
.sort-icons {
    position: relative;
    width: 14px;
    height: 14px;

    &-desc, &-asc {
        position: absolute;
        left: 0;
        display: flex;

        z-index: 49;
        * {
            fill: $light-grey-color;
        }
    }
    &-asc {
        top: 1px;
    }
    &-desc {
        bottom: -3px;
    }

    .desc & {
        &-desc * {
            fill: $dark-color;
        }
    }
    .asc & {
        &-asc * {
            fill: $dark-color;
        }
    }
}
</style>

<template>
    <button @click="clickEvent" class="text-nowrap text-start" v-if="column.sortable" :style="{ 'width': (column.width ? column.width : null) }">
        <span class="sort-icons ">
			<svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" class="sort-icons-asc">
			  	<path id="Polygon_18" data-name="Polygon 18" d="M3.659,1.308a1,1,0,0,1,1.682,0L8.01,5.459A1,1,0,0,1,7.168,7H1.832A1,1,0,0,1,.99,5.459Z" fill="#d4d4d4"/>
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" class="sort-icons-desc">
			  	<path id="Polygon_19" data-name="Polygon 19" d="M3.659,1.308a1,1,0,0,1,1.682,0L8.01,5.459A1,1,0,0,1,7.168,7H1.832A1,1,0,0,1,.99,5.459Z" transform="translate(9 7) rotate(180)" fill="#d4d4d4"/>
			</svg>
        </span>
        <span class="column-name" v-html="name"></span>
    </button>
    <div v-else class="column-name no-button text-start" v-html="name"></div>
</template>

<script>
export default defineComponent({
    name: "da-table-column-header",
    props: {
        column: {
            required: true
        }
    },
    methods: {
        clickEvent(ev) {
            this.$emit("clicked")
        }
    },
    computed: {
        name() {
            if (!this.column) return "&nbsp;"
            if (!this.column.name) return "&nbsp;"
            return this.column.name;
        }
    }
});
</script>