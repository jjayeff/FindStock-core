<template>
  <v-toolbar>
    <v-toolbar-title class="font-weight-black font-italic">Find<span class="grey--text text--darken-1">Stock</span></v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      <v-autocomplete
        v-model="searchSelected"
        :items="searchItem"
        cache-items
        class="mx-2"
        flat
        hide-no-data
        hide-details
        label="Stock"
        solo
        :menu-props="{ auto: true }"
      ></v-autocomplete>
    </div>
    <v-toolbar-items>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: function () {
      return {
        searchSelected: '',
        items: [
          { 
            name: 'หน้าแรก',
            to: '/'
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['allStocks']),
      searchItem: function() {
        var obj = this.allStocks;
        return Object.keys(obj).map(i => obj[i].Symbol);
      }
    }
  }
</script>

<style scoped>
  .marginTest {
    padding-left: 50px
  }
</style>
