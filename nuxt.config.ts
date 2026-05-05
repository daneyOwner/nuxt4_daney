// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@sidebase/nuxt-auth', 'dayjs-nuxt', '@vesp/nuxt-fontawesome'],
    
    fontawesome: {
        suffix: true,
        icons: {
            solid: ['x-mark', 'eraser', 'rotate-right', 'search', 'angles-left', 
                'angles-right', 'angle-up', 'angle-left', 'angle-right', 'spinner', 'pen', 
                'circle-question'],
        }
    },
    
    css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],

    compatibilityDate: '2025-07-15',
    
    auth: {
        isEnabled: true,
        disableServerSideAuth: false,
        baseURL: 'http://localhost:3000/api/auth',
        sessionRefresh: {
            enablePeriodically: true,
            enableOnWindowFocus: true,
        }
    },
    

    runtimeConfig: {
        daneySecret: '',
        daneyClientId: '',
        daneyClientSecret: '',
    },

    devtools: {enabled: true},

    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ]
        }
    }
})