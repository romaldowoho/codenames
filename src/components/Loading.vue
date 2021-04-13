<template>
  <transition name="fade">
    <div id="wrapper" v-if="loading">
      <div id="card">
        <div id="inner-dark">
          <div v-for="(card, index) in 25" :key="card" :class="[colors[index].on ? colors[index].value : '','color']">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'

export default defineComponent({
  name: "Loading",
  setup() {
    const loading = ref(true)
    const colors = ref([] as object[])
    colors.value.push(... new Array(9).fill(null).map(() => ({value: 'red', on: false})),
                      ... new Array(8).fill(null).map(() => ({value: 'blue', on: false})),
                      ... new Array(7).fill(null).map(() => ({value: 'neutral', on: false})),
                      {value: 'black', on: false});

    // a function to mark squares as visible at random intervals (200ms - 600ms)
    const load = (index : number) : void => {
      if (index >= colors.value.length) {
        setTimeout(() => {loading.value = false}, 1000)
        return
      }
      colors.value[index].on = true
      setTimeout(() => load(++index), Math.max(Math.round(Math.random() * 600), 200))
    }

    const shuffleColors = () : void => {
      for (let i = colors.value.length - 1; i > 0; i--) {
        let idx = Math.floor(Math.random() * (i + 1));
        [colors.value[i], colors.value[idx]] = [colors.value[idx], colors.value[i]]
      }
    }

    shuffleColors()
    load(0)

    return {
      colors,
      shuffleColors,
      load,
      loading
    }
  }

})
</script>

<style scoped>
  #wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blanchedalmond;
  }
  #card {
    background-image: url("../assets/CodenamesCard.svg");
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  #inner-dark {
    width: 130px;
    height: 130px;
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    background-color: rgba(0, 0, 0, 0.96);
    border: 2px solid #664A29;
    border-radius: 8px;
  }

  .color {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
    border-radius: 3px;
    transition: background-color 1s;
  }

  .red {
    background-color: #ea0836;
    box-shadow: 0px 0px 2px 1px rgba(236, 207, 207, 0.41);
  }

  .red div {
    height: 7px;
    width: 7px;
    border-radius: 3px;
    border: 1px solid rgba(223, 226, 227, 0.81);
    box-shadow: 0px 0px 3px 1px rgba(223, 226, 227, 0.81);
    transform: rotate(45deg);
    transition: border 2s;
  }

  .blue {
    background-color: mediumblue;
    box-shadow: 0px 0px 2px 1px rgba(236, 207, 207, 0.41);
  }

  .blue div {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    border: 1px solid rgba(223, 226, 227, 0.81);
    box-shadow: 0px 0px 3px 1px rgba(240, 248, 255, 0.63);
  }

  .neutral {
    background-color: #f4d8b5;
  }

  .black {
    background: black;
    box-shadow: 0px 0px 2px 1px rgba(236, 207, 207, 0.41);
  }

  .black div {
    height: 2px;
    width: 15px;
    border-radius: 1px;
    background-color: rgba(255, 255, 255, 0.50);
    transform: rotate(45deg);
  }
  .black div::before {
    content: "";
    display: block;
    height: 2px;
    width: 15px;
    border-radius: 1px;
    background-color: rgba(255, 255, 255, 0.50);
    transform: rotate(-90deg);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>