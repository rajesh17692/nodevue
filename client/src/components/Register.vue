<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
        <panel title="Register">
            <form
                    name="node-vue-form"
                    autocomplete="off"
            >
                <v-text-field
                        label="Email"
                        v-model="email"
                ></v-text-field>
                <br>
                <v-text-field
                        type="password"
                        label="Password"
                        v-model="password"
                        autocomplete="new-password"
                ></v-text-field>
            </form>
            <br>
            <div class="danger-alert" v-html="error"/><br>
            <v-btn class="cyan" @click="register" dark>Register</v-btn>
        </panel>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      email: null,
      password: null,
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
