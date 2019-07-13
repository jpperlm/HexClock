import Vue from 'vue'
import Vuex from 'vuex'

import languageStore from './options'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      languageStore,
    }
  })
  return Store
}
