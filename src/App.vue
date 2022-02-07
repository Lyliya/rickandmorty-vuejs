<template>
  <router-view />
</template>

<script>
export default {};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  color: #e2e2e2;
  background-color: #202020;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
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
