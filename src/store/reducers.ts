import { match } from 'disc-union'
import type { AppState } from './state'
import { initialState } from './state'
import type { AppAction } from './actions'

export function reducer(
  state: AppState = initialState,
  action: AppAction
): AppState {
  return match(
    action,
    {
      'app/started': () => state,

      // Effect action - add the fully formed todo
      'eff/todoAdded': ({ todo }) => ({
        ...state,
        todos: [...state.todos, todo],
      }),

      // Toggle todo status
      'ui/toggleTodo': ({ id }) => ({
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      }),

      // Request delete - show confirmation
      'ui/requestDeleteTodo': ({ id }) => ({
        ...state,
        deleteConfirmation: id,
      }),

      // Confirm delete - remove the todo
      'ui/confirmDeleteTodo': () => ({
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== state.deleteConfirmation
        ),
        deleteConfirmation: null,
      }),

      // Cancel delete - hide confirmation
      'ui/cancelDeleteTodo': () => ({
        ...state,
        deleteConfirmation: null,
      }),

      // Set filter
      'ui/setFilter': ({ filter }) => ({
        ...state,
        filter,
      }),
    },
    () => state
  )
}
