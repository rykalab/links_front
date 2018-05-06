<template>
  <div><h1>Lista linków</h1>
  <!-- <div v-if="test === 1">TEST</div>
  <div v-else-if="test === 2">TEST 2</div>
  <div v-else>nie test</div> -->
<hr/>
    <v-dialog v-model="dialog_error" max-width="500px">
      <v-card>
        <v-card-title>
          Ten link jest juz zajety, wpisz inny !!!
        </v-card-title>
        <v-card-text>
          {{links.url_short}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog_error=false">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<v-dialog v-model="dialog" max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">Dodaj link</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitleDialog }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex>
              <v-text-field label="Url orginal" v-model="link.url_org"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field label="Url short" v-model="link.url_short"></v-text-field>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="add">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_edit" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitleDialogEdit }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex>
              <v-text-field label="Url orginal" v-model="link.url_org"></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field label="Url short" v-model="link.url_short"></v-text-field>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="edit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <v-data-table
    :headers="headers"
    :items="links"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.url_org }}</td>
      <td>{{ props.item.url_short }}</td>
      <!-- <td>Edit</td>
      <td>Delete</td> -->
      <td><v-btn
      :color="activityColorls[activityState[props.item.id]]"
      @click="change(!activityState[props.item.id], props.item.id)
      ">
        {{ activeToText(activityState[props.item.id]) }}
        </v-btn>
        </td>

          <td>
          <v-btn icon class="mx-0" @click="editItem(props.item.id)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          </td>
             <td>
          <v-btn icon class="mx-0" @click="deleteItem(props.item.id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
          </td>

    </template>
  </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'List',
    data (){
      return {
        formTitleDialog: 'Dodawanie url',
        formTitleDialogEdit: 'Edytowanie url',
        link: {
          url_org: '',
          url_short: '',
          active: 1,
        },
        dialog: false,
        dialog_edit: false,
        dialog_error: false,
        test: 2,
        links: [],
        //dodanie kolorków buttonów
        activityColorls: {
          0: 'error',
          1: 'success'
        },
        activityState: {},
        headers: [
          { text: 'Id', value: 'id' },
          { text: 'Url Orginal', value: 'url_org' },
          { text: 'Url Short', value: 'url_short' },
          { text: 'Active', value: 'active' },
          { text: 'Edit', value: 'edit' },
          { text: 'Delete', value: 'delete' },
        ]
      }
    },
    methods:{
      clear(){
        this.link = {
          url_org: '',
          url_short: '',
          active: 1,
        }
      },
      getLinks () {
        axios('links')
          .then(result => {
            this.links = result.data
            //console.log(this.links)
          })
      },
      activeToText (active) {
        return active == 1 ? 'aktywny' : 'nieaktywny'
      },
      change (active, id) {
        axios.patch(`change-active/${id}`, {
          active:active
        })
          .then( result => {
            //console.log(result.data)
            this.activityState[id] = active ? 1 : 0
            this.$forceUpdate()
          })
        },
      editItem (id) {
      //console.log(id)
          axios(`links/${id}/edit`)
            .then(result =>
            this.link = result.data,
            this.getLinks(),
            this.dialog_edit = true
            )
      },
      deleteItem (id) {
        //console.log(id)
       // confirm('Czy na pewno chesz usunąć wpis?') && this.links.splice(index, 1)
        //console.log(confirm());
        if (confirm('Czy na pewno chesz usunąć wpis?') == true){
          //console.log('usuwam')
          axios.delete(`links/${id}`)
            .then(result =>
            //console.log(result)
              this.getLinks()
            );
        }
      },
      close () {
        this.dialog = false
        this.dialog_edit = false
        this.clear()
        this.close()
      },
      add () {
          axios.post('links', this.link)
            .then(result => {
              //console.log(result.data)
              this.getLinks()
            })
            .catch(error => {
             // console.log(error.response.status)
              this.dialog_error = true
            })
        this.close()
      },
      edit () {
          axios.put(`links/${this.link.id}`, this.link)
            .then(result => this.getLinks())
            .catch(error => {
             // console.log(error.response.status)
              this.dialog_error = true
            })
        this.close()
      }
    },
      created (){
        axios('links')
          .then( result => {
            this.links = result.data
            //dodanie aktywnych stanów do linkow
            this.links.forEach(link => {
              this.activityState[link.id] = link.active
            })
          })
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
