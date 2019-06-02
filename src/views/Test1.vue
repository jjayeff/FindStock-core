<template>
  <h3>TEst page {{symbol}}</h3>
</template>

<script>
export default {
  data() {
      return {
        symbol: this.$route.params.id
      }
    },
}
</script>

<style>

</style>
