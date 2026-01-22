import { useState } from 'react'
import { testIds } from '../test/steps/todo.testIds'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import { selectTodos } from './store/selectors'

function App() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)
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
      <ul data-testid={testIds.list}>
        {todos.map((todo) => (
          <li key={todo.id} data-testid={testIds.item}>
            <span data-testid={testIds.itemText}>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
