<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/">
          <span class="logo">Colorful Myanmar</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary fixed>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="(nav, index) in navItems"
          :key="index"
          :to="nav.path"
        >
          <v-list-item-icon>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ nav.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view> </router-view>
    </v-main>

    <AudioPlayer></AudioPlayer>
  </v-app>
</template>

<script>
import AudioPlayer from "./components/AudioPlayer.vue";

const navItems = [
  { path: "/", icon: "mdi-home", title: "Home" },
  { path: "/search", icon: "mdi-movie-search", title: "Search" },
];

export default {
  data: () => ({
    drawer: false,
    navItems,
  }),

  components: {
    AudioPlayer,
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>

<style scoped>
.logo {
  color: white !important;
}
</style>
