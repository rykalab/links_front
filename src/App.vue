<template>
  <v-app>
    <router-view>

    </router-view>
    <v-footer app>
      <span>&copy; Bartlomiej Rykala 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.footer span {
  padding-left:10px;
}
</style>

