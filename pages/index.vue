<template>
  <div class="w-screen h-screen flex items-center justify-center flex-col bg-gray-200 p-20 gap-10">
    <div class="bg-blue-300 rounded-lg px-15 py-10 flex flex-col justify-around w-1/2 h-fit">
      <div class="px-10">
        <h1 class="text-xl font-bold">Notitie:</h1>
        <p>Dit is een test. Alle secrets zijn opgeslagen op de server en worden pas in de API opgehaald. Raadpleeg de documentatie voor het opzetten van een GitHub App.</p>
      </div>
    </div>
    <div class="h-4/6 w-1/2 bg-white rounded-lg px-15 py-10 flex flex-col items-center justify-around">
      <div>
        <logo></logo>
      </div>
      <div class="px-10 w-full">
        <h1 class="text-xl font-bold">Titel</h1>
        <input v-model="title" type="text" class="w-full border-2 border-gray-200 rounded-md h-7"/>
      </div>
      <div class="px-10 w-full">
        <h1 class="text-xl font-bold">Bericht</h1>
        <v-md-editor v-model="text" height="400px"></v-md-editor>
      </div>
      <div class="px-10 w-full">
      <button type="button" v-on:click="submit" class="px-2 py-1 bg-blue-500 text-white font-bold rounded-md w-full text-lg">Stuur</button>
      </div>
    </div>
    </div>
</template>

<script>
import logo from "~/components/logo.vue"
import axios from "axios"
export default {
  name: "index",
  components: {
    logo
  },
  data() {
    return {
      title: "",
      text: "",
    }
  },
  methods: {
    submit() {
      axios.post('/api/create', {
        body: this.text,
        title: this.title
      }).then((res) => {
        console.log(res);
        const url = res.data.url;

        // open the url in a new tab
        window.open(url, '_blank');
      }).catch((err) => {
        console.error(err);
      })
    }
  }
}
</script>

<style scoped>
</style>