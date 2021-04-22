<template>
  <div class="home">
    <div v-if="state === 'home'" class="flex-col">
        <button class="btn" @click="state = 'create'">Create Room</button>
        <button class="btn" @click="state = 'join'">Join Room</button>
    </div>
    <div v-else-if="state === 'create'" class="flex-col">
      <input type="text" placeholder="Nickname" v-model.trim="nickname">
      <button class="btn" @click="createRoom">Create</button>
      <button class="btn" @click="back">Back</button>
    </div>
    <div v-else-if="state === 'join'" class="flex-col">
      <input type="text" placeholder="Room ID" v-model.trim="room">
      <input type="text" placeholder="Nickname" v-model.trim="nickname">
      <button class="btn" @click="joinRoom">Join</button>
      <button class="btn" @click="back">Back</button>
    </div>
    <div>
      <small v-if="errorMsg">* {{errorMsg}}</small>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, defineComponent, inject, onBeforeUnmount} from 'vue'
import { useStore } from 'vuex'
// import  axios from 'axios'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()
    const socket : any = inject('socket')
    const nickname = ref('')
    const state = ref('home')
    const room = ref('')
    const errorMsg = ref('')


    onBeforeUnmount(() => {
      socket.offAny('newGameState')
      socket.offAny('existingGameState')
    })
    return {
      store,
      socket,
      nickname,
      state,
      room,
      errorMsg
    }
  },
  methods: {
    createRoom() {
      if (!this.nickname) {
        this.errorMsg = 'Nickname cannot be empty'
        return
      }
      this.socket.emit('newGame', this.nickname)
      this.socket.on('newGameState', (gameState : object) => {
        console.log(gameState)
        this.setStoreAndRedirect(gameState)
      })
    },
    joinRoom() {
      // room name format has to be color_adjective_animal
      if (!this.room || !this.room.match(new RegExp('^[a-zA-Z]+_[a-zA-Z]+_[a-zA-Z]+$', 'g'))) {
        this.errorMsg = 'Please enter a valid room ID'
      }
      else if (!this.nickname) {
        this.errorMsg = 'Nickname cannot be empty'
      } else {
        this.socket.emit('joinRoom', this.room)
        this.socket.on('existingGameState', (gameState : object) => {
          console.log(gameState)
          this.setStoreAndRedirect(gameState)
        })
      }
    },
    setStoreAndRedirect(data : any) {
      this.store.dispatch('addPlayers', data.players);
      this.store.dispatch('setNickname', this.nickname)
      this.store.dispatch('setGameState', data)
          .then(() => {
            this.$router.push({
              name: 'Game',
              params: {
                id: this.store.state.game.id
              }
            })
          })
    },
    back() {
      this.state = 'home'
      this.errorMsg = ''
      this.room = ''
      this.nickname = ''
    }
  }
})
</script>

<style scoped>
  .home {
    height: 100vh;
    /*background: linear-gradient(palevioletred, cornflowerblue);*/
    background: radial-gradient(rgba(255, 183, 0, 0.5) 10%, rgba(145, 2, 71, 0.63) 80%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .btn {
    padding: 10px 15px;
    margin: 5px;
    border: 1px solid royalblue;
    border-radius: 5px;
    background-color: royalblue;
    color: wheat;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }

  .btn:focus, input:focus {
    outline: none;
  }

  .btn:hover {
    background-color: dodgerblue;
    /*border-color: rosybrown;*/
  }

  input {
    height: 40px;
    margin: 10px 4px 10px 4px;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid royalblue;
    opacity: 0.6;
  }

  small {
    color: red;
  }
</style>
