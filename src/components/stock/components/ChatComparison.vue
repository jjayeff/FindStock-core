<template>
  <div id="chart">
    
    <v-toolbar flat>
      <v-toolbar-title><h5>กราฟอันดับในหมวดธุรกิจ : {{ NameSector }}</h5></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
        :items="selectItem"
        v-model="selected"
        single-line
        outline
      ></v-select>
    </v-toolbar>
    <apexchart type=line height=350 :options="chartOptions" :series="series" v-if="reChat"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VueApexCharts from 'vue-apexcharts'

  export default {
    components: {
      apexchart: VueApexCharts
    },
    data () {
      return {
        reChat: true,
        selected: 'P/E',
        selectItem: ['ราคาปิด', 'เปลี่ยนแปลง', 'P/E', 'P/BV', 'Dvd Yield (%)', 'Mkt Cap (ล้านบาท)'],
        series: [
          {
            name: 'PE',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
          },
          {
            name: 'Avr.',
            type: 'area',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
          }, 
        ],
        chartOptions: {
          chart: {
            stacked: false,
          },
          stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
          },
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          },
          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
            }
          },
          markers: {
            size: 0
          },
          xaxis: {
            categories: ["BCT", "CMAN", "GC", "GGC", "GIFT", "IVL", "NFC", "PATO", "PMTA", "PTTGC", "SUTHA", "TCCC", "TPA", "UP", "VNT", "WG"]
          },
          yaxis: {
            title: {
              text: 'Points',
            },
            min: 0
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " points";
                }
                return y;

              }
            }
          }
        }
      }
    },
    methods: {
      changeChat: function(input) {
        this.chartOptions.xaxis.categories = this.allSectors.map((value) => value.Symbol)
        var avr = 0
        switch(input) {
          case 'ราคาปิด':
            this.series[0].data = this.allSectors.map((value) => {
              avr += value
              return value.Lastprice
            })
            this.series[0].name = 'ราคาปิด'
            this.series[1].name = 'ค่าเฉลี่ย'
            //avr = avr / this.allSectors.length
            break;
          case 'เปลี่ยนแปลง':
            this.series[0].data = this.allSectors.map((value) => value.Lastprice)
            this.series[0].name = 'เปลี่ยนแปลง'
            this.series[1].name = 'ค่าเฉลี่ย'
            break;
          case 'P/E':
            this.series[0].data = this.allSectors.map((value) => value.PE)
            this.series[0].name = 'P/E'
            this.series[1].name = 'ค่ามาตรฐาน'
            avr = 15
            break;
          case 'P/BV':
            this.series[0].data = this.allSectors.map((value) => value.PBV)
            this.series[0].name = 'P/BV'
            this.series[1].name = 'ค่าเฉลี่ย'
            break;
          case 'Dvd Yield (%)':
            this.series[0].data = this.allSectors.map((value) => value.Dvd_Yield)
            this.series[0].name = 'Dvd Yield (%)'
            this.series[1].name = 'ค่ามาตรฐาน'
            avr = 1
            break;
          default:
            this.series[0].data = this.allSectors.map((value) => {
              avr += value
              return value.Market_cap
            })
            this.series[0].name = 'Mkt Cap (ล้านบาท)'
            this.series[1].name = 'ค่าเฉลี่ย'
            //avr = avr / this.allSectors.length
        }
        
        this.series[1].data = this.series[0].data.map(() => {
          return avr
        })
        this.reChat = false
        this.$nextTick().then(() => {
          // re-render
          this.reChat = true
        });
      }
    },
    computed: {
      ...mapGetters(['singleStock', 'allSectors']),
      NameSector: function() {
        if(this.singleStock.length > 0)
        return this.singleStock[0].Sector
      },
    },
    watch: {
      allSectors: function() {
        this.changeChat('P/E')
      },
      selected: function() {
        this.changeChat(this.selected)
      }
    }
  }
</script>

<style scoped>
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Mitr', sans-serif;
  }
</style>
