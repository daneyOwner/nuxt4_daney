export default defineNuxtRouteMiddleware(async (to) => {
    const { status, signIn, data, signOut } = useAuth()
    
    if (to.meta.auth === "guest" || to.meta.auth === false) {
        return;
    }
    
    if (data.value?.expires) {
        const date = new Date(data.value?.expires)
        if (new Date() >= date) {
            await signOut()
            return
        }
    }

    if (status.value === 'authenticated') {
        return
    }

    const matchedRoute = to.matched.length > 0
    if (!matchedRoute) {
        return
    }

    await signIn('discord')
})