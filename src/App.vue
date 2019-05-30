<template>
  <v-app>
    <Toolbars />
    <v-container grid-list-xl>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
  import Toolbars from './components/core/Toolbars.vue';

  export default {
    name: 'App',
    components: {
      Toolbars
    }
  }
</script>
