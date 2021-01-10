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
        v-for="(item, index) in results"
        :key="index"
        cols="12"
        sm="6"
        lg="4"
      >
        <v-card style="cursor: pointer;" @click="play(item)">
          <v-img :src="item.thumbnail"></v-img>
          <v-card-title>
            {{ item.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ item.channel }}
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
      let q = encodeURI(this.query);
      this.axios(`${config.SERVER_URL}/s?q=${q} `).then(({ data }) => {
        data.forEach((video) => {
          this.results.push({
            id: video.videoId,
            title: video.title,
            channel: video.author.name,
            age: video.ago,
            thumbnail: video.thumbnail,
            duration: video.seconds,
          });
          this.searching = false;
        });
      });
    },

    async play(item) {
      let { title, artists } = this.$route.query;
      let {
        data: { formats },
      } = await this.axios.get(`${config.SERVER_URL}/v/${item.id}`);
      title = decodeURI(title || item.title);
      artists = decodeURI(artists || item.channel);
      formats = formats
        .filter(({ hasAudio, hasVideo }) => !!hasAudio && !hasVideo)
        .sort((a, b) => b.bitrate - a.bitrate);
      this.$root.player
        .play({
          title: title || item.title,
          thumbnail: item.thumbnail,
          src: formats[0].url,
          type: formats[0].mimeType.split(";")[0],
          artists: artists.split(","),
        })
        .play();
      this.$root.player.show = true;
    },
  },

  beforeMount() {
    let { title, artists } = this.$route.query;
    if (title && artists) {
      this.query = `${decodeURI(title)} - ${decodeURI(artists)}`;
      this.search();
    }
  },
};
</script>
