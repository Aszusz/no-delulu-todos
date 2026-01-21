import { useState } from 'react'
import { testIds } from '../test/steps/todo.testIds'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import { selectTodos } from './store/selectors'

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
  const todos = useAppSelector(selectTodos)
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

  const isAddDisabled = !inputValue.trim()

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
      <ul data-testid={testIds.list}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid={testIds.item}
            className="border-b py-2"
          >
            <span data-testid={testIds.itemText}>{todo.text}</span>
            <span
              data-testid={testIds.itemTimestamp}
              className="ml-2 text-sm text-gray-500"
            >
              {formatDate(todo.createdAt)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
