<template>
  <div id="app">
    <div v-if="isAuthenticated">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <a href="#" @click.prevent="logout">logout</a>
      </div>
    </div>

    <div v-else>
      <router-link to="/login">login</router-link>
    </div>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function(){
    return{
      isAuthenticated: this.$session.has('jwt')
    } 
  },
  methods: {
    logout: function(){
      this.$session.destroy()
      this.$router.push('/login')
    }
  },
  updated: function(){
    this.isAuthenticated = this.$session.has('jwt')
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
