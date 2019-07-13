<template>
  <div 
    class="tile" 
    :class="{
      'player': isPlayer,
      'teleporting': isTeleporting,
      'victory': isVictory,
      'start': isStart,
      'end': isEnd,
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
    },
    isStart() {
      return this.text === 'Start'
    },
    isEnd() {
      return this.text === 'Finish'
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

  background: #401616;
  border: 1px solid black;
  cursor: not-allowed;
  transition: background 0.5s ease;
  color: #83c41a;
}

.player {
  background: #1e250b;
}

.teleporting {
  background: #b75a0b;
}

.victory {
  background: #11d620;
  color: #1e250b;
}

.start {
  color: #00dcff;
}

.end {
  color: #00dcff;
}

.allow {
  /* border: 20px solid green; */
  /* background: orange; */
  cursor: pointer;
}

</style>
