import type { RootState } from './index'
import type { FilterType, Todo } from './state'

export const selectTodos = (state: RootState): Todo[] => state.game.todos

export const selectFilter = (state: RootState): FilterType => state.game.filter

export const selectDeleteConfirmation = (state: RootState): string | null =>
  state.game.deleteConfirmation

export const selectFilteredTodos = (state: RootState): Todo[] => {
  const todos = selectTodos(state)
  const filter = selectFilter(state)

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
