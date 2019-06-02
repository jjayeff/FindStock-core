<template>
    <app-home />
</template>

<script>
  import { mapActions } from 'vuex';
  import appHome from '../components/home';
  
  export default {
    components: {
      appHome
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
