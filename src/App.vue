<template>
  <div id="app" class="white-text gradient">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.full {
  height: 100%;
  width: 100%;
}
</style>
