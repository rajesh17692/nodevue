<template>
    <v-layout>
        <v-flex xs6 v-if="isUserLoggedIn">
            <songs-bookmarks />
            <recently-viewed-songs class="mt-2"/>
        </v-flex>
        <v-flex :class="{
          xs12: !isUserLoggedIn,
          xs6: isUserLoggedIn
        }" class="ml-2">
            <song-search-panel />
            <songs-panel class="mt-2"/>
        </v-flex>
    </v-layout>
</template>
<script>
import {mapState} from 'vuex'
import SongsPanel from './SongsPanel.vue'
import SongsBookmarks from './SongsBookmarks.vue'
import RecentlyViewedSongs from './RecentlyViewedSongs.vue'
import SongSearchPanel from './SongSearchPanel.vue'
import SongsService from '../../services/SongsService'
export default {
  data () {
    return {
      songs: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  components: {
    SongsPanel,
    SongSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song{
    padding: 20px;
    height: 330px;
    overflow: hidden;
}
.song-title{
    font-size: 30px;
}
.song-artist{
    font-size: 24px;
}
.song-genre{
    font-size: 18px;
}
.album-image {
    width: 70%;
    margin: 0 auto;
}
</style>
