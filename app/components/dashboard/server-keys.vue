<template>
    <div>
        <da-panel title="Verification System" :has-loading-icon="true" :is-loading="isLoading">
            <template #panel-top-actions>
                <button class="btn btn-primary">
                    Quick Setup
                </button>
                <button @click="save()" class="btn btn-orange">
                    Save
                </button>
            </template>
            <da-panel-tab v-if="categories.length > 0" name="Categories" id-field="categories">
                <div class="grid grid-cols-2 gap-5">
                    <template v-for="category in categories">
                        <div class="flex-1 basis-1/2 min-w-[250px]">
                            <sim-select :title="category.Name" v-model="category.Value" :help-text="category.HelpText"
                                        :max="category.Amount" :required="category.Required"
                                        :multiple="category?.Amount != null && category.Amount >= 2"
                                        :options="categoriesOptions"/>
                        </div>
                    </template>
                </div>
            </da-panel-tab>
            <da-panel-tab v-if="channels.length > 0" name="Channels" id-field="channels">
                <div class="grid grid-cols-2 gap-5">
                    <template v-for="channel in channels">
                        <div>
                            <sim-select :title="channel.Name" v-model="channel.Value" :help-text="channel.HelpText"
                                        :max="channel.Amount" :required="channel.Required"
                                        :multiple="channel?.Amount != null && channel.Amount >= 2"
                                        :options="channelsOptions"/>
                        </div>
                    </template>
                </div>
            </da-panel-tab>
            <da-panel-tab v-if="roles.length > 0" name="Roles" id-field="roles">
                <div class="grid grid-cols-2 gap-5">
                    <template v-for="role in roles">
                        <div>
                            <sim-select :title="role.Name" v-model="role.Value" :help-text="role.HelpText"
                                        :max="role.Amount" :required="role.Required"
                                        :multiple="role?.Amount != null && role.Amount >= 2"
                                        :options="rolesOptions"/>
                        </div>
                    </template>
                </div>
            </da-panel-tab>
            <da-panel-tab v-if="textParagraphs.length > 0 || texts.length > 0" name="Texts"
                          id-field="texts" icon="fa-solid fa-server">
                <div class="grid grid-cols-2 gap-5" v-if="textParagraphs || texts">
                    <template v-if="textParagraphs" v-for="textParagraph in textParagraphs">
                        <sim-textarea v-model="textParagraph.Value" :title="textParagraph.Name"
                                      :max="textParagraph.PremiumFeature ? textParagraph.PremiumMaxLength : textParagraph.MaxLength"
                                      :help-text="textParagraph.HelpText"
                        />
                    </template>

                    <template v-if="texts" v-for="text in texts">
                        <sim-input v-model="text.Value" :title="text.Name"
                                   :max="text.PremiumFeature ? text.PremiumMaxLength : text.MaxLength"
                                   :help-text="text.HelpText"
                        />
                    </template>
                </div>
            </da-panel-tab>
            <da-panel-tab v-if="booleans.length > 0" name="Verification Settings" id-field="settings">
                <div class="grid grid-cols-2 gap-5">
                    <template v-for="boolean in booleans">
                        <div>
                            <label :for="boolean.UID">
                                {{ boolean.Name }}
                                <client-only>
                                    <u-tooltip arrow :popper="{ placement: 'top' }" class="inline-block!"
                                               :text="boolean.HelpText as string">
                                        <div>
                                            <font-awesome-icon icon="fa-solid fa-circle-question" fixed-width/>
                                        </div>
                                    </u-tooltip>
                                </client-only>
                            </label>
                            <input type="checkbox" :id="boolean.UID" v-model="boolean.Value"/>
                        </div>
                    </template>
                </div>
            </da-panel-tab>
        </da-panel>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";

import {useNuxtApp} from "nuxt/app";

import {DiscordCategoryApi} from "~~/services/autogenerated/V1/api/discord-category-api";
import {DiscordChannelApi} from "~~/services/autogenerated/V1/api/discord-channel-api";
import {DiscordRoleApi} from "~~/services/autogenerated/V1/api/discord-role-api";
import {ServerKeysBaseApi} from "~~/services/autogenerated/V1/api/server-keys-base-api";
import {ServerKeysApi} from "~~/services/autogenerated/V1/api/server-keys-api";
import type {
    APIDaneyModelsCommonSelectItem,
    APIDaneyModelsServerKeysServerKeyModel
} from "~~/services/autogenerated/V1/models";

let props = defineProps({
    uids: {
        type: Array
    }
});

const {$getSwaggerAxiosOptions, $constants} = useNuxtApp();

let DiscordCategoryService = new DiscordCategoryApi($getSwaggerAxiosOptions());
let DiscordChannelService = new DiscordChannelApi($getSwaggerAxiosOptions());
let DiscordRoleService = new DiscordRoleApi($getSwaggerAxiosOptions());
let ServerKeysBaseService = new ServerKeysBaseApi($getSwaggerAxiosOptions());
let ServerKeysService = new ServerKeysApi($getSwaggerAxiosOptions());

let isLoading = ref<Boolean>(true);

let categoriesOptions = ref<APIDaneyModelsCommonSelectItem[]>([]);
let channelsOptions = ref<APIDaneyModelsCommonSelectItem[]>([]);
let rolesOptions = ref<APIDaneyModelsCommonSelectItem[]>([]);

let serverKeys = ref<APIDaneyModelsServerKeysServerKeyModel[]>([]);
let categories = ref<APIDaneyModelsServerKeysServerKeyModel[]>([]);
let channels = ref<APIDaneyModelsServerKeysServerKeyModel[]>([]);
let texts = ref<APIDaneyModelsServerKeysServerKeyModel[]>([]);
let textParagraphs = ref<APIDaneyModelsServerKeysServerKeyModel[]>([]);
let roles = ref<APIDaneyModelsServerKeysServerKeyModel[]>([]);
let booleans = ref<APIDaneyModelsServerKeysServerKeyModel[]>([]);

let route = useRoute();
const toast = useToast();

async function getCategories() {
    categoriesOptions.value = (await DiscordCategoryService.getCategories({
        guildID: route.params.id as string,
    })).data;
}

async function getChannels() {
    channelsOptions.value = (await DiscordChannelService.getChannels({
        guildID: route.params.id as string,
    })).data;
}

async function getRoles() {
    rolesOptions.value = (await DiscordRoleService.getRoles({
        guildID: route.params.id as string,
    })).data;
}

async function getServerKeys() {
    serverKeys.value = (await ServerKeysBaseService.getAll({
        APIDaneyControllersServerKeyRequest: {
            GuildID: route.params.id as string,
            Types: [$constants.types.channel, $constants.types.category, $constants.types.role,
                $constants.types.text, $constants.types.textParagraph, $constants.types.boolean],
            Uids: props.uids as Array<string>
        },
    })).data;

    for (let i = 0; i < serverKeys.value.length; i++) {
        let serverKey = serverKeys.value[i];
        if (serverKey == null) continue;

        if (serverKey.Type === $constants.types.category) categories.value.push(serverKey);
        if (serverKey.Type === $constants.types.channel) channels.value.push(serverKey);
        if (serverKey.Type === $constants.types.textParagraph) textParagraphs.value.push(serverKey);
        if (serverKey.Type === $constants.types.text) texts.value.push(serverKey);
        if (serverKey.Type === $constants.types.role) roles.value.push(serverKey);
        if (serverKey.Type === $constants.types.boolean) booleans.value.push(serverKey);
    }

    isLoading.value = false;
}

onMounted(async () => {
    let getCategoriesTask = getCategories();
    let getChannelsTask = getChannels();
    let getRolesTask = getRoles();
    let getServerKeysTask = getServerKeys();

    await Promise.all([getCategoriesTask, getChannelsTask, getRolesTask, getServerKeysTask]);
});

async function save() {
    try {
        debugger
        let values = [
            ...categories.value,
            ...channels.value,
            ...textParagraphs.value,
            ...texts.value,
            ...roles.value,
            ...booleans.value
        ];

        values = values.map((item) => {
            return {
                UID: item.UID,
                Value: item.Value,
            }
        });

        await ServerKeysService.upsertAll({
            guildID: route.params.id as string,
            APIDaneyRepositoriesEntitiesServerKeyRequester: values,
        });

        toast.add({
            color: "success",
            description: "Settings saved successfully!",
            title: "Success"
        });
    } catch (error) {
        toast.add({
            color: "error",
            description: "Failed to save settings. Please try again.",
            title: "Error"
        });

        console.error("Save error:", error);
    }
}
</script>

