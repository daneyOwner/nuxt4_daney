import DiscordProvider from 'next-auth/providers/discord';
import { NuxtAuthHandler } from "#auth";

// The #auth virtual import comes from this module. You can use it on the client
// and server side, however not every export is universal. For example do not
// use sign-in and sign-out on the server side.

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
    // secret needed to run nuxt-auth in production mode (used to encrypt data)
    secret: runtimeConfig.daneySecret,
    providers: [
        // @ts-ignore
        DiscordProvider.default({
            clientId: runtimeConfig.daneyClientId,
            clientSecret: runtimeConfig.daneyClientSecret,
            authorization: "https://discord.com/api/oauth2/authorize?protocol=oauth2&response_type=code&scope=identify+email+guilds"
        })
    ],
    callbacks: {
        jwt({ token, account }) {
            if (account) {
                token.access_token = account?.access_token ?? "";
            }
            return token;
        },
    },
})