<!--suppress TypeScriptCheckImport -->
<template>
  <div id="card">
    <div id="card-inner">
      <div id="word"> {{ word }} </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent  } from 'vue'

export default defineComponent({
  props: {
    word: String
  },
  setup () {
    const msg = ref('hey hey');
    return {
      msg
    }
  }
})
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
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid #cbb296;
  color: black;
}

#word {
  width: 80%;
  height: 25px;
  margin: 10px;
  vertical-align: center;
  line-height: 25px;
  border-radius: 5px;
  font-weight: bold;
  background-color: white;
}
</style>