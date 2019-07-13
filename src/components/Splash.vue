<template>
  <div id="main-container">
    <div v-if="off">
      <button @click="newMap"> Press To START</button>
    </div>
    <frame 
      v-else-if="tileMap.length"
      :tileMap="tileMap"
      @gameOver="off=true"
    />
  </div>
</template>

<script>
import { helpers } from '@/js/helper'
import Frame from '@/components/Frame.vue'
export default {
  name: 'Splash',
  mixins: [helpers],
  components: {
    frame: Frame,
  },
  mounted () { 
    this.characters = this.$store.state.languageStore.languageOptions.hiragana.alphabet;
    this.w = 4;
    this.h = 4;
    this.generateMap();
  },
  methods: {
    newMap(){
      this.generateMap();
      this.off = false;
    },
    generateMap() {
      let { board, solution } = 
        this.generator(this.generatorOptions);
      this.tileMap = board;
    }
  },
  computed: {
    generatorOptions() {
      return {
          w: this.w, 
          h: this.h, 
          characters: this.characters,
          numCharacters: 5,
          minSteps: 6,
          maxSteps: 12,
        }
    }
  },
  data () {
    return {
      off: false,
      tileMap:[],
      characters:[],
      w:2,
      h:2,
      // tileMap: [
      //   ['START',{key:1, displayText:'a'}, {key:4, displayText:'た'}, {key:3, displayText:'sa'}],
      //   [{key:2, displayText:'ka'},{key:3, displayText:'さ'},{key:4, displayText:'ta'},{key:5, displayText:'na'}],
      //   [{key:1, displayText:'あ'}, {key:2, displayText:'か'}, {key:5, displayText:'な'}, 'END']
      // ]
    }
  }
}
</script>

<style scoped>
#main-container {
  height: 100%;
  width: 100%;
}
</style>
