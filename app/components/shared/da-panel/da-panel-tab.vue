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

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as newGuid } from "uuid";

interface PanelParent {
    _isPanel?: boolean;
    _hasToggle?: boolean;
    activeTab?: string;
    tabs: any[];
    index?: number;
}

export default defineComponent({
    name: "da-panel-tab",
    inheritAttrs: false,

    props: {
        print: { type: Boolean, default: true },

        idField: {
            type: String,
            default: () => newGuid()
        },

        name: { type: String, default: "" },

        icon: { type: [String, null], default: false },

        iconComponent: { type: [Object, Function] as any, default: false },

        defaultActive: { type: Boolean, default: false },

        hasHeader: { type: Boolean, default: true },

        show: { type: Boolean, default: true },

        isDisabled: { type: Boolean, default: false }
    },

    data() {
        return {
            panel: null as PanelParent | null,
            _tabs: null as PanelParent | null
        };
    },

    computed: {
        showTab(): boolean {
            if (this.panel?._hasToggle && this.panel.activeTab === this.idField) return true;
            if (this.panel?._hasToggle && this.defaultActive && this.panel.activeTab === "") return true;
            if (!this.panel?._hasToggle && this.show && !this.isDisabled) return true;
            return false;
        }
    },

    created() {
        (this as any)._isPanelTab = true;

        let parent: any = this.$parent;

        while (parent) {
            if (parent._isPanel) {
                this.panel = parent;
                parent.tabs.push(this);
                this._tabs = parent;
                break;
            }
            parent = parent.$parent;
        }

        if (!this._tabs) {
            throw new Error("da-panel-tab depends on da-panel.");
        }
    },

    beforeUnmount() {
        if (!this._tabs) return;

        // Remove from tabs
        this._tabs.tabs = this._tabs.tabs.filter((el: any) => el !== this);

        // Reset active index if needed
        if (this._tabs.active === (this as any).index) {
            this._tabs.index = 0;
        }

        const idx = this._tabs.tabs.indexOf(this);
        if (idx !== -1) this._tabs.tabs.splice(idx, 1);
    }
});
</script>
