import type { RootState } from './index'
import type { Todo, Filter } from './state'

export const selectTodos = (state: RootState): Todo[] => state.game.todos

export const selectFilter = (state: RootState): Filter => state.game.filter

export const selectPendingDeleteId = (state: RootState): string | null =>
  state.game.pendingDeleteId

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

export const selectTodoById = (
  state: RootState,
  id: string
): Todo | undefined => state.game.todos.find((todo) => todo.id === id)

export const selectPendingDeleteTodo = (state: RootState): Todo | undefined => {
  const id = selectPendingDeleteId(state)
  return id ? selectTodoById(state, id) : undefined
}
