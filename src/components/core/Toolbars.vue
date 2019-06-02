<template>
  <v-toolbar>
    <v-toolbar-title class="font-weight-black font-italic">Find<span class="grey--text text--darken-1">Stock</span></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-for="item in items" :key="item.name" :to="item.to">
        {{ item.name }}
      </v-btn>
    </v-toolbar-items>
    <div class="hidden-sm-and-down">
      <v-btn flat class="primary--text">ลงชื่อเข้าใช้</v-btn>
      <v-btn round color="primary">สมัครสมาชิก</v-btn>
    </div>
  </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: function () {
      return {
        searchSelected: '',
        items: [
          { 
            name: 'หน้าแรก',
            to: '/'
          },
          { 
            name: 'เกี่ยวกับเรา',
            to: '/about-us'
          },
          { 
            name: 'ข่าวสาร',
            to: '/news'
          },
          { 
            name: 'คลังความรู้',
            to: '/knowledge'
          },
          { 
            name: 'เปรียบเทียบหุ้น',
            to: '/compare-stock'
          },
        ]
      }
    },
    computed: {
      ...mapGetters(['allStocks'])
    }
  }
</script>

<style scoped>
  .marginTest {
    padding-left: 50px
  }
</style>
