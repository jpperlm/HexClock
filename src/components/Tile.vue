<template>
  <div 
    class="tile" 
    :class="{
      'player': isPlayer,
      'teleporting': isTeleporting,
      'victory': isVictory,
      'allow': allowMove
    }" 
    @click="$emit('clicked')"
  >
    <span ref="tileText">{{text}}</span>
  </div>
</template>

<script>
import { helpers } from '@/js/helper'

export default {
  name: 'Tile',
  components: {
  },
  mixins: [helpers],
  props: {
    backgroundStyle: {
      type: String,
      default: ''
    },
    allowMove: {
      type: Boolean
    },
    text: {
      type: String
    }
  },
  computed: {
    isPlayer() {
      return this.backgroundStyle === 'player'
    },
    isTeleporting() {
      return this.backgroundStyle === 'teleporting'
    },
    isVictory() {
      return this.backgroundStyle === 'victory'
    }
  },
  watch: {
  },
  beforeDestroy () {
  },
  mounted () {
    this.quick_fit(this.$refs.tileText, 3)
  },
  methods: {
  }
}
</script>

<style scoped>

.tile {
  flex-direction: column;
  justify-content: center;

  background: black;
  border: 1px solid white;
  cursor: not-allowed;
  transition: background 0.5s ease;
  color: white;
}

.player {
  background: red;
}

.teleporting {
  background: blue;
}

.victory {
  background: green;
}

.allow {
  /* border: 20px solid green; */
  /* background: orange; */
  cursor: pointer;
}

</style>
