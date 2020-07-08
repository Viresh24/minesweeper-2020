<template>
  <v-app>
    <v-content>
      <GameGrid/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import GameGrid from './components/GameGrid.vue'

export default Vue.extend({
  name: 'App',

  components: {
    GameGrid
  },

  data: () => ({
    //
  })
})
</script>
