<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  text-align: center;
  color: #2c3e50;
  background: radial-gradient(rgba(255, 183, 0, 0.6) 10%, rgba(145, 2, 71, 0.63) 80%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
