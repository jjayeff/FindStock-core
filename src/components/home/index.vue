<template>
  <div>
    <app-tab id="detail" :stock='stock'/>
    <app-table @stockSelected='stock = $event'/>
  </div>
</template>

<script>
  import appTab from './components/Tab.vue';
  import appTable from './components/Table.vue';

  export default {
    components: {
      appTab,
      appTable
    },
    data: function() {
      return {
        stock: null
      }
    }
  }
</script>

<style scoped>

</style>