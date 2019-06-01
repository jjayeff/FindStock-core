<template>
  <div>
    <!--Selected-->
    <template>
      <div>
        <v-layout wrap>

          <v-flex xs12 sm5 pt-5>
            <v-select
              v-model="industrySelected"
              :items="industry"
              label="เลือกกลุ่มอุตสาหกรรม"
              outline
            ></v-select>
          </v-flex>

          <v-flex xs12 sm5 pt-5>
            <v-select
              v-model="sectorSelected"
              :items="sector"
              label="เลือกหมวดธุรกิจ"
              outline
            ></v-select>
          </v-flex>

          <v-flex xs12 sm2>
            <v-switch
              v-model="set50Selected"
              label="SET50"
              color="primary"
              value="true"
              hide-details
            ></v-switch>
            <v-switch
              v-model="set100Selected"
              label="SET100"
              color="info"
              value="true"
              hide-details
            ></v-switch>
          </v-flex>

        </v-layout>
      </div>
    </template>
    <!--Table-->
    <div>
      <v-data-table
        :headers="headers"
        :items="stock"
        :pagination.sync="pagination"
        :loading="stockLoading"
        item-key="Symbol"
      >
        <template v-slot:items="props">
          <tr @click="handlerClick(props.item.Symbol)">
            <td><a>{{ props.item.Symbol }}</a></td>
            <td>{{ props.item.Industry }}</td>
            <td>{{ props.item.Sector }}</td>
            <td>
              <v-icon color="success" v-if="props.item.SET50">check_circle</v-icon>
            </td>
            <td
              :class="[props.item.Return_rate > 0 ? 'green--text' : 'red--text']"
            >{{ props.item.Return_rate == null ? '-': props.item.Return_rate + '%' }}</td>
            <td
              :class="[colorRate(props.item.IAA_rate)]"
            >{{ props.item.IAA_rate == null ? '-': props.item.IAA_rate + '%' }}</td>
            <td
              :class="[colorRate(props.item.Growth_stock_rate)]"
            >{{ props.item.Growth_stock_rate == null ? '-': props.item.Growth_stock_rate + '%' }}</td>
            <td
              :class="[colorRate(props.item.Stock_dividend_rate)]"
            >{{ props.item.Stock_dividend_rate == null ? '-': props.item.Stock_dividend_rate + '%' }}</td>
            <td
              :class="[colorRate(props.item.Score)]"
            >{{ props.item.Score }}%</td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
        return {
          pagination: {
            descending: true,
            rowsPerPage: 10,
            sortBy: "Score"
          },
          headers: [
              {
                  text: "สัญลักษณ์",
                  align: "left",
                  sortable: false,
                  value: "Symbol"
              },
              { text: "กลุ่มอุตสาหกรรม", value: "Industry" },
              { text: "หมวดธุรกิจ", value: "Sector" },
              { text: "SET50", value: "SET50" },
              { text: "ผลตอบแทน 1 ปี", value: "Return_rate" },
              { text: "แนะนำให้ซื้อ", value: "IAA_rate" },
              { text: "หุ้นเติบโต", value: "Growth_stock_rate" },
              { text: "หุ้นปันผล", value: "Stock_dividend_rate" },
              { text: "คะแนน", value: "Score" }
          ],
          industry: [
            'ทั้งหมด',
            'เกษตรและอุตสาหกรรมอาหาร',
            'สินค้าอุปโภคบริโภค',
            'ธุรกิจการเงิน',
            'สินค้าอุตสาหกรรม',
            'อสังหาริมทรัพย์และก่อสร้าง',
            'ทรัพยากร',
            'บริการ',
            'เทคโนโลยี'
          ],
          industrySelected: 'ทั้งหมด',
          sector: ['ทั้งหมด'],
          sectorSelected: 'ทั้งหมด',
          set50Selected: null,
          set100Selected: null,
        }
    },
    methods: {
      colorRate: function(data) {
        return data >= 75 ? 'green--text text--darken-4'
          : data >= 50 ? 'green--text'
          : data >= 25 ? 'orange--text'
          : 'red--text'
      },
      handlerClick: function(symbol) {
        this.$vuetify.goTo('#detail');
        var obj = this.allStocks;
        obj = obj.filter(item => {
          return item.Symbol == symbol
        })
        this.$emit('stockSelected', obj[0])
      }
    },
    computed: {
      ...mapGetters(['allStocks', 'stockLoading']),
      stock: function() {
        var obj = this.allStocks;
        if(this.industrySelected != 'ทั้งหมด')
          obj = obj.filter(item => {
            return item.Industry == this.industrySelected
          })
        if(this.sectorSelected != 'ทั้งหมด')
          obj = obj.filter(item => {
            return item.Sector == this.sectorSelected
          })
        if(this.set50Selected == 'true')
          obj = obj.filter(item => {
            return item.SET50 == true
          })
        if(this.set100Selected == 'true')
          obj = obj.filter(item => {
            return item.SET100 == true
          })
        this.$emit('stockSelected', obj[0])          
        return obj;
      }
    },
    watch: {
      industrySelected: function() {
        var obj = this.allStocks;
        this.sector = Object.keys(obj).map(i => obj[i].Industry == this.industrySelected ? obj[i].Sector : 'ทั้งหมด');
        this.sectorSelected = 'ทั้งหมด'
      }
    }
  }
</script>

<style>

</style>
