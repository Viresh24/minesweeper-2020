import { Commit, Dispatch } from 'vuex'

type Cell = number | 'X'

interface GridState {
    cellsData: Array<Cell>;
    pattern: Array<Array<Cell>> | null;
    size: number;
}

const state: GridState = {
  cellsData: [0, 0, 0, 0, 'X'], // 4:1
  pattern: null,
  size: 8
}

const actions = {
  async setPattern ({ state, commit, dispatch }:
    { state: GridState; commit: Commit; dispatch: Dispatch}) {
    const pattern = []
    const size = state.size

    for (let rowIdx = 0; rowIdx < size; rowIdx++) {
      const subPattern: Array<Cell> = await dispatch('setSubPattern',
        {
          rowIdx: rowIdx,
          pattern: pattern
        })
      pattern.push(subPattern)
    }

    commit('setPatternState', pattern)
  },
  async setSubPattern ({ state }: {state: GridState}, { rowIdx, pattern }: {rowIdx: number; pattern: Array<Array<Cell>>}) {
    const size = state.size
    const subPattern: Array<Cell> = []

    for (let colIdx = 0; colIdx < size; colIdx++) {
      // get random number
      const random = Math.floor(Math.random() * state.cellsData.length)
      let cell = state.cellsData[random]

      // change inserted cell value based on previous inserted value or vice versa
      // if previous cell value is 'X' or 'bomb', increment the inserted cell value
      // if inserted value is number and previous cell value is 'X', add previous cell value
      const prevCell = subPattern[colIdx - 1]
      if (prevCell) {
        if (typeof cell === 'string' && typeof prevCell === 'number') subPattern[colIdx - 1] = prevCell + 1
        if (typeof cell === 'number' && typeof prevCell === 'string') cell += 1
      }

      // same method, but for previous row
      if (rowIdx > 0) {
        const prevUpperLeft = pattern[rowIdx - 1][colIdx - 1]
        const prevUpperRight = pattern[rowIdx - 1][colIdx + 1]
        const prevUpperCenter = pattern[rowIdx - 1][colIdx]

        if (prevUpperLeft) {
          if (typeof cell === 'string') {
            if (typeof prevUpperLeft === 'number') {
              pattern[rowIdx - 1][colIdx - 1] = prevUpperLeft + 1
            } else pattern[rowIdx - 1][colIdx - 1] = prevUpperLeft
          } else if (typeof prevUpperLeft === 'string') { cell += 1 }
        }
        if (prevUpperRight) {
          if (typeof cell === 'string') {
            if (typeof prevUpperRight === 'number') {
              pattern[rowIdx - 1][colIdx + 1] = prevUpperRight + 1
            } else pattern[rowIdx - 1][colIdx + 1] = prevUpperRight
          } else if (typeof prevUpperRight === 'string') { cell += 1 }
        }
        if (prevUpperCenter) {
          if (typeof cell === 'string') {
            if (typeof prevUpperCenter === 'number') {
              pattern[rowIdx - 1][colIdx] = prevUpperCenter + 1
            } else pattern[rowIdx - 1][colIdx] = prevUpperCenter
          } else if (typeof prevUpperCenter === 'string') { cell += 1 }
        }
      }
      subPattern.push(cell)
    }
    return subPattern
  }
}

const mutations = {
  setPatternState (state: GridState, pattern: Array<Array<Cell>>) {
    state.pattern = pattern
  }
}

const getters = {
  getPattern (state: GridState) {
    return state.pattern
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
