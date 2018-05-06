<template>
  <v-container fluid>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Twój skórcony link to
        </v-card-title>
        <v-card-text>
          {{links.url_short}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog=false">Zamknij</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    <h1>Skróć swój link</h1>
    <v-form @submit.prevent="save()">
        <v-text-field
          label="Url"
          v-model="links.url_org"
          required
        ></v-text-field>
        <v-text-field
          label="Short"
          v-model="links.url_short"
          required
        ></v-text-field>
        <v-btn
          color="succes"
          type="submit"
        >
        Zapisz
        </v-btn>
    </v-form>
  </v-container>
</template>
<script>
export default {
  name: 'Front',
  created (){
    axios('links')
    .then(result =>{
      console.log(result.data)
    })
  },
    data () {
    return {
      links: {
        url_org:'',
        url_short:'',
        active: 1,
      },
      dialog: false,
      dialog_error: false
    }
  },
  methods:{
    save(){
      console.log(this.links.url_org),
      console.log(this.links.url_short)
      axios.post('links', this.links)
      .then(result =>{
        console.log(result.data)
        this.dialog = true
      },
      // error =>{
      //   console.log(error)
      //   this.dialog_error = true
      // }
      )
      .catch(error => {
         console.log(error.response.status)
         this.dialog_error = true
      })
    }
  }
}
</script>

