<template>
    <v-container>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Adres dostawy</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Płatność</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Podsumowanie</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card color="grey lighten-1" class="mb-5" height="200px">
                      <Step1></Step1>
                    </v-card>
                    <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
                    <v-btn flat to="/basket">Back to basket</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-card color="grey lighten-1" class="mb-5" height="200px">
                      <Step2></Step2>
                    </v-card>
                    <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
                    <v-btn flat @click.native="e1 = 1">Back</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-card color="grey lighten-1" class="mb-5" height="200px">
                      <Step3></Step3>
                    </v-card>
                    <v-btn color="primary" @click.native="order()">Pay</v-btn>
                    <v-btn flat @click.native="e1 = 2">Back</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
import Step1 from '@/components/shop/steps/Step1'
import Step2 from '@/components/shop/steps/Step2'
import Step3 from '@/components/shop/steps/Step3'
  export default {
    components: {
      Step1,
      Step2,
      Step3,
    },
    name: "Proceed",
    data () {
      return  {
        e1: 1
      }
    },
    methods:{
      order() {
        axios.put('final-order', {
          userData: this.$store.state.userData
        })
        .then(()=>{
          this.added = []
          this.$router.push({path: '/basket'})
        })
      }
    }
  }
</script>

<style scoped>

</style>
