import { discUnion, type DiscUnionOf } from 'disc-union'
import type { Filter } from './state'

export const AppActions = discUnion(
  {
    'app/started': () => ({}),
    // UI actions
    'ui/todoAdded': (text: string, id: string, createdAt: number) => ({
      text,
      id,
      createdAt,
    }),
    'ui/todoToggled': (id: string) => ({ id }),
    'ui/todoDeleteRequested': (id: string) => ({ id }),
    'ui/todoDeleteConfirmed': () => ({}),
    'ui/todoDeleteCancelled': () => ({}),
    'ui/filterChanged': (filter: Filter) => ({ filter }),
  },
  'type'
)

export type AppAction = DiscUnionOf<typeof AppActions>
