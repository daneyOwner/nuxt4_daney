<template>
    <div>
        <server-keys :uids="uids"></server-keys>
    </div>
</template>

<script setup>
import {ref} from "vue";
const {$constants} = useNuxtApp();

let uids = ref([
    // $categories
    $constants.categories.ageCategoryID,
    
    // $channels
    $constants.channels.welcomeAcceptChannelID,
    $constants.channels.verificationLogChannelID,
    $constants.channels.verificationActionLogChannelID,
    $constants.channels.verificationReverseSearchChannelID,
    $constants.channels.rippleVerificationChannelID,
    
    // $roles
    $constants.roles.rippleRoleID,
    $constants.roles.extraVerifiedRoleID,
    $constants.roles.crossVerifiedRoleID,
    $constants.roles.verifiedRoleID,
    $constants.roles.unverifiedRoleID,
    $constants.roles.ticketSupportRoleID,
    $constants.roles.ticketSupport2RoleID,
    $constants.roles.ticketSupportHeadRoleID,
    $constants.roles.dividerRoles,
    
    // $texts
    $constants.texts.verificationTicketName,
    
    // $textParagraphs
    $constants.textParagraphs.openTicketText,
    $constants.textParagraphs.welcomeAcceptText,
    
    // $booleans
    $constants.booleans.addVerifiedRoleOnCrossVerification,
]);

definePageMeta({
    layout: "dashboard",
});
</script>