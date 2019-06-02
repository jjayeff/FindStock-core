<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h4 class="text-xs-right grey--text text--darken-2">อัพเดทล่าสุด: {{ stock.LastUpdate }}</h4>
    </v-flex>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex class="borderLeft" xs6>
          <h1>{{ stock.Symbol }}</h1>
          <p class="grey--text text--darken-1">{{ stock.Name }}</p>
        </v-flex>
        <v-flex class="borderRight" xs6>
          <h1 class="text-xs-right green--text"><v-icon large class="success--text" pr-3>arrow_drop_up</v-icon>{{ stock.Finance.FinanceStatDaily.Lastprice }}</h1>
          <h4 class="text-xs-right green--text">+0.75 (+0.95%)</h4>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['allStocks']),
      stock: function() {
        var odj = this.allStocks[0]
        return odj
      }
    }
  }
</script>

<style scoped>
  .borderLeft {
      border-bottom: 2px solid #BDBDBD;
      border-top: 2px solid #BDBDBD;
      border-left: 2px solid #BDBDBD;
  }
  .borderRight {
      border-bottom: 2px solid #BDBDBD;
      border-top: 2px solid #BDBDBD;
      border-right: 2px solid #BDBDBD;
  }
</style>
