import { useState } from 'react'
import { testIds } from '../test/steps/todo.testIds'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import {
  selectFilter,
  selectFilteredTodos,
  selectPendingDeleteId,
} from './store/selectors'

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
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
  const currentFilter = useAppSelector(selectFilter)
  const pendingDeleteId = useAppSelector(selectPendingDeleteId)
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    if (inputValue.trim()) {
      const id = crypto.randomUUID()
      const createdAt = Date.now()
      dispatch(AppActions['ui/todoAdded'](inputValue.trim(), id, createdAt))
      setInputValue('')
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
      <div className="mb-4 flex gap-2">
        <input
          data-testid={testIds.input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded border px-2 py-1"
          placeholder="Enter a todo..."
        />
        <button
          data-testid={testIds.addButton}
          onClick={handleAdd}
          className="rounded bg-blue-500 px-4 py-1 text-white"
        >
          Add
        </button>
      </div>
      <div className="mb-4 flex gap-2">
        <button
          data-testid={testIds.filterAll}
          onClick={() => dispatch(AppActions['ui/filterChanged']('all'))}
          className={`rounded px-3 py-1 ${currentFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          data-testid={testIds.filterActive}
          onClick={() => dispatch(AppActions['ui/filterChanged']('active'))}
          className={`rounded px-3 py-1 ${currentFilter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button
          data-testid={testIds.filterDone}
          onClick={() => dispatch(AppActions['ui/filterChanged']('done'))}
          className={`rounded px-3 py-1 ${currentFilter === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Done
        </button>
      </div>
      <ul data-testid={testIds.list}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={testIds.item}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              data-testid={testIds.itemToggle}
              checked={todo.done}
              onChange={() => dispatch(AppActions['ui/todoToggled'](todo.id))}
            />
            <span
              data-testid={testIds.itemText}
              className={todo.done ? 'line-through' : ''}
            >
              {todo.text}
            </span>
            <span
              data-testid={testIds.itemTimestamp}
              className="text-sm text-gray-500"
            >
              {formatTimestamp(todo.createdAt)}
            </span>
            <button
              data-testid={testIds.itemDeleteButton}
              onClick={() =>
                dispatch(AppActions['ui/todoDeleteRequested'](todo.id))
              }
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {pendingDeleteId && (
        <div
          data-testid={testIds.confirmDialog}
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="rounded bg-white p-4 shadow">
            <p>Are you sure you want to delete this todo?</p>
            <div className="mt-4 flex gap-2">
              <button
                data-testid={testIds.confirmButton}
                onClick={() => dispatch(AppActions['ui/todoDeleteConfirmed']())}
                className="rounded bg-red-500 px-4 py-1 text-white"
              >
                Delete
              </button>
              <button
                data-testid={testIds.cancelButton}
                onClick={() => dispatch(AppActions['ui/todoDeleteCancelled']())}
                className="rounded bg-gray-300 px-4 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
