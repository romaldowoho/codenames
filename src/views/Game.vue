<template>
    <div>
      <teleport to="body">
            <Loading />
      </teleport>
    </div>
</template>

<script>
import Loading  from "../components/Loading";
export default {
  name: "Game.vue",
  components: {
    Loading
  }
}
</script>

<style scoped>

</style>