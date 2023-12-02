// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [ '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    appId: "",
    privateKeyPath: "config/{bot-name}-{date}-private-key.pem",
    installationId: 0, //Number
    repository: {
        owner: "",
        name: ""
    }
  }
})
