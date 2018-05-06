const state = {
  added: [],
  refresh: 0
}

const getters = {
  added: state => {
    return state.added
  },
  refresh: state => {
    return state.refresh
  }
}

const actions = {
  getBasket ({commit}){
    axios('orders')
      .then(result => {
        commit('ADDED', result.data);
      })
  },
  addQuantity ({commit}, item) {
    axios.put(`orders/quantity/${item.id}/1`)
      .then(() => {
        commit('ADD_QUANTITY', item)
      })
  },
  removeQuantity ({commit}, item) {
    axios.put(`orders/quantity/${item.id}/0`)
      .then(() => {
        commit('REMOVE_QUANTITY', item)
      })
  },
  addToBasket ({commit}, product){
    axios.post(`orders`, { product_id: product.id })
    .then(() =>{
      commit('ADD_TO_BASKET')
    })
  },

}

const mutations = {
  ADDED (state, added) {
    state.added = added
  },
  ADD_QUANTITY (state, item) {
    item.quantity++
  },
  REMOVE_QUANTITY (state, item) {
    if(item.quantity === 1) {
      state.added = state
          .added
          .filter(element => element.id !== item.id)
    } else {
      item.quantity--
    }
  },
  ADD_TO_BASKET (state){
    state.refresh++
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
