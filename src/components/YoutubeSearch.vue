<template>
  <v-container>
    <v-form class="mt-6" @submit.prevent="search">
      <v-text-field
        solo
        type="search"
        label="Search Video"
        append-icon="mdi-movie-search-outline"
        autocomplete="off"
        v-model="query"
        :loading="searching"
      ></v-text-field>
    </v-form>
    <v-row>
      <v-col
        v-for="(result, index) in results"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card style="cursor: pointer;" @click="play(result)">
          <v-img :src="result.thumbnails[2]"></v-img>
          <v-card-title>
            {{ result.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ result.channel }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from "../../config";
import player from "../functions/player";

export default {
  data: () => ({
    query: "",
    searching: false,
    results: [],
  }),

  methods: {
    search() {
      this.searching = true;
      this.results = [];
      this.axios(`${config.SERVER_URL}/search?q=${this.query} `).then(
        ({ data }) => {
          data.forEach((snippet) => {
            this.results.push({
              id: snippet.id,
              title: snippet.title,
              channel: snippet.channelTitle,
              publishedAt: snippet.publishedAt,
              thumbnails: Object.values(snippet.thumbnails).map(
                (thumbnail) => thumbnail.url
              ),
            });
            this.searching = false;
          });
        }
      );
    },

    async play({ id, title, thumbnails }) {
      let artists = [];
      let audioPlayer = this.$root.player;
      audioPlayer.playing = false;
      if (this.$route.query.title) {
        title = this.$route.query.title;
      }
      if (this.$route.query.artists) {
        artists = this.$route.query.artists.split(",");
      }
      const { sources } = await player(config.SERVER_URL, id);
      this.$root.player.src = sources[0].url;
      audioPlayer.title = title;
      audioPlayer.artists = artists;
      audioPlayer.thumbnail = thumbnails[0];
      // audioPlayer.playing = true;
    },
  },

  beforeMount() {
    let { title, artists } = this.$route.query;
    if (title && artists) {
      this.query = `${title} - ${artists}`;
      this.search();
    }
  },
};
</script>
