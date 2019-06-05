<template>
  <div style="overflow-x:auto;">
    <table>
      <tr>
        <th class="text-xs-center">ค่าสถิติสำคัญ<br/>ณ วันที่</th>
        <th v-for="(title, i) in titles" :key="i">งบปี {{title.year}}<br/>{{title.date}}</th>
        <th>ไตรมาส {{quarter.quarter}}/{{quarter.year}}<br/>{{quarter.date}}</th>
      </tr>
      <tr v-for="list in lists" :key="list.name">
        <td v-for="(value, index) in list.value" :key="index" :class="list.value.length == 1 ? 'blue--text':''">{{ value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['SingleStock']),
      lists: function() {
        var arr = []
        if(this.SingleStock.length > 0) {
          var finance = this.SingleStock[0].Finance.FinanceStatYearly;
          var Lastprice = [], Market_cap = [], FS_date = [], PE = [], PBV = [], BookValue_Share = [], Dvd_Yield = []
          if(finance != null) {
            Lastprice = finance.map((value) => {
              return value.Lastprice
            })
            Lastprice.push(this.SingleStock[0].Finance.FinanceStatDaily.Lastprice)
            Lastprice.unshift('ราคาล่าสุด(บาท)')
            
            Market_cap = finance.map((value) => {
              return value.Market_cap
            })
            Market_cap.push(this.SingleStock[0].Finance.FinanceStatDaily.Market_cap)
            Market_cap.unshift('มูลค่าหลักทรัพย์ตามราคาตลาด')

            FS_date = finance.map((value) => {
              return value.FS_date
            })
            FS_date.push(this.SingleStock[0].Finance.FinanceStatDaily.FS_date)
            FS_date.unshift('วันที่ของงบการเงินที่ใช้คำนวณค่าสถิติ')

            PE = finance.map((value) => {
              return value.PE
            })
            PE.push(this.SingleStock[0].Finance.FinanceStatDaily.PE)
            PE.unshift('P/E (เท่า)')

            PBV = finance.map((value) => {
              return value.PBV
            })
            PBV.push(this.SingleStock[0].Finance.FinanceStatDaily.PBV)
            PBV.unshift('P/BV (เท่า)')

            BookValue_Share = finance.map((value) => {
              return value.BookValue_Share
            })
            BookValue_Share.push(this.SingleStock[0].Finance.FinanceStatDaily.BookValue_Share)
            BookValue_Share.unshift('มูลค่าหุ้นทางบัญชีต่อหุ้น (บาท)')

            Dvd_Yield = finance.map((value) => {
              return value.Dvd_Yield
            })
            Dvd_Yield.push(this.SingleStock[0].Finance.FinanceStatDaily.Dvd_Yield)
            Dvd_Yield.unshift('อัตราส่วนเงินปันผลตอบแทน(%)')
          }
          arr = [
            {
              name: 'ราคาล่าสุด(บาท)',
              value: Lastprice
            },
            {
              name: 'มูลค่าหลักทรัพย์ตามราคาตลาด',
              value:  Market_cap
            },
            {
              name: 'วันที่ของงบการเงินที่ใช้คำนวณค่าสถิติ',
              value:  FS_date
            },
            {
              name: 'P/E (เท่า)',
              value:  PE
            },
            {
              name: 'P/BV (เท่า)',
              value:  PBV
            },
            {
              name: 'มูลค่าหุ้นทางบัญชีต่อหุ้น (บาท)',
              value:  BookValue_Share
            },
            {
              name: 'อัตราส่วนเงินปันผลตอบแทน(%)',
              value:  Dvd_Yield
            },
          ]
        }
        return arr
      },
      titles: function() {
        var arr = []
        if(this.SingleStock.length > 0) {
          var finance = this.SingleStock[0].Finance.FinanceStatYearly;
          var Dates = []
          if(finance != null) {
            Dates = finance.map((value) => {
              var obj = {}
              obj['year'] = value.Year;
              obj['date'] = value.Date;
              return  obj
            })
          }
          arr = Dates
        }
        return arr
      },
      quarter: function() {
        var obj = {}
        if(this.SingleStock.length > 0) {
          var tmp = this.SingleStock[0].Finance.FinanceStatDaily
          obj['year'] = tmp.Year;
          obj['date'] = tmp.Date;
          obj['quarter'] = tmp.Quarter;
        }
        return obj
      }
    }
  }
</script>

<style scoped>
  table {
      width: 100%;
  }
  th, td {
      border-bottom: 1px solid #ddd;
      text-align: left
  }
</style>

