<template>
    <v-container>
        <v-data-table
                :headers="headers"
                :items="added"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
              <!-- {{props.item}} -->
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.quantity }}</td>
                <td>{{ props.item.price }} zł</td>
                <td>{{ props.item.price * props.item.quantity }} zł</td>
                <td>
                    <v-btn @click="removeQuantity(props.item)" fab dark small color="red">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-btn @click="addQuantity(props.item)" fab dark small color="green">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
                    <v-btn to="/basket-proceed" color="primary">
                        Realizuj
                    </v-btn>
    </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "Basket",
    data () {
      return {
        headers: [
          { text: 'Id', value: 'id' },
          { text: 'Name', value: 'name' },
          { text: 'Ilosc', value: 'quantity' },
          { text: 'Cena', value: 'price' },
          { text: 'Cena * Ilość', value: 'price' },
          { text: 'Zmniejsz', value: '' },
          { text: 'Zwieksz', value: '' }
        ]
      }
    },
    computed: {
    ...mapGetters({
      added: 'added'
    })
    },
    methods: {
      addQuantity(item) {
        this.$store.dispatch('addQuantity', item);
      },
      removeQuantity(item) {
        this.$store.dispatch('removeQuantity', item)
      }
    }
  }
</script>

<style scoped>

</style>
