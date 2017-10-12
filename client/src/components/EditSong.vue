<template>
    <v-layout >
        <v-flex xs4>
            <panel title="Song Metadata">
                <v-text-field
                        label="Title"
                        required
                        :rules="[required]"
                        v-model="song.title"
                ></v-text-field>

                <v-text-field
                        label="Artist"
                        required
                        :rules="[required]"
                        v-model="song.artist"
                ></v-text-field>

                <v-text-field
                        label="Genre"
                        required
                        :rules="[required]"
                        v-model="song.genre"
                ></v-text-field>

                <v-text-field
                        label="Album"
                        required
                        :rules="[required]"
                        v-model="song.album"
                ></v-text-field>

                <v-text-field
                        label="Album Image Url"
                        required
                        :rules="[required]"
                        v-model="song.albumImageUrl"
                ></v-text-field>

                <v-text-field
                        label="YouTube ID"
                        required
                        :rules="[required]"
                        v-model="song.youtubeId"
                ></v-text-field>
            </panel>
        </v-flex>
        <v-flex xs8>
            <panel title="Song Structure" class="ml-2">
                <v-text-field
                        label="Tab"
                        multi-line
                        required
                        :rules="[required]"
                        v-model="song.tab"
                ></v-text-field>

                <v-text-field
                        label="Lyrics"
                        multi-line
                        required
                        :rules="[required]"
                        v-model= "song.lyrics"
                ></v-text-field>
            </panel>
            <div class="danger-alert" v-if="error">{{ error }}</div>
            <v-btn class="cyan" @click="save" dark>Save Song</v-btn>
        </v-flex>
    </v-layout>
</template>
<script>
import SongsService from '../services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    // Api Call
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldsField = Object
        .keys(this.song)
        .every(key => !!this.song[key])

      if (!areAllFieldsField) {
        this.error = 'Please Fill all required fields.'
        return
      }

      const songId = this.$store.state.route.params.songId
      try {
        await SongsService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
