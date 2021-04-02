<template>
  <div id="board">
    <Card v-for="word in words" :key="word" :word="word"/>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent  } from 'vue'
import  Card from './Card.vue'

export default defineComponent({
  components: {
    Card
  },
  props: {
    word: String
  },
  setup () {
    const msg = ref('hey hey')
    const words = ref(['coffee', 'arabica', 'espresso'])
    return {
      msg,
      words
    }
  }
})
</script>

<style scoped>
  #board {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>