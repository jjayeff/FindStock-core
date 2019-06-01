<template>
  <v-layout row wrap>
    <v-flex md6 xs12>
      <v-layout row wrap>
        <v-flex xs4 v-for="item in items" :key="item.name">
          <div class="text-xs-center">
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="item.value"
              :color="item.color"
              class="circular"
            >
            {{ item.value }}
            </v-progress-circular>
            <p>{{ item.name }}</p>
          </div>
        </v-flex>
      </v-layout>
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
  import json from './Simple.json';

  export default {
    props: ['data', 'active'],
    data() {
      return {  
        progressBar: true,
        items: [
          {
            name: 'กำไรสุทธฺโตต่อเนื่อง',
            color: 'warning',
            value: 0,
            valueMax: 0,
            process: false
          },
          {
            name: 'สินทรัพย์โตต่อเนื่อง',
            color: 'error',
            value: 0,
            valueMax: 0,
            process: false
          },
          {
            name: 'ราคาโตต่อเนื่อง',
            color: 'primary',
            value: 0,
            valueMax: 0,
            process: false
          },
          {
            name: 'ปันผลต่อเนื่อง',
            color: 'success',
            value: 0,
            valueMax: 0,
            process: false
          },
          {
            name: 'อัตราส่วนเงินปันผล(%) มากกว่า 1',
            color: 'purple',
            value: 0,
            valueMax: 0,
            process: false
          },
          {
            name: 'กำไรสะสมไม่จัดสรร 2เท่า ของเเงินจ่ายปันผล',
            color: 'pink',
            value: 0,
            valueMax: 0,
            process: false
          },
        ],
        stock: json,
        series: [44, 55, 67, 83],
        chartOptions: {
          plotOptions: {
            radialBar: {
              dataLabels: {
                  name: {
                    fontSize: '22px',
                  },
                  value: {
                    fontSize: '16px',
                  },
                  total: {
                    show: true,
                    label: 'คะแนนรวม',
                  }
              }
            }
          },
          labels: ['หุ้นคุณค่า', 'หุ้นเติบโต', 'หุ้นปันผล', 'หุ้นราคาถูก'],
        }
      }
    },
    methods: {
      changeValue: function() {

      }
    },
    watch: {
      data: function(val) { 
        this.stock = val
        this.items.forEach((item, i) => {
          switch(i) {
            case 0:
              item.valueMax = parseFloat(val.GrowthStock.Net_rate)
              break;
            case 1:
              item.valueMax = parseFloat(val.GrowthStock.Assets_rate)
              break;
            case 2:
              item.valueMax = parseFloat(val.GrowthStock.Price_rate)
              break;
            case 3:
              item.valueMax = parseFloat(val.StockDividend.DIv_rate)
              break;
            case 4:
              item.valueMax = parseFloat(val.StockDividend.More_one_rate)
              break;
            default:
              item.valueMax = parseFloat(val.StockDividend.Double_rate)
          }
          item.process = false
          item.value = 0
        })
        this.progressBar = true
      },
      active: function(val) { 
        if(val == 1) {
          this.progressBar = true
          this.items.forEach((item) => {
            item.process = false
            item.value = 0
          })
        }
      },
    },
    mounted () {
      this.interval = setInterval(() => {
        var count = 0
        if(this.progressBar) {
          this.items.forEach((item) => {
            var tmp = item.value + 20;
            if (tmp >= item.valueMax) {
              item.value = item.valueMax
              item.process = true
            } 
            else if(!item.process) {
              item.value = tmp
            }
            if(item.process)
              count++
          });
        }
        if(count == 6)
          this.progressBar = false
      }, 500)
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
  .circular {
    margin: 1rem
  }
</style>
