<template>
  <v-container grid-list-md text-xs-center>
    <h1>Koszyk</h1>
    <!-- <div v-for="(product, key) in added" :key="key">
      {{product.name}}
    </div> -->
    <v-layout row wrap>
        <v-flex lg3 md6 xs12 v-for="(product, key) in products" :key="key">
            <v-card>
                <v-card-media src="/static/img/desert.jpg" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Kup taką osobe:</h3><h2>{{product.name}}</h2>
                        <h3 class="headline mb-0">Cena osoby: {{product.price}} zł</h3> <h2>Super promo z <div class="clr"> <del>{{product.price*Math.floor(Math.random()*100)}} zł</del></div></h2>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn color="blue" @click="addToBasket(product)" flat>Dodaj osobe do koszyka</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
  export default {
    name: 'List',
    data (){
      return {
        products: [
        ]
      }
    },
    computed: {
    ...mapGetters({
      refresh: 'refresh'
    })
    },
    watch: {
      refresh (){
        this.$store.dispatch("getBasket")
      }
    },
    methods:{
      addToBasket(product){
        this.$store.dispatch("addToBasket",product)
      },
      getProducts(){
        axios('products')
        .then(result => {
          //console.log(result.data)
          this.products = result.data
        })
      }
    },
    created(){
      this.getProducts()
    }
}
</script>
<style>
.clr {
  color: red;
}
</style>

