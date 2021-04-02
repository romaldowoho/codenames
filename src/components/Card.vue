<!--suppress TypeScriptCheckImport -->
<template>
  <div id="card">
    <div id="card-inner">
      <div id="word"> {{ msg }} </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    word: String
  },
  setup (props) {
    const msg = ref('hey hey');
    console.log(props);
    return {
      msg
    }
  }
}
</script>

<style scoped>
#card {
  width: 180px;
  height: 120px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4d8b5;
}

#card-inner {
  width: 160px;
  height: 100px;
  border-radius: 8px;
  border: 2px solid #cbb296;
  color: black;
}
</style>