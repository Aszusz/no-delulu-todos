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
      'ui/todoAdded': ({ text, id, createdAt }) => ({
        ...state,
        todos: [...state.todos, { id, text, done: false, createdAt }],
      }),
      'ui/todoToggled': ({ id }) => ({
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      }),
      'ui/todoDeleteRequested': ({ id }) => ({
        ...state,
        pendingDeleteId: id,
      }),
      'ui/todoDeleteConfirmed': () => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== state.pendingDeleteId),
        pendingDeleteId: null,
      }),
      'ui/todoDeleteCancelled': () => ({
        ...state,
        pendingDeleteId: null,
      }),
    },
    () => state
  )
}
