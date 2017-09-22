<template>
  <div>
    <h1>Register</h1>
    <input type="email" name="email" placeholder="Email" v-model="email"><br>
    <input type="password" name="password" placeholder="Password" v-model="password"><br>
    <button @click="register">Register</button>
  </div>
</template>
<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      email: 'abc',
      password: '111111'
    }
  },
  methods: {
    async register () {
      await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
