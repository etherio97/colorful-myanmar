<template>
  <v-container>
    <YoutubeSearch></YoutubeSearch>
  </v-container>
</template>

<script>
import YoutubeSearch from "../components/YoutubeSearch";

export default {
  name: "Home",
  components: {
    YoutubeSearch,
  },
};
</script>
