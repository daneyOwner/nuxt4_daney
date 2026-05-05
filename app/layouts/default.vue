<style lang="scss" scoped>
article {
    margin-top: 56px;
    margin-bottom: 56px;
    overflow-x: hidden;
}
</style>

<template>
    <div class="page">
        <div class="min-h-dvh">
            <main-navbar/>
            <article class="container mx-auto">
                <div class="p-2 md:p-4 lg:p-6">
                    <slot/>
                </div>
            </article>
<!--            <go-to-top/>
            <cookie-consent :dash="false"/>
            <main-footer/>-->
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({auth: false})
</script>

