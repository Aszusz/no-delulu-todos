import { discUnion, type DiscUnionOf } from 'disc-union'
import type { FilterType, Todo } from './state'

export const AppActions = discUnion(
  {
    'app/started': () => ({}),

    // UI actions - user initiated
    'ui/addTodo': (text: string) => ({ text }),
    'ui/toggleTodo': (id: string) => ({ id }),
    'ui/requestDeleteTodo': (id: string) => ({ id }),
    'ui/confirmDeleteTodo': () => ({}),
    'ui/cancelDeleteTodo': () => ({}),
    'ui/setFilter': (filter: FilterType) => ({ filter }),

    // Effect actions - middleware initiated with side effect data
    'eff/todoAdded': (todo: Todo) => ({ todo }),
  },
  'type'
)

export type AppAction = DiscUnionOf<typeof AppActions>
