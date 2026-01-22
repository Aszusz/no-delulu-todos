import type { Middleware } from 'redux'
import { match } from 'disc-union'
import { AppActions, type AppAction } from '../actions'
import { defaultEffects, type Effects } from '../effects'

export const createTodoMiddleware =
  (effects: Effects = defaultEffects): Middleware =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    match(
      action as AppAction,
      {
        'ui/addTodo': ({ text }) => {
          const now = effects.now()
          const todo = {
            id: `${now.getTime()}-${Math.random().toString(36).slice(2, 9)}`,
            text,
            done: false,
            createdAt: now.getTime(),
          }
          dispatch(AppActions['eff/todoAdded'](todo))
        },
      },
      () => {}
    )

    return next(action)
  }

export const todoMiddleware = createTodoMiddleware()
