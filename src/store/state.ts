export type FilterType = 'all' | 'active' | 'done'

export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number // timestamp in milliseconds
}

export type AppState = {
  todos: Todo[]
  filter: FilterType
  deleteConfirmation: string | null // todo id being confirmed for deletion
}

export const initialState: AppState = {
  todos: [],
  filter: 'all',
  deleteConfirmation: null,
}
