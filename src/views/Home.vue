<template>
  <app-home />
</template>

<script>
import { mapActions } from "vuex";
import appHome from "../components/home";

export default {
  components: {
    appHome
  },
  methods: {
    ...mapActions(["fetchStock", "fetchFastStock"])
  },
  created() {
    if (this.$store.state.stock.stock.length < 600) {
      this.fetchFastStock();
      this.fetchStock();
    }
  }
};
</script>
