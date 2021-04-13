<template>
  <div class="home">
    <pre>{{nickname}}</pre>
    <div v-if="state === 'home'" class="flex-col">
        <button class="btn" @click="state = 'create'">Create Room</button>
        <button class="btn" @click="state = 'join'">Join Room</button>
    </div>
    <div v-else-if="state === 'create'" class="flex-col">
      <input type="text" placeholder="Nickname" v-model="nickname">
      <button class="btn" @click="createRoom()">Create</button>
      <button class="btn" @click="back()">Back</button>
    </div>
    <div v-else-if="state === 'join'" class="flex-col">
      <input type="text" placeholder="Room ID" v-model="room">
      <input type="text" placeholder="Nickname" v-model="nickname">
      <button class="btn" @click="joinRoom()">Join</button>
      <button class="btn" @click="back()">Back</button>
    </div>
    <div>
      <small v-if="errorMsg">* {{errorMsg}}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent  } from 'vue'
import  axios from 'axios'
// import  io from 'socket.io-client'

export default defineComponent({
  name: 'Home',
  setup() {
    const nickname = ref('')
    const state = ref('home')
    const room = ref('')
    const errorMsg = ref('')
    return {
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
      axios.post('http://localhost:3000/newgame', {nickname: this.nickname})
           .then(res => {
             this.$router.push({
               name: 'Game',
               params: {
                 id: res.data
               }
             })
           });
    },
    joinRoom() {
      // room name format has to be color_adjective_animal
      if (!this.room || !this.room.match(new RegExp('^[a-zA-Z]+_[a-zA-Z]+_[a-zA-Z]+$', 'g'))) {
        this.errorMsg = 'Please enter a valid room ID'
      }
      else if (!this.nickname) {
        this.errorMsg = 'Nickname cannot be empty'
      }
    },
    back() {
      this.state = 'home'
      this.errorMsg = ''
      this.room = ''
    }
  }
})
</script>

<style scoped>
  .home {
    height: 100vh;
    background: linear-gradient(palevioletred, cornflowerblue);
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
