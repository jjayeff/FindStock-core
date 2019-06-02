<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-img
          src="https://kaohoon.com/wp-content/uploads/2017/04/ivl.jpg"
          aspect-ratio="2.75"
        ></v-img>

        <v-flex>
          <v-card-title primary-title>
            <div>
              <h4 class="mb-0">Business (ลักษณะธุรกิจ)</h4>
              <div> {{ card_text }} </div>
            </div>
          </v-card-title>
        </v-flex>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        card_text: 'ประกอบธุรกิจด้านการลงทุนโดยการถือหุ้นในบริษัทต่างๆ ทั้งในประเทศและต่างประเทศ ในผลิตภัณฑ์ปิโตรเคมีแบบครบวงจร ซึ่งผลิตและจำหน่าย Ethylene Oxide และ Ethylene Glycol (“EO&EG”) Purified Terephthalic Acid (“PTA”) Polyethylene Terephthalate (“PET”) เส้นใยและเส้นด้าย โพลีเอสเตอร์ (Polyester Fiber and Yarn) และเส้นใยจากขนสัตว์ (Wool)'
      }
    }
  }
</script>

<style>

</style>
