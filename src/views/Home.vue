<template>
  <div id="main-container">
    <div
      id="currentHexDiv"
      :class="currentHexDivClass"
      :style="getBackgroundColor(hex_clock[hex_clock.length - 1])"
    >
      <span class="hex-text"> #{{ hex_clock[hex_clock.length - 1] }} </span>
    </div>
    <div v-if="additional_to_show" :style="bottomGridStyle" class="half-height">
      <div
        v-for="hex in hex_without_last"
        :key="hex"
        :style="getBackgroundColor(hex)"
        class="part"
      >
        <span class="hex-text-vert"> #{{ hex }} </span>
      </div>
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
    hex_without_last() {
      return this.hex_clock.slice(0, this.hex_clock.length - 1);
    }
  },
  methods: {
    setup() {
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
      return `${this.padStart(hrs, 2, '0')}${this.padStart(mins, 2, '0')}${this.padStart(
        secs,
        2,
        '0'
      )}`;
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
    getBackgroundColor(hex) {
      return `background-color: #${hex}`;
    }
  },
  data() {
    return {
      hex_clock: [],
      additional_to_show: 9,
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
  flex-direction: row;
  justify-content: center;
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
</style>
