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
    <div id="movesContainer" class="movesRemaining">
      <span>{{isCurrent ? movesRemaining : ''}}</span>
    </div>
    <div class="main-text flex-col-c">
      <div>
        <span ref="tileText">{{text}}</span>
      </div>
    </div>
    <!-- <div v-if="!isCurrent" class="movesRemaining">
    </div> -->
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
    isCurrent: {
      type: Boolean
    },
    movesRemaining: {
      type: Number
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
    const element = this.$refs.tileText;
    const container = element.closest('.main-text');
    const max = 3;
    this.quick_fit({element, container, max})
  },
  methods: {
  }
}
</script>

<style scoped>

.tile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  cursor: pointer;
}

.movesRemaining{
  position:fixed;
}

.main-text{
  flex: 1;
}

</style>
