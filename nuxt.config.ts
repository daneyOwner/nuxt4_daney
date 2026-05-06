// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@sidebase/nuxt-auth', 'dayjs-nuxt', '@vesp/nuxt-fontawesome', '@nuxt/image'],
    
    fontawesome: {
        suffix: true,
        icons: {
            solid: ['x', 'eraser', 'rotate-right', 'search', 'angles-left', 
                'angles-right', 'angle-up', 'angle-left', 'angle-right', 'spinner', 'pen', 
                'circle-question'],
        }
    },
    
    css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],

    compatibilityDate: '2025-07-15',
    
    auth: {
        baseURL: 'http://localhost:3000/api/auth',
    },

    components: [
        {path: '~/components', extensions: ['vue']},
        {path: '~/components/dashboard', extensions: ['vue']},
        /*{path: '~/components/dashboard/sticky', extensions: ['vue']},*/
        {path: '~/components/main', extensions: ['vue']},
        /*#region User*/
        {path: '~/components/user', extensions: ['vue']},
        /*{path: '~/components/user/embeds', extensions: ['vue']},*/
        /*#endregion*/
        /*{path: '~/components/shared/core/tables', extensions: ['vue']},
        {path: '~/components/shared/core/modals', extensions: ['vue']},
        {path: '~/components/shared/core/copy', extensions: ['vue']},
        {path: '~/components/shared/core/dPanel', extensions: ['vue']},*/


        {path: '~/components/shared/forms', extensions: ['vue']},
        {path: '~/components/shared/da-panel', extensions: ['vue']},
        {path: '~/components/shared/da-table', extensions: ['vue']},
        {path: '~/components/shared/copy', extensions: ['vue']},
        {path: '~/components/shared/core/accordion', extensions: ['vue']},
        {path: '~/components/shared/core', extensions: ['vue']},
        {path: '~/components/shared', extensions: ['vue']},
    ],

    image: {
        // Options
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