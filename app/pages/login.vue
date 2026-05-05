<template>
    <div>
        <h1>Please Wait...</h1>
    </div>
</template>

<script setup>
const { status, signIn } = useAuth();
let authenticated = status.value;
onMounted(async () => {
    if (authenticated === "authenticated") {
        location.href = (process.env.NODE_ENV === 'production' ? 'https://daney.app' : 'http://localhost:3000') + "/User";
    }
    
    await signIn('discord');
});
</script>