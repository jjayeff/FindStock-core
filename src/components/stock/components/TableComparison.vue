<template>
<div>
  <v-toolbar-title><h5>การจัดอันดับในหมวดธุรกิจ : {{ NameSector }}</h5></v-toolbar-title>
  <v-data-table
    :headers="headers"
    :items="items"
    :pagination.sync="pagination"
    :loading="stockLoading"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td :class="CheckColor(props.item.Symbol)">{{ props.item.Symbol }}</td>
      <td :class="CheckColor(props.item.Symbol)">{{ props.item.Lastprice }}</td>
      <td :class="CheckColor(props.item.Symbol)">{{ props.item.dif_proce }}</td>
      <td :class="CheckColor(props.item.Symbol)">{{ props.item.PE }}</td>
      <td :class="CheckColor(props.item.Symbol)">{{ props.item.PBV }}</td>
      <td :class="CheckColor(props.item.Symbol)">{{ props.item.Dvd_Yield }}</td>
      <td :class="CheckColor(props.item.Symbol)">{{ props.item.Market_cap }}</td>
    </template>
  </v-data-table>
</div>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        pagination: {
          descending: true,
          rowsPerPage: -1,
          sortBy: "Market_cap"
        },
        headers: [
          {
            text: 'หลักทรัพย์',
            align: 'left',
            sortable: false,
            value: 'Symbol'
          },
          { text: 'ราคาปิด', value: 'Lastprice' },
          { text: 'เปลี่ยนแปลง', value: 'dif_proce' },
          { text: 'P/E', value: 'PE' },
          { text: 'P/BV', value: 'PBV' },
          { text: 'Dvd Yield (%)', value: 'Dvd_Yield' },
          { text: 'Mkt Cap (ล้านบาท)', value: 'Market_cap' }
        ]
      }
    },
    methods: {
      CheckColor: function(input) {
        return input == this.singleStock[0].Symbol ? "grey lighten-1" : ""
      }
    },
    computed: {
      ...mapGetters(['allSectors', 'stockLoading', 'singleStock']),
      items: function() {
        var arr = []
        if(this.allSectors.length > 0) {
          arr = this.allSectors.map((value) => {
            var result = {
              Symbol: value.Symbol,
              Lastprice: value.Lastprice,
              dif_proce: -0.5,
              PE: value.PE,
              PBV: value.PBV,
              Dvd_Yield: value.Dvd_Yield,
              Market_cap: value.Market_cap,
            }
            return result
          })
        }
        return arr
      },
      NameSector: function() {
        if(this.singleStock.lenth > 0)
          return this.singleStock[0].Sector
      }
    }
  }
</script>

<style scoped>
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Mitr', sans-serif;
    padding-bottom: 10px
  }
</style>
