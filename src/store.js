import Vue from 'vue'
import Vuex from 'vuex'
import basket from './store/basket'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    test:1,
    // added: [],
    userData: {
      name: '',
      address: '',
      payment: 0,
    },
    paymentMethods: [
      'Dotpay',
      'Paypal',
      'Bitcoin',
    ],
    loading: false
  },
  modules: {
    basket
  }
})
