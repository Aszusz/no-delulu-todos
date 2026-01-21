export type Todo = {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export type AppState = {
  todos: Todo[]
}

export const initialState: AppState = {
  todos: [],
}
