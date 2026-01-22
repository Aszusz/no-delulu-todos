import type { RootState } from './index'
import type { FilterType, Todo } from './state'

export const selectTodos = (state: RootState): Todo[] => state.app.todos

export const selectFilter = (state: RootState): FilterType => state.app.filter

export const selectDeleteConfirmation = (state: RootState): string | null =>
  state.app.deleteConfirmation

export const selectFilteredTodos = (state: RootState): Todo[] => {
  const todos = selectTodos(state)
  const filter = selectFilter(state)

  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.done)
    case 'done':
      return todos.filter((todo) => todo.done)
    case 'all':
      return todos
  }
}
