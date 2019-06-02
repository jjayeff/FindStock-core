<template>
  <table>
    <tr>
      <th class="text-xs-center">งวดงบการเงิน<br/>ณ วันที่</th>
      <th v-for="(title, i) in titles" :key="i">งบปี {{title.year}}<br/>{{title.date}}</th>
      <th>ไตรมาส {{quarter.quarter}}/{{quarter.year}}<br/>{{quarter.date}}</th>
    </tr>
    <tr v-for="list in lists" :key="list.name">
      <td v-for="(value, index) in list.value" :key="index" :class="list.value.length == 1 ? 'blue--text':''">{{ value }}</td>
    </tr>
  </table>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['allStocks']),
      lists: function() {
        var finance = this.allStocks[0].Finance.FinanceInfoYearly;
        var Assets = [], Liabilities = [], Equity = [], Paid_up_cap = [], Revenue = [];
        var NetProfit = [], EPS = [] , ROA = [], ROE = [] , NetProfitMargin = [];
        if(finance != null) {
          Assets = finance.map((value) => {
            return value.Assets
          })
          Assets.push(this.allStocks[0].Finance.FinanceInfoQuarter.Assets)
          Assets.unshift('สินทรัพย์รวม')
          
          Liabilities = finance.map((value) => {
            return value.Liabilities
          })
          Liabilities.push(this.allStocks[0].Finance.FinanceInfoQuarter.Liabilities)
          Liabilities.unshift('หนี้สินรวม')

          Equity = finance.map((value) => {
            return value.Equity
          })
          Equity.push(this.allStocks[0].Finance.FinanceInfoQuarter.Equity)
          Equity.unshift('ส่วนของผู้ถือหุ้น')

          Paid_up_cap = finance.map((value) => {
            return value.Paid_up_cap
          })
          Paid_up_cap.push(this.allStocks[0].Finance.FinanceInfoQuarter.Paid_up_cap)
          Paid_up_cap.unshift('มูลค่าหุ้นที่เรียกชำระแล้ว')

          Revenue = finance.map((value) => {
            return value.Revenue
          })
          Revenue.push(this.allStocks[0].Finance.FinanceInfoQuarter.Revenue)
          Revenue.unshift('รายได้รวม')

          NetProfit = finance.map((value) => {
            return value.NetProfit
          })
          NetProfit.push(this.allStocks[0].Finance.FinanceInfoQuarter.NetProfit)
          NetProfit.unshift('กำไรสุทธิ')

          EPS = finance.map((value) => {
            return value.EPS
          })
          EPS.push(this.allStocks[0].Finance.FinanceInfoQuarter.EPS)
          EPS.unshift('กำไรต่อหุ้น (บาท)')

          ROA = finance.map((value) => {
            return value.ROA
          })
          ROA.push(this.allStocks[0].Finance.FinanceInfoQuarter.ROA)
          ROA.unshift('ROA(%)')

          ROE = finance.map((value) => {
            return value.ROE
          })
          ROE.push(this.allStocks[0].Finance.FinanceInfoQuarter.ROE)
          ROE.unshift('ROE(%)')

          NetProfitMargin = finance.map((value) => {
            return value.NetProfitMargin
          })
          NetProfitMargin.push(this.allStocks[0].Finance.FinanceInfoQuarter.NetProfitMargin)
          NetProfitMargin.unshift('อัตรากำไรสุทธิ(%)')
        }
        var arr = [
          {
            name: 'บัญชีทางการเงินที่สำคัญ',
            value: ['บัญชีทางการเงินที่สำคัญ']
          },
          {
            name: 'สินทรัพย์รวม',
            value: Assets
          },
          {
            name: 'หนี้สินรวม',
            value:  Liabilities
          },
           {
            name: 'ส่วนของผู้ถือหุ้น',
            value:  Equity
          },
          {
            name: 'มูลค่าหุ้นที่เรียกชำระแล้ว',
            value:  Paid_up_cap
          },
          {
            name: 'รายได้รวม',
            value:  Revenue
          },
          {
            name: 'กำไรสุทธิ',
            value:  NetProfit
          },
          {
            name: 'กำไรต่อหุ้น (บาท)',
            value:  EPS
          },
          {
            name: 'อัตราส่วนทางการเงินที่สำคัญ',
            value: ['อัตราส่วนทางการเงินที่สำคัญ']
          },
          {
            name: 'ROA(%)',
            value:  ROA
          },
          {
            name: 'ROE(%)',
            value:  ROE
          },
          {
            name: 'อัตรากำไรสุทธิ(%)',
            value:  NetProfitMargin
          },
        ]
        return arr
      },
      titles: function() {
        var finance = this.allStocks[0].Finance.FinanceInfoYearly;
        var Dates = []
        if(finance != null) {
          Dates = finance.map((value) => {
            var obj = {}
            obj['year'] = value.Year;
            obj['date'] = value.Date;
            return  obj
          })
        }
        var arr = Dates
        return arr
      },
      quarter: function() {
        var obj = {}
        var tmp = this.allStocks[0].Finance.FinanceInfoQuarter
        obj['year'] = tmp.Year;
        obj['date'] = tmp.Date;
        obj['quarter'] = tmp.Quarter;
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

