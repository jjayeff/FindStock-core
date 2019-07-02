<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs4 md2 v-for="item in items" :key="item.name">
          <div class="text-xs-center">
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="item.value"
              :color="item.color"
              class="circular"
            >{{ item.value }}</v-progress-circular>
            <p>{{ item.name }}</p>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import json from "../../home/components/Simple.json";

export default {
  data() {
    return {
      progressBar: true,
      items: [
        {
          name: "กำไรสุทธฺโตต่อเนื่อง",
          color: "warning",
          value: 0,
          valueMax: 0,
          process: false
        },
        {
          name: "สินทรัพย์โตต่อเนื่อง",
          color: "error",
          value: 0,
          valueMax: 0,
          process: false
        },
        {
          name: "ราคาโตต่อเนื่อง",
          color: "primary",
          value: 0,
          valueMax: 0,
          process: false
        },
        {
          name: "ปันผลต่อเนื่อง",
          color: "success",
          value: 0,
          valueMax: 0,
          process: false
        },
        {
          name: "อัตราส่วนเงินปันผล(%) มากกว่า 1",
          color: "purple",
          value: 0,
          valueMax: 0,
          process: false
        },
        {
          name: "กำไรสะสมไม่จัดสรร 2เท่า ของเเงินจ่ายปันผล",
          color: "pink",
          value: 0,
          valueMax: 0,
          process: false
        }
      ],
      stock: json,
      series: [44, 55, 67, 83],
      chartOptions: {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px"
              },
              value: {
                fontSize: "16px"
              },
              total: {
                show: true,
                label: "คะแนนรวม"
              }
            }
          }
        },
        labels: ["หุ้นคุณค่า", "หุ้นเติบโต", "หุ้นปันผล", "หุ้นราคาถูก"]
      }
    };
  },
  created() {
    this.setStock();
  },
  methods: {
    setStock: function() {
      if (this.singleStock.length > 0) {
        this.stock = this.singleStock[0];
        this.items.forEach((item, i) => {
          switch (i) {
            case 0:
              item.valueMax = parseFloat(this.stock.GrowthStock[0].Net_rate);
              break;
            case 1:
              item.valueMax = parseFloat(this.stock.GrowthStock[0].Assets_rate);
              break;
            case 2:
              item.valueMax = parseFloat(this.stock.GrowthStock[0].Price_rate);
              break;
            case 3:
              item.valueMax = parseFloat(this.stock.StockDividend[0].DIv_rate);
              break;
            case 4:
              item.valueMax = parseFloat(
                this.stock.StockDividend[0].More_one_rate
              );
              break;
            default:
              item.valueMax = parseFloat(
                this.stock.StockDividend[0].Double_rate
              );
          }
          item.process = false;
          item.value = 0;
        });
        this.progressBar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["singleStock"])
  },
  watch: {
    singleStock: function() {
      this.setStock();
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      var count = 0;
      if (this.progressBar) {
        this.items.forEach(item => {
          var tmp = item.value + 20;
          if (tmp >= item.valueMax) {
            item.value = item.valueMax;
            item.process = true;
          } else if (!item.process) {
            item.value = tmp;
          }
          if (item.process) count++;
        });
      }
      if (count == 6) this.progressBar = false;
    }, 500);
  }
};
</script>

<style scoped>
.borderBottle {
  border-bottom: 2px solid #757575;
}
table {
  width: 100%;
}
th,
td {
  border-bottom: 1px solid #ddd;
}
.circular {
  margin: 1rem;
}
</style>
