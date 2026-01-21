export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export type Filter = 'all' | 'active' | 'done'

export type AppState = {
  todos: Todo[]
  filter: Filter
}

export const initialState: AppState = {
  todos: [],
  filter: 'all',
}
