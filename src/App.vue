<template>
  <v-app>
    <v-main>
      <GameGrid/>
    </v-main>
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
