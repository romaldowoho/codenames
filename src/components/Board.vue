<template>
  <div id="board">
    <Card v-for="card in cards" :key="card.value" :word="card.value" :team="card.type"/>
    <!--    <button @click="getWords">get</button>-->
  </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue'
import  Card from './Card.vue'
import axios from 'axios'

export default defineComponent({
  components: {
    Card
  },
  props: {
    word: String
  },
  data() {
    return {
      cards: []
    }
  },
  beforeCreate() {
    axios.get('http://localhost:3000/newgame')
         .then(res => {this.cards = res.data; console.log(res.data)})
         .catch(err => {console.log(err)});
  },
  setup () {

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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
</style>