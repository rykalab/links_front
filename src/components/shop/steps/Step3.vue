
<template>

  <v-container>
    <div>Dane: {{$store.state.userData.name}}</div>
    <div>Dane: {{$store.state.userData.address}}</div>
    <div>Typ płatności: {{$store.state.paymentMethods[$store.state.userData.payment]}}</div>
    <!-- <v-btn color="primary" dark>Zapłać</v-btn> -->
  </v-container>

</template>

<script>
  export default {
    name: 'Step3',

}
</script>
<style>

</style>

