
<template>

  <v-container>
    <v-radio-group v-model="$store.state.userData.payment">
      <v-radio
      v-for="(value, key) in $store.state.paymentMethods"
      :key="key"
      :label="value"
      :value="key"
      >

      </v-radio>
    </v-radio-group>
  </v-container>

</template>

<script>
  export default {
    name: 'Step2',
    data (){
      return {

      }
    }

}
</script>
<style>

</style>

