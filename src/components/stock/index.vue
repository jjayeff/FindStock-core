<template>
  <div>
    <app-header/>
    <v-layout row wrap>
      <v-flex md4 xs12>
        <app-info/>
      </v-flex>
      <v-flex md8 xs12>
        <app-chat-price/>
      </v-flex>
      <v-flex xs12>
        <app-progress />
      </v-flex>
      <v-flex lg5 xs12>
        <app-tab-chat/>
      </v-flex>
      <v-flex lg7 xs12>
        <app-tab-table />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import appHeader from './components/Header.vue';
  import appChatPrice from './components/ChatPrice';
  import appInfo from './components/Info';
  import appProgress from './components/Progress';
  import appTabTable from './components/TabTable.vue';
  import appTabChat from './components/TabChat';

  export default {
    components: {
      appHeader,
      appChatPrice,
      appInfo,
      appProgress,
      appTabTable,
      appTabChat,
    }
  }
</script>

<style scoped>

</style>