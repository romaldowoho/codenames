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
            <div v-for="player in red_team" :key="player.nickname">
              {{ player.nickname}}
            </div>
          </div>
          <div class="game-log"></div>
          <div class="team-card blue-team"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Loading  from "../components/Loading.vue";
import Board from "../components/Board.vue";
import {computed, defineComponent, inject, onBeforeUnmount} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  name: "Game.vue",
  components: {
    Loading,
    Board
  },
  setup() {
    const store = useStore()
    const socket : any = inject('socket')
    socket.on('playerJoin', (player : object) => {
      console.log(player)
      store.dispatch('addPlayer', player);
    })
    onBeforeUnmount(() => {
      socket.offAny('playerJoin')
    })
    return {
      socket,
      store,
      red_team: computed(() => store.state.game.red_team),
      blue_team: computed(() => store.state.game.blue_team)
    }
  },
  methods: {
    joinGame(team : string, role : string) {
      const player = {
        nickname: this.store.state.nickname,
        team,
        role
      }
      this.socket.emit('joinTeam', this.store.state.game.id, player);

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