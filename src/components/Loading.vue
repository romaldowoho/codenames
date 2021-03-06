<template>
  <teleport to="body">
    <div>
      <!--
           When the loading animation fades in, the store is already set so the board is visible on the background,
           so this #load-background div covers the board until the animation is done
       -->
      <div id="load-background" v-if="loading"></div>

      <transition name="fade" mode="out-in" appear>
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
    </div>
  </teleport>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue'

interface ColorTile {
  value: string,
  on: boolean
}
export default defineComponent({
  name: "Loading",
  setup() {
    const loading = ref(true)
    const colors = ref([] as Array<ColorTile>)
    // so that tiles fade-in in spiral order. I know, I know, this is not 'scalable', but so much faster
    const fadeInOrder = [0,1,2,3,4,9,14,19,24,23,22,21,20,15,10,5,6,7,8,13,18,17,16,11,12]
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
      colors.value[fadeInOrder[index]].on = true
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
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /*background-color: blanchedalmond;*/
    background: radial-gradient(rgba(255, 183, 0, 0.85) 10%, rgba(145, 2, 71, 0.8) 80%);
    z-index: 1;
  }

  #load-background {
    position: absolute;
    background-color: cornsilk;
    z-index: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
    transition: background-color 0.8s;
  }

  .red {
    background-color: #ea0836;
    box-shadow: 0px 0px 2px 1px rgba(236, 207, 207, 0.41);
  }

  .red div {
    height: 8px;
    width: 8px;
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
    box-shadow: 0px 0px 2px 1px rgba(236, 207, 207, 0.41);
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
    transition: opacity .5s ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>