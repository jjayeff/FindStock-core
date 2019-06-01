<template>
  <v-layout row wrap>
    <v-flex md6 xs12>
      <div id="chart">
        <apexchart type=bar height=350 :options="chartOptions" :series="series"  v-if="test"/>
      </div>
    </v-flex>
    <v-flex md6 xs12>
      <v-layout row wrap>
        <v-flex class="borderBottle" xs6>
          <h1>{{ stock.Symbol }}</h1>
          <p class="grey--text text--darken-1">{{ stock.Name }}</p>
        </v-flex>
        <v-flex class="borderBottle" xs6>
          <h1 class="text-xs-right green--text"><v-icon large class="success--text" pr-3>arrow_drop_up</v-icon>{{ stock.Finance.FinanceStatDaily.Lastprice }}</h1>
          <h4 class="text-xs-right grey--text"><v-icon small class="grey--text">access_time</v-icon>{{ stock.Finance.FinanceStatDaily.Date }}</h4>
        </v-flex>
        <v-flex xs12>
          <v-chip outline color="primary">{{ stock.Market }}</v-chip>
          <v-chip outline color="error">{{ stock.Industry }}</v-chip>
          <v-chip outline color="success">{{ stock.Sector }}</v-chip>
          <v-chip outline color="warning" v-if="stock.SET50">SET50</v-chip>
          <v-chip outline color="info" v-if="stock.SET100">SET100</v-chip>
        </v-flex>
        <v-flex xs12>
          <table>
            <tr><td class="grey--text text--darken-4">วันที่เริ่มต้นซื้อขาย</td><td class="grey--text text--darken-2">{{ stock.First_trade_date }}</td></tr>
            <tr><td>เว็บไซต์</td><td class="grey--text text--darken-2"><a :href="'//' + stock.Website" target="_blank">{{ stock.Website }}</a></td></tr>
            <tr><td>มูลค่าหลักทรัพย์ตามราคาตลาด (ล้านบาท)</td><td class="grey--text text--darken-2">{{ stock.Market_cap }}</td></tr>
            <tr><td>P/E (เท่า)</td><td class="grey--text text--darken-2">{{ stock.Finance.FinanceStatDaily.PE }}</td></tr>
            <tr><td>P/BV (เท่า)</td><td class="grey--text text--darken-2">{{ stock.Finance.FinanceStatDaily.PBV }}</td></tr>
          </table>
          <p class="text-xs-right"><a href="">ดูรายละเอียดเพิ่มเติม</a></p>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  import json from './Simple.json';
  
  export default {
    components: {
        apexchart: VueApexCharts,
    },
    props: ['data', 'active'],
    data() {
      return {  
        test: true,
        stock: json,
        series: [{
          name: 'เปอร์เซนต์',
          data: [21, 100, 51.39, 74.91]
        }],
        chartOptions: {
          chart: {
            height: 350,
            type: 'bar',
          },
          colors: ['#F44336', '#FF9800', '#775DD0', '#4CAF50'],
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top', // top, center, bottom
              },
              columnWidth: '45%',
              distributed: true
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          xaxis: {
            categories: ['แนะนำให้ซื้อ', 'หุ้นเติบโต', 'หุ้นปันผล', 'คะแนนหุ้น'],
            labels: {
              style: {
                colors: ['#F44336', '#FF9800', '#775DD0', '#4CAF50'],
                fontSize: '14px'
              }
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: 'gradient',
                gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                }
              }
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val + "%";
              }
            }
          },
        }
      }
    },
    watch: {
      data: function(val) { 
        this.stock = val
        this.series[0].data = [val.IAA_rate, val.Growth_stock_rate, val.Stock_dividend_rate, val.Score]
      },
      active: function(val) { 
        if(val == 0) {
          this.test = false
          this.$nextTick().then(() => {
            // re-render
            this.test = true
          });
        }
      },
    }
  }
</script>

<style scoped>
  .borderBottle {
      border-bottom: 2px solid #757575;
  }
  table {
      width: 100%;
  }
  th, td {
      border-bottom: 1px solid #ddd;
  }
</style>
