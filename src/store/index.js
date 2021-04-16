import Vue from 'vue'
import Vuex from 'vuex'
import moka from './modules/components'
import editor from './modules/editor'
import desktop from './modules/desktop'
import user from './modules/user'
import datastore from './modules/datastore'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    moka,
    editor,
    desktop,
    user,
    datastore
  }
})
