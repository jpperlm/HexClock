<template>
  <div id="main-container">
    <div
      id="currentHexDiv"
      :class="currentHexDivClass"
      :style="getBackgroundColor(hex_clock[hex_clock.length - 1])"
    >
      <span class="hex-text"> #{{ hex_clock[hex_clock.length - 1] }} </span>
      <span class="hex-text">
        {{ getTime(hex_clock[hex_clock.length - 1]) }}
      </span>
    </div>
    <div v-if="additional_to_show" :style="bottomGridStyle" class="half-height">
      <div
        v-for="hex in hexWithoutLastItem"
        :key="hex"
        :style="getBackgroundColor(hex)"
        class="part"
      >
        <span class="hex-text-vert" v-if="additional_to_show < 20">
          #{{ hex }}
        </span>
      </div>
    </div>
    <div id="button-row">
      <button @click="decrement" v-if="additional_to_show > 0">
        show less
      </button>
      <span v-else></span>
      <button @click="clear" v-if="additional_to_show > 0">
        clear
      </button>
      <span v-else></span>
      <button @click="increment">
        show more
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  mixins: [],
  mounted() {
    this.setup();
    this.step();
  },
  watch: {
    additional_to_show(n, o) {
      this.setup();
    }
  },
  components: {},
  computed: {
    bottomGridStyle() {
      return `display:grid;grid-template-columns:repeat(${
        this.additional_to_show
      }, ${100 / this.additional_to_show}%)`;
    },
    currentHexDivClass() {
      return !this.additional_to_show ? 'full-size' : 'half-height';
    },
    hexWithoutLastItem() {
      return this.hex_clock.slice(0, this.hex_clock.length - 1);
    }
  },
  methods: {
    setup() {
      this.hex_clock = [];
      for (var i = 0; i >= -this.additional_to_show; i--) {
        this.hex_clock.unshift(this.getCurrentHexVal(i));
      }
    },
    getCurrentHexVal(offset = 0) {
      let midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      const time = Math.floor(Date.now() / 1000 - midnight / 1000) + offset;
      const hrs = ~~(time / 3600);
      const mins = ~~((time % 3600) / 60);
      const secs = ~~time % 60;
      return `${this.padStart(hrs, 2, '0')}${this.padStart(
        mins,
        2,
        '0'
      )}${this.padStart(secs, 2, '0')}`;
      // .toString()
      // .padStart(6, '0');
      return val;
    },
    padStart(str, n, v) {
      return str.toString().padStart(n, v.toString());
    },
    step() {
      let dt = Date.now() - this.expected_time;
      if (dt > this.interval) {
        // something really bad happened. Maybe the browser (tab) was inactive?
        // possibly special handling to avoid futile "catch up" run
      }
      const next_tick = this.getCurrentHexVal();
      if (next_tick !== this.hex_clock[this.additional_to_show]) {
        this.hex_clock.shift();
        this.hex_clock.push(next_tick);
      }

      this.expected_time += this.interval;
      setTimeout(this.step, Math.max(0, this.interval - dt)); // take into account drift
    },
    increment() {
      if (this.additional_to_show < 10) {
        this.additional_to_show++;
      } else {
        this.additional_to_show += 10;
      }
    },
    decrement() {
      if (this.additional_to_show > 10) {
        this.additional_to_show -= 10;
      } else if (this.additional_to_show > 0) {
        this.additional_to_show--;
      }
    },
    clear() {
      this.additional_to_show = 0;
    },
    getBackgroundColor(hex) {
      return `background-color: #${hex}`;
    },
    getTime(hex) {
      if (!hex) {
        return;
      }
      let hours = hex.substr(0, 2);
      let mins = hex.substr(2, 2);
      let seconds = hex.substr(4, 2);
      return `( ${hours}:${mins}:${seconds} )`;
    }
  },
  data() {
    return {
      hex_clock: [],
      additional_to_show: 0,
      expected_time: 0,
      interval: 300
    };
  }
};
</script>

<style scoped>
#main-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

#currentHexDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.full-size {
  height: 100%;
  width: 100%;
}
.half-height {
  height: 50%;
  width: 100%;
}
.part {
  /* width: 100%; */
  /* height: 100%; */
  border-right: 1px solid black;
  border-top: 1px solid black;
  overflow: hidden;
  /* border-bottom: 0.5px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.part:last-child {
  border-right: none;
}

.hex-text {
  color: white;
  font-size: 1.5em;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  letter-spacing: 1rem;
}

.hex-text-vert {
  color: white;
  font-size: 1rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  letter-spacing: 0.6rem;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

#button-row {
  position: absolute;
  top: 10px;
  left: 2.5vw;
  width: 95vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

button {
  width: 60px;
  background: linear-gradient(to bottom, #191f19 5%, #2b702b 100%);
  background-color: #191f19;
  border-radius: 28px;
  border: 1px solid #83b387;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  /* font-size:17px; */
  /* padding:16px 31px; */
  text-decoration: none;
  text-shadow: 0px 1px 0px #000000;
}

button:hover {
  background: linear-gradient(to bottom, #2b702b 5%, #191f19 100%);
  background-color: #2b702b;
}
</style>
