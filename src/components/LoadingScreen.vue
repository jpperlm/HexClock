<template>
  <div ref="loading" id="loading">
    <div ref="apptitle" id="apptitle" class="slowtransition">
      Linguisti
    </div>
    <div ref="appauthor" id="appauthor">
      <div id="intro-animation">
        <div id="intro-animation-text">
          <ul ref="text" class="text hidden">
            <li>P</li>
            <li class="ghost">
              E
            </li>
            <li class="ghost">
              R
            </li>
            <li class="ghost">
              L
            </li>
            <li class="ghost">
              M
            </li>
            <li class="ghost">
              A
            </li>
            <li class="ghost">
              N
            </li>
            <li class="ghost">
              &nbsp;
            </li>
            <li>L</li>
            <li class="ghost">
              A
            </li>
            <li class="ghost">
              B
            </li>
            <li class="ghost">
              S
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Splash',
  mounted () {
    this.playAnimation()
    // setTimeout(() => {
    // }, 3000)
  },
  methods: {
    playAnimation () {
      let domEelement = this.$refs.text
      let bg = this.$refs.loading
      setTimeout(() => {
        bg.classList.remove('secondary-color')
        // bg.classList.add('primary-color')
        this.$refs.apptitle.classList.add('secondary-color-text')
        this.$refs.apptitle.classList.add('black-text-shadow')

        domEelement.classList.add('secondary-color-text')
        domEelement.classList.add('black-text-shadow')

        domEelement.classList.remove('hidden')
        setTimeout(() => {
          this.$router.push({ name: 'Splash' })
        }, 2000)
      }, 1000)
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
#loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  transition: all 1s ease-in-out;
  z-index: 10000;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#apptitle {
  font-size: 3.8em;
  margin-bottom: 20px;
}
#appauthor {
  font-size: 1.6em;
}

.slowtransition {
  transition: all 1s ease-in-out;
}

ul.text {
  margin: 0;
  padding: 0;
}
.text {
  /* position: fixed;
  top: 50%;
  left: 50%; */
  /* transform: translateX(-50%) translateY(-50%); */
  list-style: none;
  border-bottom: 0;
}
.text.hidden li:not(.ghost) {
  border-bottom: 1px solid #fdfdfe;
}
.text li {
  float: left;
  /* font-weight: 700; */
  opacity: 1;
  transition: opacity 1s ease-in-out, max-width 2s ease-in-out,
    color 1s ease-in-out;
  max-width: 2em;
}
.text.hidden li.spaced {
  padding-left: 0;
}
.text li.spaced {
  padding-left: 0.5em;
}
.text.hidden li.ghost {
  opacity: 0;
  max-width: 0;
}
</style>
