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
        <v-card :to="{ path: `/video/${result.id}` }">
          <v-img :src="result.thumbnails[2]"></v-img>
          <v-card-title>
            {{ result.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ result.channel }}
          </v-card-subtitle>
          <v-card-text>
            {{ result.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from "../../config";
export default {
  data() {
    return {
      query: null,
      searching: false,
      results: [],
    };
  },

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
  },
};
</script>
