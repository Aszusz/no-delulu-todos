import { useState } from 'react'
import { testIds } from '../test/steps/todo.testIds'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import { selectFilter, selectFilteredTodos } from './store/selectors'
import type { Filter } from './store/state'

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function App() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectFilteredTodos)
  const filter = useAppSelector(selectFilter)
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    const trimmed = inputValue.trim()
    if (trimmed) {
      dispatch(
        AppActions['ui/addTodo'](trimmed, crypto.randomUUID(), Date.now())
      )
      setInputValue('')
    }
  }

  const handleDelete = (id: string, text: string) => {
    if (window.confirm(`Delete "${text}"?`)) {
      dispatch(AppActions['ui/deleteTodo'](id))
    }
  }

  const isAddDisabled = !inputValue.trim()

  const handleFilterClick = (newFilter: Filter) => {
    dispatch(AppActions['ui/setFilter'](newFilter))
  }

  const filterButtons: { filter: Filter; label: string; testId: string }[] = [
    { filter: 'all', label: 'All', testId: testIds.filterAll },
    { filter: 'active', label: 'Active', testId: testIds.filterActive },
    { filter: 'done', label: 'Done', testId: testIds.filterDone },
  ]

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
      <div className="mb-4 flex gap-2">
        <input
          id="todo-input"
          data-testid={testIds.input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 rounded border px-3 py-2"
          placeholder="Add a todo..."
        />
        <button
          data-testid={testIds.addButton}
          onClick={handleAdd}
          disabled={isAddDisabled}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </div>
      <div className="mb-4 flex gap-2">
        {filterButtons.map(({ filter: f, label, testId }) => (
          <button
            key={f}
            data-testid={testId}
            onClick={() => handleFilterClick(f)}
            aria-pressed={filter === f}
            className={`rounded px-3 py-1 ${
              filter === f
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <ul data-testid={testIds.list}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={testIds.item}
            className="flex items-center border-b py-2"
          >
            <input
              type="checkbox"
              data-testid={testIds.itemCheckbox}
              checked={todo.done}
              onChange={() => dispatch(AppActions['ui/toggleTodo'](todo.id))}
              className="mr-2"
            />
            <span data-testid={testIds.itemText}>{todo.text}</span>
            <span
              data-testid={testIds.itemTimestamp}
              className="ml-2 text-sm text-gray-500"
            >
              {formatDate(todo.createdAt)}
            </span>
            <button
              data-testid={testIds.itemDeleteButton}
              onClick={() => handleDelete(todo.id, todo.text)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
