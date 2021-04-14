<template>
    <div>
        <teleport to="body">
          <Loading />
        </teleport>
        <Board/>
    </div>
</template>

<script>
import Loading  from "../components/Loading";
import Board from "@/components/Board";
export default {
  name: "Game.vue",
  components: {
    Loading,
    Board
  }
}
</script>

<style scoped>

</style>