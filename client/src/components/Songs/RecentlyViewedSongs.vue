<template>
    <panel title="Recently Viewed Songs">
        <v-data-table
                :headers="headers"
                :pagination.sync="pagination"
                :items="historys">
            <template
                    slot="items"
                    scope="props">
                <td class="text-xs-right">
                    {{ props.item.title }}
                </td>
                <td class="text-xs-right">
                    {{ props.item.artist }}
                </td>
            </template>
        </v-data-table>
    </panel>
</template>
<script>
  import {mapState} from 'vuex'
  import SongHistoryService from '../../services/SongHistoryService'
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Title',
            value: 'title'
          },
          {
            text: 'Artist',
            value: 'artist'
          }
        ],
        historys: [],
        pagination: {
          sortBy: 'createdAt',
          descending: true
        }
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user'
      ])
    },
    async mounted () {
      if (this.isUserLoggedIn) {
        this.historys = (await SongHistoryService.index()).data
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
