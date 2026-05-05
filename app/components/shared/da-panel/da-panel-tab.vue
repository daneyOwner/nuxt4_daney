<template>
    <div :id="idField" v-show="showTab">
        <h4 class="mb-4" v-if="hasHeader">
            <client-only>
                <font-awesome-icon class="me-1" v-if="icon" :icon="icon" fixed-width/>
            </client-only>
            <component v-if="iconComponent" :is="iconComponent"/>
            <span>{{ name }}</span>
        </h4>
        <slot/>
    </div>
</template>

<script>
import {v4 as newGuid} from "uuid";

export default {
    name: "da-panel-tab",
    abstract: true,
    inheritAttrs: false,
    props: {
        print: {default: true},
        idField: {
            default() {
                return newGuid();
            }
        },
        name: {default: ""},
        icon: {default: false},
        iconComponent: {default: false},
        defaultActive: {default: false},
        hasHeader: {default: true},
        show: {default: true},
        isDisabled: {default: false}
    },
    computed: {
        showTab() {
            if (this.panel._hasToggle && this.panel.activeTab === this.idField) return true;
            else if (this.panel._hasToggle && this.defaultActive && this.panel.activeTab === '') return true;
            else if (!this.panel._hasToggle && this.show && !this.isDisabled) return true;

            return false;
        }
    },
    data() {
        return {
            panel: null,
        };
    },
    created() {
        this._isPanelTab = true;
        let tabs = this;
        while (!this._tabs && tabs.$parent) {
            if (tabs._isPanel) {
                this.panel = tabs;
                tabs.tabs.push(this);
                this._tabs = tabs;
            }
            tabs = tabs.$parent;
        }
        if (!this._tabs) throw Error('da-panel-tab depend on da-panel.');
    },
    beforeDestroy() {
        if (this._tabs) {
            this._tabs.tabs = this._tabs.tabs.filter(el => el !== this);
        }
        if (this._tabs) {
            if (this._tabs.active === this.index) {
                this._tabs.index = 0;
            }
        }
        if (this._tabs) {
            let id = this._tabs.tabs.indexOf(this);
            if (~id) this._tabs.tabs.splice(id, 1);
        }
    }
};
</script>