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
      'ui/addTodo': ({ text, id, createdAt }) => ({
        ...state,
        todos: [...state.todos, { id, text, done: false, createdAt }],
      }),
      'ui/toggleTodo': ({ id }) => ({
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      }),
      'ui/deleteTodo': ({ id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      }),
      'ui/setFilter': ({ filter }) => ({
        ...state,
        filter,
      }),
    },
    () => state
  )
}
