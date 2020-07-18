import { Commit, Dispatch } from 'vuex'

type CellData = number | 'X'
type Cell = { data: CellData; show: boolean }

interface GridState {
    cellsData: Array<CellData>;
    pattern: Array<Array<Cell>>;
    size: number;
}

const state: GridState = {
  cellsData: [0, 0, 0, 0, 'X'], // 4:1
  pattern: [],
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
  async setSubPattern ({ state }: {state: GridState},
    { rowIdx, pattern }: {rowIdx: number; pattern: Array<Array<Cell>>}) {
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
      if (colIdx > 0) {
        if (cell === 'X' && typeof prevCell.data === 'number') subPattern[colIdx - 1].data = prevCell.data + 1
        if (typeof cell === 'number' && prevCell.data === 'X') cell += 1
      }

      // same method, but for previous row
      if (rowIdx > 0) {
        const prevUpperLeft = pattern[rowIdx - 1][colIdx - 1]
        const prevUpperRight = pattern[rowIdx - 1][colIdx + 1]
        const prevUpperCenter = pattern[rowIdx - 1][colIdx]

        // upper left box
        if (prevUpperLeft) {
          if (cell === 'X') {
            if (typeof prevUpperLeft.data === 'number') {
              pattern[rowIdx - 1][colIdx - 1].data = prevUpperLeft.data + 1
            }
          } else if (prevUpperLeft.data === 'X') { cell += 1 }
        }
        // upper center box
        if (prevUpperCenter) {
          if (cell === 'X') {
            if (typeof prevUpperCenter.data === 'number') {
              pattern[rowIdx - 1][colIdx].data = prevUpperCenter.data + 1
            }
          } else if (prevUpperCenter.data === 'X') { cell += 1 }
        }
        // upper right box
        if (prevUpperRight) {
          if (cell === 'X') {
            if (typeof prevUpperRight.data === 'number') {
              pattern[rowIdx - 1][colIdx + 1].data = prevUpperRight.data + 1
            }
          } else if (prevUpperRight.data === 'X') { cell += 1 }
        }
      }
      subPattern.push({
        data: cell,
        show: false
      })
    }
    return subPattern
  },
  openCellData ({ state, commit, dispatch }: { state: GridState; commit: Commit; dispatch: Dispatch },
    { row, col }: {row: number; col: number}) {
    const pattern = state.pattern
    if (!pattern[row] || !pattern[row][col]) return

    const cell = pattern[row][col]

    if (cell.data === 0) {
      if (cell.show) return
      dispatch('floodFill', {
        cell: cell,
        row: row,
        col: col
      })
    }

    commit('setCellDataShow', cell)
  },
  floodFill ({ dispatch, commit }: { dispatch: Dispatch; commit: Commit },
    { cell, row, col }: { cell: CellData; row: number; col: number }) {
    commit('setCellDataShow', cell)
    dispatch('openCellData', { row: row, col: col + 1 })
    dispatch('openCellData', { row: row, col: col - 1 })
    dispatch('openCellData', { row: row + 1, col: col })
    dispatch('openCellData', { row: row - 1, col: col })
  }
}

const mutations = {
  setPatternState (state: GridState, pattern: Array<Array<Cell>>) {
    state.pattern = pattern
  },
  setCellDataShow (_: GridState, cell: Cell) {
    cell.show = true
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
