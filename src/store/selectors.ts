import type { RootState } from '.'

export const selectTodos = (state: RootState) => state.game.todos
