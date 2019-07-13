<template>
  <div
    v-if="loaded" 
    id="frame" 
    ref="frame" 
    class="full" 
    :style="frameStyle">
    <tile 
      v-for="index in totalTiles"
      :backgroundStyle="getBackgroundStyle(index-1)"
      :text="getText(index-1)"
      :key="index-1"
      :allowMove="isMoveAllowed(index-1)"
      @clicked="moveWrapper(index-1)"
    />
  </div>
</template>

<script>
import { helpers } from '@/js/helper'

import Tile from '@/components/Tile.vue'

export default {
  name: 'Frame',
  components: {
    tile: Tile
  },
  mixins: [helpers],
  props: {
    tileMap: {
      type: Array
    },
  },
  methods: {
    getBackgroundStyle(index) {
      if (this.victory && index === this.endIndex) return 'victory';
      if (index === this.playerLocationIndex) return 'player';
      if (index === this.jumpIndex) return 'teleporting';
    },
    getText(index) {
      if (index === this.startIndex) return 'Start';
      if (index === this.endIndex) return 'Finish';

      const tile = this.flatTileMap[index];
      if ( tile === 0 || tile === '') return '';
      return tile.displayText;
    },
    moveWrapper(index) {
      if (this.disableMove) return;
      if (this.isMoveAllowed(index)) {
        this.disableMove = true;
        this.moveTo(index)
      }
    },
    isMoveAllowed(index) {
      return this.legalMoves.includes(index)
    },
    moveTo(index) {
      this.playerLocationIndex = index;
      if (this.victory) {
        console.log('win');
        setTimeout(() => {
          this.$emit('gameOver')
        }, 1000);
      } else if (this.currentTile === 0 || this.currentTile === '' || index === this.startIndex) {
        return this.enableMove();
      } else if (typeof this.currentTile === 'object') {
        const key = this.currentTile.key;
        const newInd = this.flatTileMap
          .findIndex((t, i) => {
            return (t.key === key) && (i !== index)
          })
        setTimeout(() => {
          this.jumpIndex = newInd;
          setTimeout(() => {
            this.playerLocationIndex = newInd;
            this.jumpIndex = undefined;
            setTimeout(() => {
              this.enableMove();
            }, 200);
          }, 400);
         
        }, 200);
      }
    },
    keyPressed(e) {
      if (!e.key) return;
      if (this.disableMove) return;
      switch (e.key) {
        case 'ArrowRight':
          this.moveWrapper(this.playerLocationIndex + 1)
          break;
        case 'ArrowLeft':
          this.moveWrapper(this.playerLocationIndex - 1)
          break;
        case 'ArrowUp':
          this.moveWrapper(this.playerLocationIndex - this.tWidth)
          break;
        case 'ArrowDown':
          this.moveWrapper(this.playerLocationIndex + this.tWidth)
          break;
      }
    },
    enableMove() {
      this.disableMove = false;
    },
    addKeyboardListener() {
      document.addEventListener('keydown', this.keyPressed);
    },
    removeKeyboardListener() {
      document.removeEventListener('keydown', this.keyPressed);
    }
  },
  data () {
    return {
      jumpIndex: undefined,
      playerLocationIndex: undefined,
      disableMove: false,
    }
  },
  computed: {
    tWidth() {
      return this.tileMap ? this.tileMap[0].length : 0
    },
    tHeight() {
      return this.tileMap ? this.tileMap.length : 0
    },
    totalTiles() {
      return this.tWidth * this.tHeight
    },
    flatTileMap() {
      return this.tileMap.flat()
    },
    loaded() {
      return this.totalTiles > 0
    },
    frameStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.tWidth}, 1fr)`,
        gridTemplateRows: `repeat(${this.tHeight}, 1fr)`
      }
    },
    startIndex() {
      return this.tileMap.flat().indexOf('START')
    },
    endIndex() {
      return this.tileMap.flat().indexOf('END')
    },
    legalMoves() {
      if (this.jumpIndex) return [];
      const i = this.playerLocationIndex;
      if (typeof i === 'undefined') return [];
      return this.movesForPosition(i, this.tWidth, this.totalTiles)
    },
    victory() {
      return this.playerLocationIndex === this.endIndex 
    },
    currentTile() {
      return this.flatTileMap[this.playerLocationIndex]
    },
  },
  watch: {
  },
  mounted () {
    this.playerLocationIndex = this.startIndex
    this.removeKeyboardListener()
    this.addKeyboardListener()
  },
  beforeDestroy () {
    this.removeKeyboardListener()
  },

}
</script>

<style scoped>
</style>
