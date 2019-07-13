<template>
  <div class="instructions">
    <h1>Instructions</h1>
    <div>Move the dark square using the keyboard or by clicking on a neighboring tile.</div>
    <div>You can only move to tiles immediately touching the four sides of the current tile.</div>
    <div>Entering a tile with a letter will shift you to the corresponding translation.</div>
  </div>
</template>

<script>

export default {
  name: 'Instructions',
  components: {
  },
  props: {
  },
  computed: {
  },
  watch: {
  },
  beforeDestroy () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
.instructions {
  max-width: 900px;
  margin: auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
}


</style>
