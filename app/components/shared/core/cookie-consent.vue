<style lang="scss" scoped>
#cookieConsent {
    position: fixed;
    bottom: 56px;
    left: 0;
    right: 0;
    background: #202225;
    z-index: 2000;

    &.cookieDash {
        bottom: 0;
    }
}

hr {
    border-color: #7a7a7a;
}
</style>

<template>
    <div v-show="!cookieAccept" id="cookieConsent" :class="{'cookieDash': dash}"
         class="p-0 mb-0 text-center" role="alert">
        <hr class="mb-2 m-0"/>
        <div>
            By using our website, you agree to our cookie- and privacy policy.
            <a href="/about/cookies">Read more about cookies</a>.
            <button type="button" class="cookieBTN ms-1 btn btn-sm btn-orange" @click="accept" data-dismiss="alert"
                    aria-label="Close">
                <span aria-hidden="true">Accept</span>
            </button>
        </div>
        <hr class="mt-2 m-0"/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    dash: {
        type: Boolean,
        default: true,
    },
});

let cookieAccept = ref(true);

const [cookieAccepted, setCookieAccept] = useLocalStorage('cookieAccept');

function accept() {
    setCookieAccept(true);
    cookieAccept.value = true;
}

onMounted(() => {
    cookieAccept.value = cookieAccepted.value || false;
});
</script>