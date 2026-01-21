import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import {
  selectFilteredTodos,
  selectFilter,
  selectPendingDeleteId,
  selectPendingDeleteTodo,
} from './store/selectors'
import type { Filter, Todo } from './store/state'
import { testIds } from '../test/steps/todo.testIds'
import { useEffects } from './EffectsContext'

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function TodoInput() {
  const [text, setText] = useState('')
  const dispatch = useAppDispatch()
  const effects = useEffects()

  const handleSubmit = () => {
    if (text.trim()) {
      dispatch(
        AppActions['ui/todoAdded'](
          text.trim(),
          generateId(),
          effects.now().getTime()
        )
      )
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="flex gap-2">
      <input
        data-testid={testIds.todoInput}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="flex-1 rounded border border-gray-300 px-3 py-2"
      />
      <button
        data-testid={testIds.todoSubmitButton}
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
      >
        Add
      </button>
    </div>
  )
}

function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useAppDispatch()

  return (
    <div
      data-testid={`${testIds.todoItem}-${todo.text}`}
      className="flex items-center gap-3 rounded border border-gray-200 p-3"
    >
      <input
        type="checkbox"
        data-testid={`${testIds.todoToggle}-${todo.text}`}
        checked={todo.done}
        onChange={() => dispatch(AppActions['ui/todoToggled'](todo.id))}
        className="h-5 w-5"
      />
      <div className="flex-1">
        <span
          data-testid={`${testIds.todoText}-${todo.text}`}
          className={todo.done ? 'text-gray-400 line-through' : ''}
        >
          {todo.text}
        </span>
        <span
          data-testid={`${testIds.todoTimestamp}-${todo.text}`}
          className="ml-2 text-sm text-gray-400"
        >
          {formatTimestamp(todo.createdAt)}
        </span>
      </div>
      <button
        data-testid={`${testIds.todoDeleteButton}-${todo.text}`}
        onClick={() => dispatch(AppActions['ui/todoDeleteRequested'](todo.id))}
        className="rounded bg-red-500 px-2 py-1 text-sm text-white"
      >
        Delete
      </button>
    </div>
  )
}

function FilterButtons() {
  const dispatch = useAppDispatch()
  const currentFilter = useAppSelector(selectFilter)

  const filters: { key: Filter; label: string; testId: string }[] = [
    { key: 'all', label: 'All', testId: testIds.filterAll },
    { key: 'active', label: 'Active', testId: testIds.filterActive },
    { key: 'done', label: 'Done', testId: testIds.filterDone },
  ]

  return (
    <div className="flex gap-2">
      {filters.map(({ key, label, testId }) => (
        <button
          key={key}
          data-testid={testId}
          onClick={() => dispatch(AppActions['ui/filterChanged'](key))}
          className={`rounded px-3 py-1 ${
            currentFilter === key
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function ConfirmDialog() {
  const dispatch = useAppDispatch()
  const pendingDeleteId = useAppSelector(selectPendingDeleteId)
  const pendingDeleteTodo = useAppSelector(selectPendingDeleteTodo)

  if (!pendingDeleteId || !pendingDeleteTodo) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        data-testid={testIds.confirmDialog}
        className="rounded-lg bg-white p-6 shadow-lg"
      >
        <p className="mb-4">
          Are you sure you want to delete "{pendingDeleteTodo.text}"?
        </p>
        <div className="flex justify-end gap-2">
          <button
            data-testid={testIds.confirmNo}
            onClick={() => dispatch(AppActions['ui/todoDeleteCancelled']())}
            className="rounded bg-gray-200 px-4 py-2"
          >
            Cancel
          </button>
          <button
            data-testid={testIds.confirmYes}
            onClick={() => dispatch(AppActions['ui/todoDeleteConfirmed']())}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  const todos = useAppSelector(selectFilteredTodos)

  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Todo List</h1>
      <TodoInput />
      <div className="my-4">
        <FilterButtons />
      </div>
      <div data-testid={testIds.todoList} className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      <ConfirmDialog />
    </div>
  )
}

export default App
