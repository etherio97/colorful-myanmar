<template>
  <v-container>
    <YoutubePlayer :id="$route.params.id"></YoutubePlayer>
  </v-container>
</template>

<script>
import YoutubePlayer from "../components/YoutubePlayer";
export default {
  components: {
    YoutubePlayer,
  },
};
</script>
