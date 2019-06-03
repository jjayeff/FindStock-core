<template>
  <div class="box">
    <v-tabs
      v-model="active"
      centered
    >
      <v-tab v-for="title in tiltes" :key="title" ripple>{{ title }}</v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text><app-chat-period :active='active'/></v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text><app-chat-statistics :active='active'/></v-card-text>
        </v-card>
      </v-tab-item>

    </v-tabs>
    </div>
</template>

<script>
  import appChatPeriod from './ChatPeriod';
  import appChatStatistics from './ChatStatistics';

  export default {
    data() {
      return {
        active: null,
        tiltes: ['บัญชีทางการเงิน', 'ค่าสถิติ']
      }
    },
    components: {
      appChatPeriod,
      appChatStatistics
    }
  }
</script>

<style scoped>
  .box {
    border: 1px solid #ddd;
  }
</style>