<template>
  <div id="main-container">
    <template v-if="off">
      <instructions/>
      <button class="start-btn" @click="newMap"> Press To START</button>
      <div class="settings-toggle">
        <span class="clickable" @click="showSettings = !showSettings"> Settings </span>
      </div>
      <div class="settings" v-if="showSettings">
        <div class="setting">
          <div class="settings-left">
           <div class="flex-row spacing">
              <div class="half-width">
                <NumberInputSpinner
                  :min="2"
                  :max="10"
                  :step="1"
                  :integerOnly="true"
                  v-model="w"
                />
              </div>
              <div class="half-width settings-label"> Blocks Wide </div>
            </div>
            <div class="flex-row spacing">
              <div class="half-width">
                <NumberInputSpinner
                  :min="2"
                  :max="10"
                  :step="1"
                  :integerOnly="true"
                  v-model="h"
                />
              </div>
              <div class="half-width settings-label"> Blocks High </div>
            </div>
          </div>
          <div class="settings-right">
            <span class="error" v-if="!isEven"> The grid must contain an even number of tiles. Currently it contains {{ w * h }} tiles. </span>
          </div>
        </div>
        <div class="setting">
          <div class="settings-left">
           <div class="flex-row spacing">
              <div class="half-width">
                <NumberInputSpinner
                  :min="2"
                  :max="50"
                  :step="1"
                  :integerOnly="true"
                  v-model="numCharacters"
                />
              </div>
              <div class="half-width settings-label"> Characters </div>
            </div>
          </div>
          <div class="settings-right">
          </div>
        </div>
      </div>
    </template>
    <frame 
      v-else-if="tileMap.length"
      :tileMap="tileMap"
      :solution="solution"
      @gameOver="off=true"
    />
  </div>
</template>

<script>
import { helpers } from '@/js/helper'
import Frame from '@/components/Frame.vue'
import Instructions from '@/components/Instructions.vue'

import NumberInputSpinner from 'vue-number-input-spinner'

export default {
  name: 'Splash',
  mixins: [helpers],
  components: {
    frame: Frame,
    instructions: Instructions,
    NumberInputSpinner,
  },
  mounted () { 
    this.characters = this.$store.state.languageStore.languageOptions.hiragana.alphabet;
  },
  methods: {
    newMap(){
      if (!this.isEven) return;
      this.generateMap();
      this.off = false;
    },
    generateMap() {
      let { board, solution } = 
        this.generator(this.generatorOptions);
      this.tileMap = board;
      this.solution = solution;
    }
  },
  computed: {
    isEven() {
      return (( this.w * this.h ) % 2) === 0
    },
    generatorOptions() {
      return {
          w: this.w, 
          h: this.h, 
          characters: this.characters,
          numCharacters: this.numCharacters,
          minSteps: 3,
          maxSteps: 8,
        }
    }
  },
  data () {
    return {
      off: true,
      showSettings: false,
      tileMap:[],
      solution:[],
      characters:[],
      numCharacters:7,
      w:5,
      h:4,
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
.settings {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 500px;
  margin: auto;
}
.setting {
  display: grid;
  width: 100%;
  grid-template-columns: 2fr 1fr;
}
.settings-left {
  display: flex;
  flex-direction: column;
}
.small-input {
  width: 30px;
}
.num-label {
  width: 100px;
}
.settings-label {
  font-size: 1.3em;
  margin: auto;
}
.spacing {
  margin-bottom: 8px;
}

.error {
  color: red;
  font-size: .9em;
}

.start-btn {
	-moz-box-shadow:inset 0px 1px 0px 0px #d9fbbe;
	-webkit-box-shadow:inset 0px 1px 0px 0px #d9fbbe;
	box-shadow:inset 0px 1px 0px 0px #d9fbbe;
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #b8e356), color-stop(1, #6a9905));
	background:-moz-linear-gradient(top, #b8e356 5%, #6a9905 100%);
	background:-webkit-linear-gradient(top, #b8e356 5%, #6a9905 100%);
	background:-o-linear-gradient(top, #b8e356 5%, #6a9905 100%);
	background:-ms-linear-gradient(top, #b8e356 5%, #6a9905 100%);
	background:linear-gradient(to bottom, #b8e356 5%, #6a9905 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#b8e356', endColorstr='#6a9905',GradientType=0);
	background-color:#b8e356;
	-moz-border-radius:6px;
	-webkit-border-radius:6px;
	border-radius:6px;
	border:1px solid #83c41a;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:18px;
	font-weight:bold;
	padding:12px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #86ae47;

  margin-bottom: 3vh;
}
.start-btn:hover {
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #6a9905), color-stop(1, #b8e356));
	background:-moz-linear-gradient(top, #6a9905 5%, #b8e356 100%);
	background:-webkit-linear-gradient(top, #6a9905 5%, #b8e356 100%);
	background:-o-linear-gradient(top, #6a9905 5%, #b8e356 100%);
	background:-ms-linear-gradient(top, #6a9905 5%, #b8e356 100%);
	background:linear-gradient(to bottom, #6a9905 5%, #b8e356 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#6a9905', endColorstr='#b8e356',GradientType=0);
	background-color:#6a9905;
}
.start-btn:active {
	position:relative;
	top:1px;
}

</style>
