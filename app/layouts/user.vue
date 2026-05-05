<style lang="scss" scoped>
article {
    margin-top: 56px;
    overflow-x: hidden;
}

.page {
    position: relative;
    display: flex;
    flex-direction: row;
}

main, main.sidebar-closed, main.sidebar-open {
    flex: 1;
    max-width: calc(100% - 250px);
}

@media (max-width: 991px) {
    main, main.sidebar-closed {
        max-width: 100%;
    }

    main.sidebar-open {
        max-width: calc(100% - 250px);
    }
}
</style>

<template>
    <div class="page">
        <dashboard-navbar/>
        <side-menu>
            <template #side-menu>
                <server-menu/>
                <user-side-menu/>
            </template>
        </side-menu>
        <main id="main">
            <article class="container-fluid p-0">
                <div class="p-2 md:p-4 lg:p-6">
                    <NuxtPage/>
                </div>
            </article>
        </main>
        <cookie-consent :dash="true"/>
        <go-to-top/>
    </div>
</template>

<script>
import SideMenu from "~/components/main/side-menu.vue";

export default {
    name: "users",
    components: {SideMenu},
    data() {
        return {}
    },
    async mounted() {
        /*let token = localStorage.getItem('token');
        if (token !== null || token !== "") {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }*/
    }
}
</script>