<style scoped>
.nav-link {
    margin-left: 4px;
    padding: 10px;
    color: hsla(0, 0%, 100%, 0.55);
    text-align: left;
}

.router-link-exact-active {
    color: white;
}
</style>

<template>
    <nav class="bg-[#202225] fixed w-full py-2 text-white z-1030">
        <div class="mx-auto flex items-center justify-between ms-4 me-4 h-[40px]">
            <div class="flex items-center">
                <button @click="openSideMenu" class="lg:hidden me-4">
                    <span class="block w-6 h-0.5 bg-white"></span>
                    <span class="block w-6 h-0.5 bg-white my-1"></span>
                    <span class="block w-6 h-0.5 bg-white"></span>
                </button>
                <nuxt-link to="/" class="flex">
                    <img src="/images/daney.webp" loading="lazy" alt="daney icon" class="h-8 w-auto"/>
                    <span class="ml-2 font-bold ms-2 float-end text-white text-[1.25rem]">{{$constants.main.botName}}</span>
                </nuxt-link>
            </div>
            <button @click="toggleMenu" class="lg:hidden">
                <span class="block w-6 h-0.5 bg-white"></span>
                <span class="block w-6 h-0.5 bg-white my-1"></span>
                <span class="block w-6 h-0.5 bg-white"></span>
            </button>
            <div :class="{ 'hidden': !menuOpen, 'block': menuOpen }"
                 class="absolute top-full left-0 w-full bg-[#202225] flex flex-col lg:static lg:bg-transparent lg:flex lg:flex-row lg:items-center lg:justify-end lg:w-auto">
                <nuxt-link class="nav-link" to="/">Home</nuxt-link>
                <nuxt-link class="nav-link" to="/Commands">Commands</nuxt-link>
                <template v-if="authenticated === 'authenticated'">
                    <nuxt-link class="nav-link text-white!" to="/User">Dashboard</nuxt-link>
                    <nuxt-link class="nav-link pe-0!" to="/Logout">Logout</nuxt-link>
                </template>
                <button v-else class="nav-link cursor-pointer!" @click="signIn(`discord`)">Log in</button>
            </div>
        </div>
    </nav>
</template>

<script setup>
const { $constants } = useNuxtApp();
const {status, signOut, signIn} = useAuth();
let authenticated = status.value;
import {ref} from 'vue';

const menuOpen = ref(false);

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

function openSideMenu() {
    let sidebar = document.getElementById("sidebar");
    let main = document.getElementById("main");
    if (sidebar.classList.contains("sidebar-open")) {
        sidebar.classList.add("sidebar-closed");
        sidebar.classList.remove("sidebar-open");
        main.classList.add("sidebar-closed");
        main.classList.remove("sidebar-open");
    } else {
        sidebar.classList.add("sidebar-open");
        sidebar.classList.remove("sidebar-closed");
        main.classList.add("sidebar-open");
        main.classList.remove("sidebar-closed");
    }
}
</script>