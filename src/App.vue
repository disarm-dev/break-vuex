<template>
  <div id="app">
    <input type="number" v-model="push_count" placeholder="Add new records">
    <button @click="add_page">Add page</button>
    <button @click="add_store">Add store</button>
    <div>
      <label>Freeze</label>
      <input type="checkbox" v-model="freeze">
    </div>

    <div class="flex-container">
      <div class="flex-item">
        <h2>Vue Data</h2>
        <h3>{{page_records.length}} page rows</h3>
        <button @click="clear_page">Clear</button>

        <ul>
          <li v-for="{id} in reversed_page_records">{{id}}</li>
        </ul>

      </div>
      <div class="flex-item">
        <h2>Vuex Store</h2>
        <h3>{{store_records.length}} store rows</h3>
        <button @click="clear_store">Clear</button>

        <ul>
          <li v-for="{id} in reversed_store_records">{{id}}</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import times from 'lodash/times'

  import {fake_record} from './faker'

  export default {
    name: 'app',
    data() {
      return {
        page_records_count: 0,
        page_records: [],

        push_count: 2000,
        freeze: true
      }
    },
    computed: {
      ...mapState({
        store_records: state => state.records
      }),
      reversed_page_records() {
        return this.page_records.slice(-20)
      },
      reversed_store_records() {
        return this.store_records.slice(-20)
      }
    },
    methods: {
      add_page() {
        times(this.push_count, () => {
          this.page_count = (this.page_records.length + 1)
          let response = fake_record(this.page_count)
          if (this.freeze) response = Object.freeze(response)
          this.page_records.push(response)
        })
      },
      clear_page() {
        this.page_records = []
      },
      add_store() {
        this.$store.commit('push_times', this.push_count, this.freeze)
      },
      clear_store() {
        this.$store.commit('clear')
      }
    }
  }
</script>

<style scoped>
  .flex-container {
    display: flex;
    flex-direction: row;
  }

  .flex-item {
    flex: auto;
  }
</style>
