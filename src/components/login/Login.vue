<template>
  <div><h1>Logowanie</h1>

  <hr/>
    <v-form @submit.prevent="login()">
      <v-text-field label="E-mail" v-model="email" required></v-text-field>
      <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
      <v-btn type="submit" color="info">Zaloguj</v-btn>
    </v-form>
</div>

</template>

<script>
  export default {
    name: 'Login',
    data (){
      return {
        email: '',
        password: '',
      }
    },
    methods:{
      login(){
        axios.post('login', {
        email: this.email,
        password: this.password
        })
        .then(result => {
          console.log(result.data)
          localStorage.setItem('token',result.data.access_token)
          this.$router.push({
             path: '/links'
           })
        })
      }
    }
  }
</script>
<style scoped>
h1{
  text-align: center;
  padding: 20px;
  text-transform: uppercase;
}
</style>
