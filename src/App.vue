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
  background: #1e250b;
  color: white;

  height: calc(100vh - 4vw);
  width: calc(100vw - 4vw);
  padding: 2vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.full {
  height: 100%;
  width: 100%;
}

.clickable {
  cursor: pointer;
}

.flex-row-c-fe {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col-c {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.half-width {
  width: 50%;
}
</style>
