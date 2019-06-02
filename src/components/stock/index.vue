<template>
  <div>
    <app-header/>
    <v-layout row wrap>
      <v-flex md4 xs12>
        <app-info/>
      </v-flex>
      <v-flex md8 xs12>
        <app-price/>
      </v-flex>
      <v-flex xs12>
        <app-progress />
      </v-flex>
      <v-flex lg5 xs12>
        <app-price/>
      </v-flex>
      <v-flex lg7 xs12>
        <app-tab />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import appHeader from './components/Header.vue';
  import appPrice from './components/Price.vue';
  import appInfo from './components/Info';
  import appProgress from './components/Progress';
  import appTab from './components/Tab.vue';

  export default {
    components: {
      appHeader,
      appPrice,
      appInfo,
      appProgress,
      appTab
    }
  }
</script>

<style scoped>

</style>