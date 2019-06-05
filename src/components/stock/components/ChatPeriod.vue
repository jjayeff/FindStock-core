<template>
   <div id="chart">
    <apexchart type=bar height=300 :options="chartOptions" :series="series" v-if="reChat"/>
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
            name: "สินทรัพย์รวม",
            data: [221640.61, 258380.48, 282358.37, 379194.83]
          },
          {
            name: "หนี้สินรวม",
            data: [138687.65, 166565.55, 163371.68, 227339.48]
          },
          {
            name: "ส่วนของผู้ถือหุ้น",
            data: [79825.24, 89055.38, 117061.65, 144837.79]
          },
          {
            name: "กำไรสุทธิ",
            data: [6609.26, 16197.1, 20882.86, 26465.4]
          },
        ],
        chartOptions: {
          title: {
              text: 'บัญชีทางการเงินประจำปี',
              align: 'left'
          },
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: 'rounded'	
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },

          xaxis: {
            categories: ['ปี58', 'ปี59', 'ปี60', 'ปี61'],
          },
          yaxis: {
            title: {
              text: 'หน่วยล้านบาท'
            }
          },
          fill: {
            opacity: 1

          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands"
              }
            }
          }
        }
      }
    },
    methods: {
      changeData() {
        if(this.SingleStock.length > 0) {
          var finance = this.SingleStock[0].Finance.FinanceInfoYearly;
          this.series = this.series.map((value, i) => {3
            switch(i) {
              case 0:
                value.data = finance.map((value) => value.Assets)
                break;
              case 1:
                value.data = finance.map((value) => value.Liabilities)
                break;
              case 2:
                value.data = finance.map((value) => value.Equity)
                break;
              default:
               value.data = finance.map((value) => value.NetProfit)
            }
            return value
          })
        }
      }
    },
    computed: {
      ...mapGetters(['SingleStock'])
    },
    watch: {
      active: function(val) { 
        if(val == 0) {
          this.changeData()
          this.reChat = false
          this.$nextTick().then(() => {
            // re-render
            this.reChat = true
          });
        }
      },
      SingleStock: function() {
        this.changeData()
      }
    }
}
</script>

<style>

</style>
