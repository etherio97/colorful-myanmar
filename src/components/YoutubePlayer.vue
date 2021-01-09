<template>
  <v-container>
    <v-card :loading="loading">
      <v-card-subtitle>
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-card-subtitle>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-subtitle>
        {{ channel }}
      </v-card-subtitle>
      <v-card-text>
        <audio ref="player">
          <source
            v-for="(audio, index) in audios"
            :key="index"
            :src="audio.url"
            :type="audio.type"
          />
        </audio>
      </v-card-text>
      <v-card-actions v-show="!loading">
        <v-btn color="primary" icon @click="playing = !playing">
          <v-icon v-text="playing ? 'mdi-pause' : 'mdi-play'" />
        </v-btn>
        <v-slider v-model="current" class="mt-6" min="0" :max="duration" />
        <v-btn color="primary" icon>
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import config from "../../config";
export default {
  props: ["id"],

  data: () => ({
    loading: true,
    completed: false,
    playing: false,
    audios: [],
    title: null,
    channel: null,
    viewCount: null,
    thumbnails: [],
    current: 0,
    duration: 0,
    verfied: false,
  }),

  created() {
    this.axios(`${config.SERVER_URL}/v/${this.id}`).then(({ data }) => {
      this.thumbnails = data.thumbnails;
      this.title = data.title;
      this.channel = data.ownerChannelName;
      this.uploadDate = data.uploadDate;
      this.viewCount = data.viewCount;
      this.audios = data.audios.map((audio) => ({
        url: audio.url,
        type: audio.mimeType.split(";")[0],
      }));
      if (data.media) {
        this.verfied = [data.media.song, data.media.artist, data.media.album];
      }
      const audio = this.$refs.player;
      audio.addEventListener("canplaythrough", () => {
        this.duration = audio.duration;
      });
      audio.addEventListener("timeupdate", () => {
        this.current = audio.currentTime;
      });
      this.loading = false;
    });
  },

  watch: {
    playing(value) {
      const audio = this.$refs.player;
      value ? audio.play() : audio.pause();
    },

    current(newValue, oldValue) {
      if (Math.pow(newValue - oldValue, 2) < 1) return;
      this.$refs.player.currentTime = newValue;
    },
  },
};
</script>
