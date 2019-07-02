<template>
  <div>
    <v-tabs v-model="active" color="green darken-2" dark slider-color="yellow" centered>
      <v-tab v-for="title in titleTab" :key="title" ripple>{{ title }}</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <app-description v-if="!stockLoading" :active="active" :data="stock" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <app-turnover :active="active" :data="stock" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import appDescription from "./Description.vue";
import appTurnover from "./Turnover.vue";

export default {
  components: {
    appDescription,
    appTurnover
  },
  props: ["stock"],
  data() {
    return {
      titleTab: ["รายละเอียด", "ผลประกอบการ"],
      active: null
    };
  },
  computed: {
    ...mapGetters(["stockLoading"])
  }
};
</script>

<style scoped>
</style>
