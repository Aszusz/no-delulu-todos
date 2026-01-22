export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export type TodoFilter = 'all' | 'active' | 'done'

export type AppState = {
  todos: Todo[]
  pendingDeleteId: string | null
  filter: TodoFilter
}

export const initialState: AppState = {
  todos: [],
  pendingDeleteId: null,
  filter: 'all',
}
