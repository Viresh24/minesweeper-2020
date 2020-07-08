import Vue from 'vue'
import Vuex from 'vuex'
import gameGrid from './modules/gameGrid'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  strict: debug,
  modules: {
    gameGrid
  }
})
