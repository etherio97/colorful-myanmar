<template>
  <v-container>
    <v-card :loading="loading">
      <v-card-title>
        Top 100
      </v-card-title>
      <v-card-subtitle>
        {{ published }}
      </v-card-subtitle>
      <v-card-text>
        <v-simple-table>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" @click="to(item)">
              <th>
                {{ index + 1 }}
              </th>
              <td>
                <v-img :src="item.coverImage" height="100" width="100"></v-img>
              </td>
              <td>
                {{ item.SongName }}
              </td>
              <td>
                {{ item.SongArtists.join(", ") }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
const database = firebase.database().ref("v1");
export default {
  data: () => ({
    loading: true,
    published: null,
    items: [],
  }),

  methods: {
    to({ SongArtists, SongName, coverImage }) {
      this.$router.push(
        "/search?title=" +
          encodeURI(SongName) +
          "&artists=" +
          encodeURI(SongArtists.join())
      );
    },
  },

  async beforeMount() {
    const dt = new Date();
    const latest = (await database.child("latest").get()).val();
    const charts = (await database.child(`charts/${latest}`).get()).val();
    console.log(charts);
    this.items = charts;
    this.loading = false;
  },
};
</script>
