import type { RootState } from '.'

export const selectTodos = (state: RootState) => state.game.todos

export const selectPendingDeleteId = (state: RootState) =>
  state.game.pendingDeleteId
