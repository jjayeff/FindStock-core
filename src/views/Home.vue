<template>
  <div>
    <RankStock />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import RankStock from '../components/home/RankStock.vue';
  
  export default {
    components: {
      RankStock
    },
    methods: {
      ...mapActions([
        'fetchStock', 
        'fetchStockFast'
      ])
    },
    created() {
      this.fetchStockFast();
      this.fetchStock();
    }
  }
</script>

<style>

</style>
