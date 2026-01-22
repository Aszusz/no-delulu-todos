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
    },
    () => state
  )
}
