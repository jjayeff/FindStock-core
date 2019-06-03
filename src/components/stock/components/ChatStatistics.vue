<template>
  <div id="chart">
    <apexchart type=area height=350 :options="chartOptions" :series="series" v-if="reChat"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VueApexCharts from 'vue-apexcharts'

  export default {
    props: ['active'],
    components: {
      apexchart: VueApexCharts
    },
    data() {
      return {
        reChat: true,
        series: [
          {
            name: "ROA(%)",
            data: [5.96, 9.43, 8.71, 10.39]
          },
          {
            name: "ROE(%)",
            data: [8.62, 19.18, 20.26, 20.21]
          },
          {
            name: "P/E (เท่า)",
            data: [19.53, 11.82, 8.93, 10.6]
          },
          {
            name: "P/BV (เท่า)",
            data: [1.26, 1.87, 2.57, 2.11]
          },
        ],
        chartOptions: {
          title: {
            text: 'ค่าสถิติประจำปี',
            align: 'left'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            categories: ['ปี58', 'ปี59', 'ปี60', 'ปี61'],
          }
        }
      }
    },
    methods: {
      changeData() {
        if(this.allStocks.length > 0) {
          var finance = this.allStocks[0].Finance.FinanceStatYearly;
          var finance1 = this.allStocks[0].Finance.FinanceInfoYearly;
          this.series = this.series.map((value, i) => {
            switch(i) {
              case 0:
                value.data = finance1.map((value) => value.ROE)
                break;
              case 1:
                value.data = finance1.map((value) => value.ROA)
                break;
              case 2:
                value.data = finance.map((value) => value.PE)
                break;
              default:
               value.data = finance.map((value) => value.PBV)
            }
            return value
          })
        }
      }
    },
    computed: {
      ...mapGetters(['allStocks'])
    },
    watch: {
      active: function(val) { 
        if(val == 1) {
          this.changeData()
          this.reChat = false
          this.$nextTick().then(() => {
            // re-render
            this.reChat = true
          });
        }
      },
      allStocks: function() {
        this.changeData()
      }
    }
}
</script>

<style>

</style>
