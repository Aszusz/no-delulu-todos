import type { RootState } from './index'

export const selectTodos = (state: RootState) => state.todos

export const selectFilter = (state: RootState) => state.filter

export const selectFilteredTodos = (state: RootState) => {
  const { todos, filter } = state
  switch (filter) {
    case 'active':
      return todos.filter((t) => !t.done)
    case 'done':
      return todos.filter((t) => t.done)
    default:
      return todos
  }
}
