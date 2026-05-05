<style scoped lang="scss">

</style>

<template>
    <div class="flex gap-x-6">
        <div class="grow">
            <da-table :data="rows" title="Payments" :has-auto-focus="true"
                      row-key="UID" :has-select-column="false" 
                      ref="table" :has-reset-filters="false"
                      :limit="initialPageLimit" :offset="initialPageOffset" :sort="initialSortField"
                      :order="initialSortDirection" :initial-search="initialSearch">
                <da-table-column field="UserName" :component="daTableSlotFormatter"
                                 field-wrapper-class="wrapper" name="User" :sortable="true">
                    <template slot-scope="{row, field}" v-if="row">
                        test
                    </template>
                </da-table-column>
            </da-table>
        </div>
        <div class="flex-none w-[500px]">
            <accordion id="test">
                <template v-for="command in commands">
                    <command-item :command="command" />
                </template>
            </accordion>
        </div>
    </div>
</template>

<script setup lang="ts">
import daTableSlotFormatter from "~/components/shared/da-table/da-table-slot-formatter.vue";

definePageMeta({
    layout: "user",
});


let rows = ref(null);
rows.value = {rows: [
        {
            test: "",
        },
        {
            test: "",
        }
    ], total: 2};

let typeSettings = ref({
    placeholder: "Type",
});
let types = ref([]);
let type = ref(1);

let initialSearch = ref("");
let initialPageLimit = ref(50);
let initialPageOffset = ref(0);
let initialSortDirection = ref("desc");
let initialSortField = ref("DateCreated");

import Accordion from "~/components/shared/core/accordion/accordion.vue";
import CommandItem from "~/components/main/commands/command-item.vue";

let commands = ref([]);


commands.value.push({
    header: true,
    commandName: "Leveling System",
    commandTypes: ["leveling"],
});

commands.value.push({
    commandName: "level",
    commandShortText: "Show level information.",
    commandBigText: `
                                <span>You can choose a person or leave it blank and see your own level information.</span>
                                <span>user<small> - which person?</small></span><br>
                            `,
    commandTypes: ["leveling"],
});
commands.value.push({
    commandName: "leaderboard",
    commandShortText: "Show leaderboard.",
    commandBigText: `
                                <span>type<small> - which type?</small></span>
                                <ul class="list-disc pl-8">
                                    <li>Monthly</li>
                                    <li>Yearly</li>
                                    <li>All Time</li>
                                </ul>
                            `,
    commandTypes: ["leveling"],
});
commands.value.push({
    commandName: "disable_level_up_message",
    commandShortText: "Disable level up message ping",
    commandBigText: `
                                <span>You can disable the level up ping by using this command(Might be come a paid command in the future).</span>
                            `,
    commandTypes: ["leveling"],
});
</script>