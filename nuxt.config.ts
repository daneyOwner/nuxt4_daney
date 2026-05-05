// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth'],

  css: ['~/assets/css/main.css'],
  
  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: true }
})