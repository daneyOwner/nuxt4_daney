<template>
    <div>
        <h1>Logging out... Please Wait...</h1>
    </div>
</template>

<script setup>
definePageMeta({auth: "guest"})
const { status, signOut } = useAuth();
let authenticated = status.value;
onMounted(async () => {
    if (authenticated === "authenticated") {
        const [guildsStorage, setGuildsStorage, removeGuildsStorage] = useLocalStorage('guildsStorage');
        const [userPermissionsStorage, setUserPermissionsStorage, removeUserPermissionsStorage] = useLocalStorage('userPermissions');
        const [tokenStorage, setTokenStorage, removeTokenStorage] = useLocalStorage('tokenStorage');
        
        removeGuildsStorage();
        removeUserPermissionsStorage();
        removeTokenStorage();
        
        await signOut({
            callbackUrl: '/'
        });
        
        return;
    }

    location.href = (process.env.NODE_ENV === 'production' ? 'https://daney.app' : 'http://localhost:3000');
});
</script>