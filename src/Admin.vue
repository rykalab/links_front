<template>
  <v-app>
    <div v-if="$store.state.loading" class="loader">
      <img :src="loadingGif" alt="">
    </div>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
        <div class="text-xs-center">
          <v-badge left>
            <span slot="badge">{{added.length}}</span>
            <v-icon large color="grey lighten-1">shopping_cart</v-icon>
          </v-badge>
        </div>
       <div class="text-xs-center">
         <v-menu offset-y>
           <v-btn to="/basket" color="primary" dark slot="activator">Koszyk </v-btn>
           <!-- <v-list>
             <v-list-tile v-for="(item,key) in this.$store.state.added" :key="key">
                <v-list-tile-title>{{ item.id }}</v-list-tile-title>
                <v-btn @click="remove(item)" icon ripple>
                  <v-icon color="red">delete</v-icon>
                </v-btn>
             </v-list-tile>
           </v-list> -->
         </v-menu>
       </div>
    </v-toolbar>
    <v-content>

      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >

    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; Bartlomiej Rykala 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import loadingGif from './assets/loader.gif'
export default {
  data () {
    return {
      loadingGif: loadingGif,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'SUPER MENU'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Short links maker'
    }
  },
  computed: {
    ...mapGetters({
      added: 'added'
    })
  },
  name: 'Admin',
  methods: {
    remove(item){
      let index = this.$store.state.added.indexOf(item)
      this.$store.state.added.splice(index,1)
    }
  },
  created(){
        this.$store.dispatch('getBasket')
  }
}
</script>

<style soped>
 .loader{
   width: 100vw;
   height: 100vh;
   background: rgba(0,0,0,.5);
   position: absolute;
   z-index: 100;
 }
 .loader img{
   position: absolute;
   margin: auto;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
 }
</style>
