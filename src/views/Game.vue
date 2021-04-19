<template>
    <div id="game">
        <Loading />
        <Board/>
        <div id="controls">
          <h1>Game controls</h1>
        </div>
        <div id="game-state">
          <div class="team-card red-team">
            <button @click="joinGame('red_team', 'operative')">Join as operative</button>
            <button>Join as spymaster</button>
          </div>
          <div class="game-log"></div>
          <div class="team-card blue-team"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Loading  from "../components/Loading.vue";
import Board from "../components/Board.vue";
import {defineComponent, inject} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "Game.vue",
  components: {
    Loading,
    Board
  },
  setup() {
    const socket : any = inject('socket')
    const store = useStore()
    return {
      socket,
      store
    }
  },
  methods: {
    joinGame(team : string, role : string) {
      this.socket.emit('join', team, role, this.store.state.nickname, this.store.state.game.id);
    }
  }
})
</script>

<style scoped>
  #game {
    /*padding: 0 10% 0 10%;*/
  }

  #game-state {
    width: 940px;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .team-card {
    height: 300px;
    width: 200px;
    border-radius: 5px;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.60);
  }

  .game-log {
    height: 300px;
    width: 300px;
    border: 1px solid gray;
    border-radius: 5px;
  }

  .red-team {
    background-color: rgba(206, 36, 72, 0.8);
  }

  .blue-team {
    background-color: rgba(47, 84, 193, 0.9);
  }
</style>