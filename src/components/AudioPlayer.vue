<template>
  <v-footer fixed padless>
    <v-card tile flat width="100%" v-if="show">
      <v-progress-linear
        :value="percentage"
        class="my-0"
        height="3"
      ></v-progress-linear>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
            <v-list-item-subtitle v-if="artists && artists.length">
              {{ artists.join(", ") }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-spacer></v-spacer>

          <v-list-item-icon>
            <v-btn icon>
              <v-icon>mdi-rewind</v-icon>
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon>
            <v-btn icon @click="toggle">
              <v-icon v-text="playing ? 'mdi-pause' : 'mdi-play'" />
            </v-btn>
          </v-list-item-icon>

          <v-list-item-icon class="ml-0">
            <v-btn icon>
              <v-icon>mdi-fast-forward</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    show: false,
    playing: false,
    title: null,
    thumbnail: null,
    artists: [],
    audio: null,
    percentage: 0,
  }),

  methods: {
    toggle() {
      if (this.playing) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
    },

    play({ title, artists, thumbnail, src, type }) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.type = type;
      this.audio.src = src;
      this.thumbnail = thumbnail;
      this.title = title;
      this.artists = artists;
      return this.audio;
    },
  },

  beforeMount() {
    this.$root.player = this;
    this.audio = this.audio || new Audio();
    this.audio.addEventListener("play", () => {
      this.show = true;
      this.playing = true;
    });
    this.audio.addEventListener("pause", () => {
      this.playing = false;
    });
    this.audio.addEventListener("timeupdate", () => {
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
    });
    document.body.appendChild(this.audio);
  },
};
</script>
