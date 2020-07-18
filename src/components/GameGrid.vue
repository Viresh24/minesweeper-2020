<template>
  <v-container>
    <v-row v-for="(row, row_idx) in getPattern" :key="row_idx" justify="center">
      <template v-for="(col, col_idx) in row">
        <v-hover v-slot:default="{ hover }" :key="col_idx">
          <v-col>
            <v-card
              :class="[{'on-hover': hover}, {'clicked': col_idx.show}, {'flagged': col_idx.flagged},
              'square-card', 'flex-center']"
              elevation="4"
              outlined
              @click.left.prevent="openCell({
                row: row_idx,
                col: col_idx
              })"
              @contextmenu.prevent="flagCell({
                row: row_idx,
                col: col_idx
              })"
            >
              <div v-if="col.flagged">
                <span class="font-weight-bold">F</span>
              </div>
              <div v-else-if="col.show">
                <span class="font-weight-bold">{{ col.data != 0 ? col.data : null }}</span>
              </div>
            </v-card>
          </v-col>
        </v-hover>
      </template>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .square-card {
    height: 2rem;
    width: 2rem;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .col {
    flex-grow: 0;
  }

  .on-hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.10) !important
  }

  .clicked {
    background-color: rgba(248, 213, 25, 0.10)
  }
</style>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default Vue.extend({
  methods: {
    ...mapActions({
      setPattern: 'gameGrid/setPattern',
      openCell: 'gameGrid/openCellData',
      floodFill: 'gameGrid/floodFill',
      flagCell: 'gameGrid/flagCell'
    })
  },
  created () {
    this.setPattern()
  },
  computed: {
    ...mapGetters({
      getPattern: 'gameGrid/getPattern'
    })
  }
})
</script>
