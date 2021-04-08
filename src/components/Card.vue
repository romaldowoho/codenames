<!--suppress TypeScriptCheckImport -->
<template>
  <div id="card" :style="{backgroundColor: color}">
    <div id="card-inner">
      <div id="word"> {{ word }} </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent  } from 'vue'

export default defineComponent({
  props: {
    word: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const teamColors : any = {
      red: '#dc143c',
      blue: '#4169e1',
      neutral: '#f4d8b5',
      assassin: '#000000'
    }
    return {
      teamColors,
      props
    }
  },
  computed: {
    color(): String {
      return this.teamColors[this.props.team];
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
  /*background-color: #f4d8b5;*/
  transition: background-color 2s;
}

#card-inner {
  width: 160px;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid #cbb296;
  background-color: #f4d8b5;
  color: black;
}

.blue {
  background-color: #4169e1;
}

.red {
  background-color: b;
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
  transition: background-color 0.5s;
}

#word:hover {
  cursor: pointer;
  background-color: lemonchiffon;
}

#word::selection {
  background: lightpink;
}

</style>