<template>
  <v-footer fixed padless v-if="title && sources">
    <v-card tile flat width="100%">
      <v-progress-linear
        :value="percent"
        class="my-0"
        height="3"
      ></v-progress-linear>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
            <v-list-item-subtitle v-if="artists && artists.length">
              {{ artists.join(",") }}
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
  props: ["title", "artists", "thumbnail", "src", "playing"],

  data: () => ({
    player: null,
    current: 0,
    duration: 0,
    isPlaying: true,
  }),

  methods: {
    toggle() {
      if (this.player) {
        if (this.player.paused) {
          this.player.play();
          this.$root.player.playing = true;
        } else {
          this.player.pause();
          this.$root.player.playing = false;
        }
      }
    },
  },

  computed: {
    percent() {
      return (this.current / this.duration) * 100;
    },
  },

  watch: {
    playing(value) {
      const player = this.player || new Audio();
      if (!this.player) {
        player.addEventListener("timeupdate", () => {
          this.current = player.currentTime;
        });
        player.addEventListener("change", () => {
          this.current = 0;
          this.duration = player.duration;
        });
        player.addEventListener("durationchange", () => {
          this.current = 0;
          this.duration = player.duration;
        });
        player.addEventListener("canplaythrough", () => {
          player.play();
        });
        this.player = player;
      }
      if (value) {
        player.play();
      } else {
        player.pause();
      }
    },

    src(value) {
      const player = this.player || new Audio();
      if (!this.player) {
        player.addEventListener("timeupdate", () => {
          this.current = player.currentTime;
        });
        player.addEventListener("change", () => {
          this.current = 0;
          this.duration = player.duration;
        });
        player.addEventListener("durationchange", () => {
          this.current = 0;
          this.duration = player.duration;
        });
        player.addEventListener("canplaythrough", () => {
          player.play();
        });
        this.player = player;
      }
      player.src = value;
    },

    current(newValue, oldValue) {
      if (Math.pow(newValue - oldValue, 2) < 1) return;
      this.player.currentTime = newValue;
    },
  },
};
</script>
