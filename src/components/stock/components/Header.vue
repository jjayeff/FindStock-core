<template>
  <v-layout row wrap v-if="stock == undefined ? false : true">
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
          <h1 class="text-xs-right" :class="lastPriceColor"><v-icon large :class="lastPriceColor" pr-3>{{lastPriceIcon}}</v-icon>{{ stock.Finance.FinanceStatDaily.Lastprice }}</h1>
          <h4 class="text-xs-right" :class="lastPriceColor">+0.75 (+0.95%)</h4>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['SingleStock']),
      stock: function() {
        var odj = this.SingleStock[0]
        return odj
      },
      lastPriceColor: function() {
        var color = 'success--text'
        if(this.stock.HistoryFinanceStat != null) {
          var today_price = this.stock.HistoryFinanceStat[this.stock.HistoryFinanceStat.length - 1].Lastprice;
          var yesterday_price = this.stock.HistoryFinanceStat[this.stock.HistoryFinanceStat.length - 2].Lastprice;
          if(today_price < yesterday_price)
            color = 'error--text'
        }
        return color
      },
      lastPriceIcon: function() {
        var icon = 'arrow_drop_up'
        if(this.stock.HistoryFinanceStat != null) {
          var today_price = this.stock.HistoryFinanceStat[this.stock.HistoryFinanceStat.length - 1].Lastprice;
          var yesterday_price = this.stock.HistoryFinanceStat[this.stock.HistoryFinanceStat.length - 2].Lastprice;
          if(today_price < yesterday_price)
            icon = 'arrow_drop_down'
        }
        return icon
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
