export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export type AppState = {
  todos: Todo[]
  pendingDeleteId: string | null
}

export const initialState: AppState = {
  todos: [],
  pendingDeleteId: null,
}
