import DiscordProvider from 'next-auth/providers/discord';
import { NuxtAuthHandler } from "#auth";

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
        jwt: async ({ token, profile, account }) => {
            if (account) {
                token.access_token = account.access_token
            }

            return Promise.resolve(token)
        },
        session: async ({session, user, token}) => {
            (session as any).access_token = token.access_token;
            (session as any).user.id = token.id;
            (session as any).user.discriminator = token.discriminator;
            return Promise.resolve(session)
        }
    },
})