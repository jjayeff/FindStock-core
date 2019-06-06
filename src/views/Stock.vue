<template>
  <div>
    <v-progress-linear color="success" :indeterminate="stockLoading" v-if="stockLoading"></v-progress-linear>
    <app-stock v-if="!stockLoading"/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import appStock from '../components/stock/';

  export default {
    components: {
      appStock
    },
    data() {
      return {
        symbol: this.$route.params.symbol
      }
    },
    methods: {
      ...mapActions(['fetchSingleStock', 'fetchSector'])
    },
    computed: {
      ...mapGetters(['stockLoading', 'singleStock'])
    },
    watch: {
      singleStock: function() {
        this.fetchSector(this.singleStock[0].Sector);
      }
    },
    created() {
      document.title = 'หุ้น ' + this.symbol + ' ข้อมูลรายละเอียดบริษัท - FindStock'
      this.fetchSingleStock(this.symbol.toUpperCase().trim());
    }
  }
</script>

<style>

</style>
