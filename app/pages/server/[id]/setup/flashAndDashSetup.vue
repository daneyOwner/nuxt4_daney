<template>
    <div>
        <server-keys :uids="uids" />
    </div>
</template>

<script setup>
import {ref} from "vue";
const {$constants} = useNuxtApp();

let uids = ref([
    // $channels
    $constants.channels.flashAndDashChannelID,
    // $roles
    $constants.roles.flashAndDashRoleID,
]);

definePageMeta({
    layout: "dashboard",
});
</script>