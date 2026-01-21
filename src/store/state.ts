export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number // timestamp in milliseconds
}

export type Filter = 'all' | 'active' | 'done'

export type AppState = {
  todos: Todo[]
  filter: Filter
  pendingDeleteId: string | null // id of todo awaiting deletion confirmation
}

export const initialState: AppState = {
  todos: [],
  filter: 'all',
  pendingDeleteId: null,
}
