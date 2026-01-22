import type { RootState } from '.'

export const selectTodos = (state: RootState) => state.game.todos

export const selectPendingDeleteId = (state: RootState) =>
  state.game.pendingDeleteId

export const selectFilter = (state: RootState) => state.game.filter

export const selectFilteredTodos = (state: RootState) => {
  const todos = state.game.todos
  const filter = state.game.filter

  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.done)
    case 'done':
      return todos.filter((todo) => todo.done)
    case 'all':
    default:
      return todos
  }
}
