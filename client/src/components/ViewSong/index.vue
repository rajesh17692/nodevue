<template>
    <div>
    <v-layout>
        <v-flex xs6>
            <song-meta-data :song="song"></song-meta-data>
        </v-flex>
        <v-flex xs6 class="ml-2">
            <you-tube :youtubeId="song.youtubeId"/>
        </v-flex>
        </v-layout>
        <v-layout class="mt-2">
            <v-flex xs6>
                <tabs :song="song"/>
            </v-flex>
            <v-flex xs6 class="ml-2">
                <lyrics :song="song"/>
            </v-flex>
    </v-layout>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import SongMetaData from './SongMetaData.vue'
import YouTube from './YouTube.vue'
import Lyrics from './Lyrics.vue'
import Tabs from './Tabs.vue'
import SongsService from '../../services/SongsService'
import SongHistoryService from '../../services/SongHistoryService'
export default {
  data () {
    return {
      song: {}
    }
  },
  components: {
    SongMetaData,
    YouTube,
    Lyrics,
    Tabs
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  async mounted () {
    const songId = this.route.params.songId
    this.song = (await SongsService.show(songId)).data

    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        SongId: songId
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
