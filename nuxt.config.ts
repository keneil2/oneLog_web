// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   modules: ['@nuxt/ui'],
   ssr:false,
   // Always use the dark theme (previously only the auth pages forced it)
   colorMode: {
     preference: 'dark',
     fallback: 'dark'
   }
})
