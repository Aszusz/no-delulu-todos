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
  const [isFocused, setIsFocused] = useState(false)
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
    <div
      className={`flex items-center gap-3 rounded-2xl border border-slate-700/50 bg-[var(--color-paper)] p-2 pl-5 transition-all duration-300 ease-out ${isFocused ? 'border-[var(--color-accent)]/50 shadow-[var(--shadow-lifted)] shadow-[var(--color-accent)]/10' : 'shadow-[var(--shadow-medium)]'} `}
    >
      <div className="flex-1">
        <input
          data-testid="todo-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What needs to be done?"
          className="w-full bg-transparent py-3 text-[var(--color-ink)] placeholder-[var(--color-ink-muted)]"
          style={{ fontSize: '1.0625rem', outline: 'none' }}
        />
      </div>
      <button
        data-testid="todo-submit-button"
        onClick={handleSubmit}
        disabled={!isValid}
        className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
          isValid
            ? 'bg-[var(--color-accent)] text-white shadow-sm hover:bg-[var(--color-accent-hover)] hover:shadow-md active:scale-[0.98]'
            : 'cursor-not-allowed bg-[var(--color-cream-dark)] text-[var(--color-ink-muted)]'
        } `}
      >
        Add Task
      </button>
    </div>
  )
}

function TodoItem({ todo, index }: { todo: Todo; index: number }) {
  const dispatch = useAppDispatch()

  return (
    <li
      data-testid="todo-item"
      className="animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div
        className={`group flex items-start gap-4 rounded-xl border border-slate-700/50 bg-[var(--color-paper)] p-4 shadow-[var(--shadow-soft)] transition-all duration-200 hover:border-slate-600/50 hover:shadow-[var(--shadow-medium)] ${todo.done ? 'border-emerald-800/30 bg-[var(--color-done-soft)]' : ''} `}
      >
        <div className="pt-0.5">
          <input
            data-testid="todo-item-toggle"
            type="checkbox"
            checked={todo.done}
            onChange={() => dispatch(AppActions['ui/toggleTodo'](todo.id))}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            data-testid="todo-item-text"
            className={`text-[1.0625rem] leading-relaxed transition-all duration-200 ${todo.done ? 'text-[var(--color-ink-muted)] line-through decoration-[var(--color-done)] decoration-2' : 'text-[var(--color-ink)]'} `}
          >
            {todo.text}
          </p>
          <time
            data-testid="todo-item-timestamp"
            className="mt-1 block text-sm text-[var(--color-ink-muted)]"
          >
            {formatTimestamp(todo.createdAt)}
          </time>
        </div>
        <button
          data-testid="todo-item-delete-button"
          onClick={() => dispatch(AppActions['ui/requestDeleteTodo'](todo.id))}
          className="rounded-lg p-2 text-[var(--color-ink-muted)] opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-[var(--color-danger-soft)] hover:text-[var(--color-danger)]"
          aria-label="Delete task"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </li>
  )
}

function TodoList() {
  const todos = useAppSelector(selectFilteredTodos)

  if (todos.length === 0) {
    return (
      <div className="animate-fade-in py-16 text-center opacity-0">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[var(--color-cream-dark)] p-4">
          <svg
            className="h-full w-full text-[var(--color-ink-muted)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
        </div>
        <p className="text-lg text-[var(--color-ink-muted)]">
          No tasks yet. Add one above.
        </p>
      </div>
    )
  }

  return (
    <ul data-testid="todo-list" className="flex flex-col gap-3">
      {todos.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} />
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
    <div className="inline-flex gap-1 rounded-xl bg-[var(--color-cream-dark)] p-1">
      {filters.map(({ value, label, testId }) => (
        <button
          key={value}
          data-testid={testId}
          aria-pressed={filter === value}
          onClick={() => dispatch(AppActions['ui/setFilter'](value))}
          className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
            filter === value
              ? 'bg-[var(--color-paper)] text-[var(--color-ink)] shadow-sm'
              : 'text-[var(--color-ink-light)] hover:text-[var(--color-ink)]'
          } `}
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
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/40 opacity-0 backdrop-blur-sm">
      <div
        data-testid="todo-confirm-dialog"
        className="animate-scale-in mx-4 w-full max-w-md rounded-2xl border border-slate-700/50 bg-[var(--color-paper)] p-6 opacity-0 shadow-[var(--shadow-lifted)]"
      >
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-danger-soft)]">
          <svg
            className="h-6 w-6 text-[var(--color-danger)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-[var(--color-ink)]">
          Delete this task?
        </h2>
        <p className="mb-6 text-[var(--color-ink-light)]">
          This action cannot be undone. The task will be permanently removed.
        </p>
        <div className="flex justify-end gap-3">
          <button
            data-testid="todo-confirm-no"
            onClick={() => dispatch(AppActions['ui/cancelDeleteTodo']())}
            className="rounded-xl px-5 py-2.5 font-medium text-[var(--color-ink-light)] transition-all duration-200 hover:bg-[var(--color-cream-dark)]"
          >
            Cancel
          </button>
          <button
            data-testid="todo-confirm-yes"
            onClick={() => dispatch(AppActions['ui/confirmDeleteTodo']())}
            className="rounded-xl bg-[var(--color-danger)] px-5 py-2.5 font-medium text-white transition-all duration-200 hover:bg-[var(--color-danger-hover)] active:scale-[0.98]"
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
    <div className="mx-auto min-h-screen max-w-xl px-4 py-12 sm:py-16">
      {/* Header */}
      <header className="animate-slide-down mb-10 text-center opacity-0">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-[var(--color-ink)] sm:text-5xl">
          No Delulu Todos
        </h1>
        <p className="text-[var(--color-ink-light)]">
          Stay focused. Get things done.
        </p>
      </header>

      {/* Input */}
      <div className="animate-fade-in-up mb-8 opacity-0 delay-1">
        <TodoInput />
      </div>

      {/* Filters */}
      <div className="animate-fade-in-up mb-6 opacity-0 delay-2">
        <FilterButtons />
      </div>

      {/* List */}
      <main>
        <TodoList />
      </main>

      {/* Dialog */}
      <ConfirmDialog />
    </div>
  )
}

export default App
