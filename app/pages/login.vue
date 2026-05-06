<template>
    <div>
        <h1>Please Wait...</h1>
    </div>
</template>

<script setup>
definePageMeta({auth: "guest"})
const { status, signIn } = useAuth();
let authenticated = status.value;
let route = useRoute();
onMounted(async () => {
    const [guildsStorage, setGuildsStorage, removeGuildsStorage] = useLocalStorage('guildsStorage');
    const [userPermissionsStorage, setUserPermissionsStorage, removeUserPermissionsStorage] = useLocalStorage('userPermissions');
    const [tokenStorage, setTokenStorage, removeTokenStorage] = useLocalStorage('tokenStorage');

    removeGuildsStorage();
    removeUserPermissionsStorage();
    removeTokenStorage();

    let redirect = route.query.redirect || '/User';
    await signIn(`discord`, { callbackUrl: redirect });
});
</script>