import { discUnion, type DiscUnionOf } from 'disc-union'
import type { Filter } from './state'

export const AppActions = discUnion(
  {
    'app/started': () => ({}),
    'ui/addTodo': (text: string, id: string, createdAt: number) => ({
      text,
      id,
      createdAt,
    }),
    'ui/toggleTodo': (id: string) => ({ id }),
    'ui/deleteTodo': (id: string) => ({ id }),
    'ui/setFilter': (filter: Filter) => ({ filter }),
  },
  'type'
)

export type AppAction = DiscUnionOf<typeof AppActions>
