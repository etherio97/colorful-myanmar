<template>
  <v-container>
    <TopHits></TopHits>
  </v-container>
</template>

<script>
import TopHits from "../components/TopHits.vue";

export default {
  name: "Home",
  components: {
    TopHits,
  },
};
</script>
