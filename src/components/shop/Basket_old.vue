<template>
    <v-data-table
    :headers="headers"
    :items="$store.state.added"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td class="text-xs-left">{{ props.item.product_id }}</td>
      <td class="text-xs-left">{{ props.item.quantity }}</td>
      <td class="text-xs-left">
        <v-btn @click="remove(props.item.id)" fab dark small color="red">
          <v-icon dark>remove</v-icon>
        </v-btn>
      </td>
      <td class="text-xs-left">
        <v-btn @click="add(props.item.id)" fab dark small color="green">
            <v-icon dark>add</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
      data () {
      return {
        headers: [
          { text: 'Id', sortable: false },
          { text: 'Nazwa', sortable: false },
          { text: 'Ilość', sortable: false },
          { text: 'Usun', sortable: false },
          { text: 'Dodaj', sortable: false }
        ],
        }
      },
  methods:{
    add(id){
      //console.log('add')
      axios.put(`orders/quantity/${id}/1`)
      .then( result =>{

      })
    },
    remove(id){
      //console.log('rem')
      axios.put(`orders/quantity/${id}/0`)
      .then( result =>{

      })
    }
  }
}
</script>
