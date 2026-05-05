<style scoped lang="scss">
@media (max-width: 1100px) {
    .da-panel-header {
        flex-direction: column;

        & > .da-panel-header-buttons {
            margin-left: 0;
            margin-right: 0;

            & a:first-child, button:first-child {
                margin-left: 0;
            }

            & a, button {
                padding: 0.286rem 1.55rem;
                margin-left: 0;
                width: 100%;
            }

            & a:not(:last-child), button:not(:last-child) {
                margin-bottom: 4px;
            }
        }
    }
}

@media (max-width: 500px) {
    .da-panel-header {
        flex-direction: column;

        & > .da-panel-header-buttons {
            margin-left: 0;
            margin-right: 0;

            & a, button {
                padding: 0.286rem 1.55rem;
                margin-left: 0;
                width: 100%;
            }

            & a:not(:last-child), button:not(:last-child) {
                margin-bottom: 4px;
            }
        }
    }

    .da-panel-content-menu-top-item {
        width: 100%;
    }
}
</style>

<style lang="scss" scoped>
@import "~/assets/scss/variables";

.da-panel {
    width: 100%;

    &__buttons {
        background-color: $filler-body-color;
        border-color: $border-color !important;
    }

    &-header {
        background-color: $header-color;
        border: 1px solid $border-color;
        color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 15px 15px;

        flex: 1;
        display: flex;
        justify-content: center;

        h4 {
            margin: 6px auto 6px 6px;
            justify-content: flex-start;
            font-weight: 700;
        }

        &-buttons {
            margin: 2px 6px 0 auto;
            justify-content: flex-end;

            a {
                cursor: pointer;
            }

            a, button, input, & > span {
                margin-left: 25px;
                vertical-align: middle;
            }

            &-separator {
                display: inline-block;
                border-right: 1px solid $border-color;
                height: 33.5px;
            }
        }
    }

    &-content {
        display: flex;

        &-menu-items-item,
        &-body h2 {
            & > .svg-inline--fa {
                margin-right: 10px;
                height: auto !important;
                width: 20px !important;
            }
        }

        &-bordered-top-left {
            border-top: 1px solid $border-color;
            border-top-left-radius: 10px;
        }

        &-bordered-top-right {
            border-top: 1px solid $border-color;
            border-top-right-radius: 10px;
        }

        &-menu-items {
            display: inline-block;
            align-self: flex-start;
            width: 290px;
            vertical-align: top;

            padding: 15px 0;

            border-bottom-left-radius: 10px;
            border-left: 1px solid $border-color;
            border-bottom: 1px solid $border-color;

            background-color: $filler-body-color;

            &-item {
                display: flex;
                text-decoration: none;
                vertical-align: middle;

                padding: 15px;

                color: $almost-white-color;

                &.active {
                    color: white;
                    background-color: $menu-active-bg;
                }

                &:hover, &:focus {
                    color: white;
                    background-color: $menu-hover-bg;
                }
            }
        }

        &-body {
            position: relative;

            display: inline-block;
            width: 100%;
            max-height: calc(100vh - 180px);
            overflow: auto;

            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;

            background-color: $filler-body-color;
            border-left: 1px solid $border-color;
            border-right: 1px solid $border-color;
            border-bottom: 1px solid $border-color;

            &:deep(> div) {
                padding: 30px;
                border-bottom: 1px solid $border-color;
            }
        }
    }
}

form.da-panel-inside {
    max-height: calc(100vh - 110px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.da-panel-content-menu-top-item {
    height: 52px;
    background-color: $filler-body-color;
    display: inline-flex;
    text-decoration: none;
    vertical-align: middle;
    padding: 15px;
    color: $almost-white-color;

    & > svg {
        margin-right: 10px;
        height: auto !important;
        width: 20px !important;
    }

    &.active {
        color: white;
        background-color: $menu-active-bg;
    }

    &:hover {
        background-color: $menu-hover-bg;
        color: white;
    }

    &__only {
        display: none;
    }

    &__disabled {
        color: #707070;
        cursor: not-allowed;

        &:hover, &:focus {
            background-color: #fff;
        }
    }
}
</style>

<template>
    <div class="da-panel" ref="panel">
        <div v-if="hasHeader" class="da-panel-header">
            <h4>{{ title }}</h4>
            <div class="da-panel-header-buttons">
                <slot name="panel-top-actions"/>
            </div>
        </div>
        <div v-if="windowWidth <= 1560" ref="topMenu" :class="{'border-0': tabs.length === 1}"
             class="da-panel__buttons border border-top-0">
            <template v-for="tab in tabs">
                <a @click.prevent="() => setTab(tab.idField, true)" class="da-panel-content-menu-top-item"
                   :class="{'active': activeTab === tab.idField, 'da-panel-content-menu-top-item__only': tabs.length === 1}"
                   :href="'#?' + tab.idField" v-show="tab.show && !tab.isDisabled">
                    <client-only>
                        <font-awesome-icon v-if="tab.icon" :icon="tab.icon" fixed-width/>
                    </client-only>
                    <component v-if="tab.iconComponent" :is="tab.iconComponent"/>
                    <span>{{ tab.name }}</span>
                </a>
                <span class="da-panel-content-menu-top-item da-panel-content-menu-top-item__disabled"
                      v-show="tab.isDisabled">
                    <client-only>
                        <font-awesome-icon v-if="tab.icon" :icon="tab.icon" fixed-width/>
                    </client-only>
                    <component v-if="tab.iconComponent" :is="tab.iconComponent"/><span>{{ tab.name }}</span>
                </span>
            </template>
        </div>
        <div class="da-panel-content">
            <div v-if="windowWidth >= 1560" :class="{'da-panel-content-bordered-top-left': !hasHeader}"
                 class="da-panel-content-menu-items">
                <template v-for="tab in tabs">
                    <a @click.prevent="() => setTab(tab.idField, true)" class="da-panel-content-menu-items-item"
                       :class="{'active': activeTab === tab.idField}"
                       :href="'#?' + tab.idField" v-show="tab.show && !tab.isDisabled">
                        <client-only>
                            <font-awesome-icon v-if="tab.icon" :icon="tab.icon" fixed-width/>
                        </client-only>
                        <component v-if="tab.iconComponent" :is="tab.iconComponent"/>
                        <span>{{ tab.name }}</span>
                    </a>
                    <span class="da-panel-content-menu-items-item da-panel-content-menu-items-item__disabled"
                          v-show="tab.isDisabled">
                        <client-only>
                            <font-awesome-icon v-if="tab.icon" :icon="tab.icon" fixed-width/>
                        </client-only>
                        <component v-if="tab.iconComponent" :is="tab.iconComponent"/><span>{{ tab.name }}</span>
                    </span>
                </template>
            </div>
            <div @scroll="listener" :class="{'da-panel-content-bordered-top-right': !hasHeader}"
                 class="da-panel-content-body" ref="dPanelContentBody" :style="{'max-height': bodyHeight}">
                <template v-if="hasLoadingIcon && isLoading">
                    <div class="position-relative" style="height: 100px;">
                        <spinner size="2x" @done="scroll" class="text-center" style="height: 100px;" :value="true"/>
                    </div>
                </template>
                <template v-else-if="loadError">
                    <div class="row m-5">
                        <div class="col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="129.144" height="82.219"
                                 viewBox="0 0 129.144 82.219" class="error-icon">
                                <g data-name="Group 248" transform="translate(0 -32)" opacity="0.75">
                                    <path
                                        d="M125.915,89.553h-9.686V42.963c0-6.047-5.8-10.963-12.914-10.963H25.829c-7.119,0-12.914,4.916-12.914,10.963V89.553H3.229A3.014,3.014,0,0,0,0,92.294v8.222c0,7.556,7.24,13.7,16.143,13.7H113c8.9,0,16.143-6.148,16.143-13.7V92.294A3.014,3.014,0,0,0,125.915,89.553ZM19.372,42.963c0-3.027,2.892-5.481,6.457-5.481h77.486c3.566,0,6.457,2.455,6.457,5.481V89.553H78.925a1.623,1.623,0,0,0-1.6,1.214c-.652,2.443-3.225,4.267-6.3,4.267H58.115c-3.073,0-5.646-1.824-6.3-4.267a1.623,1.623,0,0,0-1.6-1.214H19.372Zm103.315,57.553c0,4.534-4.344,8.222-9.686,8.222H16.143c-5.341,0-9.686-3.688-9.686-8.222V95.034h39.3c1.33,3.189,4.92,5.481,9.131,5.481H74.258c4.213,0,7.8-2.292,9.131-5.481h39.3Z"
                                        fill="#ed6a1c"/>
                                    <path
                                        d="M169.688,147.523l4.683-4.683a1.472,1.472,0,0,0,0-2.082l-1.041-1.041a1.472,1.472,0,0,0-2.082,0l-4.683,4.683-4.683-4.683a1.472,1.472,0,0,0-2.081,0l-1.041,1.041a1.472,1.472,0,0,0,0,2.082l4.683,4.683-4.683,4.683a1.472,1.472,0,0,0,0,2.081l1.041,1.041a1.472,1.472,0,0,0,2.081,0l4.683-4.683,4.683,4.683a1.472,1.472,0,0,0,2.082,0l1.041-1.041a1.472,1.472,0,0,0,0-2.081Z"
                                        transform="translate(-125.526 -88.91)" fill="#ed6a1c"/>
                                    <path
                                        d="M396.86,147.523l4.683-4.683a1.472,1.472,0,0,0,0-2.082l-1.041-1.041a1.472,1.472,0,0,0-2.082,0l-4.683,4.683-4.683-4.683a1.472,1.472,0,0,0-2.082,0l-1.041,1.041a1.472,1.472,0,0,0,0,2.082l4.683,4.683-4.683,4.683a1.472,1.472,0,0,0,0,2.081l1.041,1.041a1.472,1.472,0,0,0,2.082,0l4.683-4.683,4.683,4.683a1.472,1.472,0,0,0,2.082,0l1.041-1.041a1.472,1.472,0,0,0,0-2.081Z"
                                        transform="translate(-305.633 -88.91)" fill="#ed6a1c"/>
                                    <line x2="22.439" transform="translate(53.352 79.033)" stroke="#ed6a1c"
                                          stroke-linecap="round" stroke-miterlimit="10" stroke-width="5"/>
                                </g>
                            </svg>
                        </div>
                        <div class="col-12 text-center">
                            <p>
                                {{ loadErrorText }}
                            </p>
                        </div>
                    </div>
                </template>
                <slot v-else/>
            </div>
        </div>
    </div>
</template>

<script>
import isNullOrEmpty from "~~/isNullOrEmpty";

export default {
    name: "da-panel",
    props: {
        title: {
            validator: function (value) {
                return typeof value === "string";
            }
        },
        hasLoadingIcon: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        loadError: {
            type: Boolean,
            default: false
        },
        loadErrorText: {
            type: String,
            default() {
                /*return this.Resource.ServerError*/
            }
        },
        customBodyHeight: {
            type: Number,
            default: 0
        },
        hasToggle: {
            type: Boolean,
            default: false
        },
        defaultIdField: {default: "main"},
        hasHeader: {default: true, type: Boolean},
        tabsActive: {default: true, type: Boolean},
        disableListener: {default: false, type: Boolean},
        setHash: {default: true, type: Boolean}
    },
    data() {
        return {
            tabs: [],
            activeTab: null,
            firstRender: true,
            windowWidth: 1900,
        };
    },
    computed: {
        bodyHeight() {
            return `calc(100vh - ${185 + this.customBodyHeight}px)`;
        }
    },
    watch: {
        tabsActive(val, oldVal) {
            if (val != oldVal && val) {
                this.$nextTick(() => this.listener(null));
            }
        },
        isLoading(val, oldVal) {
            if (val != oldVal && !val) {
                this.$nextTick(() => this.listener(null));
            }
        },
        activeTab(val, oldVal) {
            if (val != oldVal) {
                this.$nextTick(() => this.$emit("activeTabChanged", val));
            }
        }
    },
    created() {
        this._isPanel = true;
        this._hasToggle = this.hasToggle;
    },
    mounted() {
        this.windowWidth = document.documentElement.clientWidth;
        document.addEventListener("scroll", this.listener);
        window.onresize = () => {
            this.windowWidth = document.documentElement.clientWidth;
            if (this.$refs != null && this.$refs.topMenu != null && this.$refs.dPanelContentBody != null && this.$refs.dPanelContentBody.style != null) {
                this.$refs.dPanelContentBody.style.maxHeight = `calc(100vh - ${160 + this.customBodyHeight + (this.$refs.topMenu == null ? 0 : this.$refs.topMenu.clientHeight)}px)`;
            }
        }
        this.listener(null);
    },
    methods: {
        scroll() {
            if (isNullOrEmpty(this.activeTab)) return;
            let element = this.$refs.panel.querySelector("#" + this.activeTab);
            if (!element) return;

            this.$refs.panel.querySelector(".da-panel-content-body")
                .scrollTo(element.offsetLeft, element.offsetTop);
        },
        listener(e) {
            if (!this.tabsActive) return;
            if (this.firstRender) {
                this.firstRender = false;
                let handled = false;

                if (location.hash.length !== 0) {
                    const idField = location.hash.replace("#?", "");
                    for (let i = 0; i < this.tabs.length; i++) {
                        if (this.tabs[i].idField === idField) {
                            this.setTab(idField, true);

                            handled = true;
                            break;
                        }
                    }

                    return;
                }

                if (!handled) {
                    if (this.tabs.length === 0) this.setTab("main");
                    else {
                        const defaultTab = this.tabs.filter(m => m.defaultActive);
                        if (defaultTab.length != 0)
                            this.setTab(defaultTab[0].idField, true);
                        else
                            this.setTab(this.tabs[0].idField, true);
                    }

                    return;
                }

            }
            if (this.disableListener) return;

            let sectionPositions = [];
            for (let i = 0; i < this.tabs.length; i++) {
                const tab = this.tabs[i];
                let element = this.$refs.panel.querySelector("#" + tab.idField);
                let offsetTop = 0;
                if (!this._hasToggle) {
                    offsetTop = element.offsetTop + element.offsetHeight;
                }
                sectionPositions.push({idField: tab.idField, offsetTop: offsetTop - 4})
            }

            let panelScrollTop = e === null ? 0 : e.srcElement.scrollTop;
            sectionPositions.reverse();
            let activeTab = null;
            if (panelScrollTop === 0 && sectionPositions.length > 0) {
                activeTab = sectionPositions[sectionPositions.length - 1].idField;
            } else {
                for (let i = 0; i < sectionPositions.length; i++) {
                    const sectionPosition = sectionPositions[i];
                    if (sectionPosition.offsetTop >= panelScrollTop) {
                        activeTab = sectionPosition.idField;
                    }
                }
            }

            if (activeTab) {
                this.setTab(activeTab);
            }
        },
        setTab(idField, scrollIntoView = false) {
            if (idField.indexOf("#?") > -1)
                idField = idField.replace("#?", "");

            const tab = this.tabs.filter(m => m.idField == idField);
            if (tab.length === 0) {
                if (this.tabs.length === 0) idField = "main";
                else idField = this.tabs[0].idField;
            }

            let idFieldId = idField;
            if (idFieldId.indexOf("#") == -1)
                idFieldId = "#" + idFieldId;

            this.activeTab = idField;
            if (this.$route.hash !== "#?" && this.$route.hash !== "#?" + idField) {
                if (this.setHash) this.$router.push({hash: "#?" + idField, query: this.$route.query});
            }

            if (scrollIntoView) {
                let item = this.$refs.panel.querySelector(idFieldId);
                if (item != null && scrollIntoView) {
                    this.$emit("active-tab-changed", idFieldId);
                    item.scrollIntoView();
                }
            }
        }
    }
};
</script>