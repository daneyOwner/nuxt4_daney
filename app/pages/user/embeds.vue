<template>
    <div class="row">
        <div class="col-12 col-lg-6">
            <embed-component v-model="embed" @input="updateEmbed"/>
        </div>
        <div class="col-12 col-lg-6">
            <embed-preview :embed="embed" @update-embed="updateFromPreview"/>
        </div>
    </div>
</template>

<script>
definePageMeta({
    layout: "user",
});
export default {
    name: "embeds",
    layout: "user",
    methods: {
        updateFromPreview(embed) {
            this.embed = embed;
        },
        updateEmbed() {
            this.update = false;

            this.$nextTick(() => this.update = true);
        }
    },
    data() {
        return {
            embed: {
                author: "",
                authorURL: "",
                authorIconURL: "",
                title: "",
                description: "",
                url: "",
                color: "#000000",
                imageURL: "",
                thumbnailURL: "",
                fields: [],
                footerText: "",
                timestamp: "",
                footerIconURL: "",
            },
            update: true,
        }
    }
}
</script>

<style scoped>

</style>