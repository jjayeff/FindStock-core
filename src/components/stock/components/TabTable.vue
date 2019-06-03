<template>
  <div class="box">
    <v-tabs
      v-model="active"
      centered
    >
      <v-tab v-for="title in tiltes" :key="title" ripple>{{ title }}</v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text><app-table-period/></v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text><app-table-statistics/></v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
    </div>
</template>

<script>
  import appTablePeriod from './TablePeriod.vue';
  import appTableStatistics from './TableStatistics.vue';

  export default {
    data() {
      return {
        active: null,
        tiltes: ['งวดงบการเงิน', 'ค่าสถิติสำคัญ']
      }
    },
    components: {
      appTablePeriod,
      appTableStatistics
    }
  }
</script>

<style scoped>
  .box {
    border: 1px solid #ddd;
  }
</style>
