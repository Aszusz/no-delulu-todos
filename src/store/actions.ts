import { discUnion, type DiscUnionOf } from 'disc-union'

export const AppActions = discUnion(
  {
    'app/started': () => ({}),
    'ui/addTodo': (text: string, id: string, createdAt: number) => ({
      text,
      id,
      createdAt,
    }),
    'ui/toggleTodo': (id: string) => ({ id }),
  },
  'type'
)

export type AppAction = DiscUnionOf<typeof AppActions>
