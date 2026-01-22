import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import {
  selectFilteredTodos,
  selectFilter,
  selectDeleteConfirmation,
} from './store/selectors'
import type { FilterType, Todo } from './store/state'

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${datePart} ${timePart}`
}

function TodoInput() {
  const [text, setText] = useState('')
  const dispatch = useAppDispatch()

  const isValid = text.trim().length > 0

  const handleSubmit = () => {
    if (isValid) {
      dispatch(AppActions['ui/addTodo'](text.trim()))
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      handleSubmit()
    }
  }

  return (
    <div className="flex gap-2">
      <input
        data-testid="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <button
        data-testid="todo-submit-button"
        onClick={handleSubmit}
        disabled={!isValid}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Add
      </button>
    </div>
  )
}

function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch()

  return (
    <li
      data-testid="todo-item"
      className="flex items-center gap-3 rounded border border-gray-200 bg-white p-3"
    >
      <input
        data-testid="todo-item-toggle"
        type="checkbox"
        checked={todo.done}
        onChange={() => dispatch(AppActions['ui/toggleTodo'](todo.id))}
        className="h-5 w-5 cursor-pointer"
      />
      <div className="flex-1">
        <span
          data-testid="todo-item-text"
          className={todo.done ? 'text-gray-500 line-through' : ''}
        >
          {todo.text}
        </span>
        <span
          data-testid="todo-item-timestamp"
          className="ml-2 text-sm text-gray-400"
        >
          {formatTimestamp(todo.createdAt)}
        </span>
      </div>
      <button
        data-testid="todo-item-delete-button"
        onClick={() => dispatch(AppActions['ui/requestDeleteTodo'](todo.id))}
        className="rounded px-2 py-1 text-red-500 hover:bg-red-50"
      >
        Delete
      </button>
    </li>
  )
}

function TodoList() {
  const todos = useAppSelector(selectFilteredTodos)

  return (
    <ul data-testid="todo-list" className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

function FilterButtons() {
  const filter = useAppSelector(selectFilter)
  const dispatch = useAppDispatch()

  const filters: { value: FilterType; label: string; testId: string }[] = [
    { value: 'all', label: 'All', testId: 'todo-filter-all' },
    { value: 'active', label: 'Active', testId: 'todo-filter-active' },
    { value: 'done', label: 'Done', testId: 'todo-filter-done' },
  ]

  return (
    <div className="flex gap-2">
      {filters.map(({ value, label, testId }) => (
        <button
          key={value}
          data-testid={testId}
          aria-pressed={filter === value}
          onClick={() => dispatch(AppActions['ui/setFilter'](value))}
          className={`rounded px-3 py-1 ${
            filter === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function ConfirmDialog() {
  const deleteConfirmation = useAppSelector(selectDeleteConfirmation)
  const dispatch = useAppDispatch()

  if (!deleteConfirmation) return null

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
      <div
        data-testid="todo-confirm-dialog"
        className="rounded-lg bg-white p-6 shadow-xl"
      >
        <p className="mb-4 text-lg">
          Are you sure you want to delete this todo?
        </p>
        <div className="flex justify-end gap-2">
          <button
            data-testid="todo-confirm-no"
            onClick={() => dispatch(AppActions['ui/cancelDeleteTodo']())}
            className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            data-testid="todo-confirm-yes"
            onClick={() => dispatch(AppActions['ui/confirmDeleteTodo']())}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Todo List</h1>
      <div className="mb-4">
        <TodoInput />
      </div>
      <div className="mb-4">
        <FilterButtons />
      </div>
      <TodoList />
      <ConfirmDialog />
    </div>
  )
}

export default App
