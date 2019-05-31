<template>
    <div>
      <v-tabs
        v-model="active"
        color="green darken-2"
        dark
        slider-color="yellow"
        centered
      >
        <v-tab v-for="title in titleTab" :key="title" ripple>{{ title }}</v-tab>
        <v-tab-item
          v-for="n in 3"
          :key="n"
        >
          <v-card flat>
            <v-card-text><SroceDetail /></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
      </div>
</template>

<script>
  import SroceDetail from './SroceDetail.vue';

  export default {
    data() {
      return {
        titleTab: ['รายละเอียด', 'หุ้นเติบโต', 'หุ้นปันผล'],
        active: null,
      }
    },
    components: {
        SroceDetail
    }
  }
</script>

<style scoped>
</style>
