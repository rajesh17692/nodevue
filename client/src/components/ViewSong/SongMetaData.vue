<template>
    <panel title="Song MetaData">
        <v-layout>
            <v-flex xs6>
                <div class="song-title">
                    {{ song.title }}
                </div>
                <div class="song-artist">
                    {{ song.artist }}
                </div>
                <div class="song-genre">
                    {{ song.genre }}
                </div>
                <v-btn :to="{name: 'song-edit', params () { return {songId: song.id} }}" class="cyan" dark>
                    Edit
                </v-btn>
                <v-btn class="cyan" dark @click="setAsBookmark"
                    v-if="isUserLoggedIn && !bookmark">
                    Set As Bookmark
                </v-btn>
                <v-btn class="cyan" dark @click="unsetAsBookmark"
                    v-if="isUserLoggedIn  && bookmark">
                    Unset Bookmark
                </v-btn>
            </v-flex>
            <v-flex xs6>
                <img class="album-image" :src="song.albumImageUrl"><br>
                {{ song.album }}
            </v-flex>
        </v-layout>
    </panel>
</template>
<script>
  import {mapState} from 'vuex'
  import BookmarksService from '../../services/BookmarksService'
  export default {
    props: ['song'],
    data () {
      return {
        bookmark: null
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user'
      ])
    },
    watch: {
      async song () {
        if (!this.isUserLoggedIn) {
          return
        }

        try {
          const bookmarks = (await BookmarksService.index({
            songId: this.song.id
          })).data
          if (bookmarks.length) {
            this.bookmark = bookmarks[0]
          }
        } catch (err) {
          console.log(err)
        }
        console.log('bookmarks', this.bookmark)
      }
    },
    methods: {
      async setAsBookmark () {
        try {
          this.bookmark = (await BookmarksService.post({
            SongId: this.song.id,
            UserId: this.user.id
          })).data
        } catch (err) {
          console.log(err)
        }
        console.log('bookmark')
      },
      async unsetAsBookmark () {
        try {
          await BookmarksService.delete(this.bookmark.bookmarkId)
          this.bookmark = null
        } catch (err) {
          console.log(err)
        }
        console.log('unbookmark')
      }
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
