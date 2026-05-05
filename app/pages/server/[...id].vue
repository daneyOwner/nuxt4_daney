<style scoped lang="scss">

</style>

<template>
    <div>
        aa
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});

let route = useRoute();

import { onMounted } from "vue";
onMounted(async () => {
    if(route.path.includes("Dashboard")) return;
    navigateTo(route.path + "/Dashboard")
});
</script>