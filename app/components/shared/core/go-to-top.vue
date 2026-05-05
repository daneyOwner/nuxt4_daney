<template>
    <button v-if="shown" id="goToTopButton" @click="goToTheTop" class="btn btn-sm btn-orange">
        <font-awesome-icon icon="fa-solid fa-angle-up"/>
    </button>
</template>

<script setup>
import {ref} from 'vue';

const shown = ref(false);

const goToTheTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    shown.value = false;
};

onMounted(() => {
    const scrollHandler = () => {
        const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        shown.value = scrollTop >= 400;
    };

    document.addEventListener('scroll', scrollHandler);

    // Cleanup event listener when component is unmounted
    return () => {
        document.removeEventListener('scroll', scrollHandler);
    };
});
</script>

<style scoped>
#goToTopButton {
    position: fixed;
    right: 60px;
    bottom: 81px;
    z-index: 2001;
    width: 30px;
}
</style>