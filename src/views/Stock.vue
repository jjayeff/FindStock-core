<template>
  <app-stock/>
</template>

<script>
  import { mapActions } from 'vuex';
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
      ...mapActions(['fetchSingleStock'])
    },
    created() {
      document.title = 'หุ้น ' + this.symbol + ' ข้อมูลรายละเอียดบริษัท - FindStock'
      this.fetchSingleStock(this.symbol.toUpperCase().trim());
    }
  }
</script>

<style>

</style>
