import { discUnion, type DiscUnionOf } from 'disc-union'

export const AppActions = discUnion(
  {
    'app/started': () => ({}),
    'ui/todoAdded': (text: string, id: string, createdAt: number) => ({
      text,
      id,
      createdAt,
    }),
    'ui/todoToggled': (id: string) => ({ id }),
    'ui/todoDeleteRequested': (id: string) => ({ id }),
    'ui/todoDeleteConfirmed': () => ({}),
    'ui/todoDeleteCancelled': () => ({}),
  },
  'type'
)

export type AppAction = DiscUnionOf<typeof AppActions>
