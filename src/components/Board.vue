<template>
  <div id="board">
    <Card v-for="card in cards" :key="card.value" :word="card.value" :team="card.type"/>
    <!--    <button @click="getWords">get</button>-->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import { useStore } from 'vuex'
import  Card from './Card.vue'
// import axios from 'axios'

export default defineComponent({
  components: {
    Card
  },
  setup () {
    const store = useStore()
    const cards = computed(() => store.state.game.cards)
    return {
      store,
      cards
    }
  },
  methods: {

  }
})
</script>

<style scoped>
  #board {
    height: 640px;
    width: 940px;
    margin: 0 auto;
    padding-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    #board {
      width: 360px;
      height: 300px;
    }
  }
</style>