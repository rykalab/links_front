
<template>
  <v-container>
      <v-text-field label="Imie i nazwisko" v-model="$store.state.userData.name" required></v-text-field>
      <v-text-field label="Adres" v-model="$store.state.userData.address" required></v-text-field>
  </v-container>

</template>

<script>
  export default {
    name: 'Step1',

}
</script>
<style>

</style>

