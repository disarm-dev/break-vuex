import times from 'lodash/times'

import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {fake_record} from './faker'

const store = new Vuex.Store({
  state: {
    count: 0,
    records: []
  },
  mutations: {
    clear(state) {
      state.records = []
    },
    push_times(state, count, freeze) {
      times(count, () => {
        state.count = (state.records.length + 1)
        let response = fake_record(state.count)
        if (freeze) response = Object.freeze(response)
        state.records.push(response)
      })
    }
  }
})


new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
