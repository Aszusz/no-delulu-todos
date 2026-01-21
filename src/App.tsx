import { testIds } from '../test/steps/todo.testIds'
import { useAppDispatch, useAppSelector } from './hooks'
import { AppActions } from './store/actions'
import { selectTodos } from './store/selectors'

function App() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)

  const handleAdd = () => {
    const input = document.getElementById('todo-input') as HTMLInputElement
    if (input.value.trim()) {
      dispatch(
        AppActions['ui/addTodo'](
          input.value.trim(),
          crypto.randomUUID(),
          Date.now()
        )
      )
      input.value = ''
    }
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
      <div className="mb-4 flex gap-2">
        <input
          id="todo-input"
          data-testid={testIds.input}
          type="text"
          className="flex-1 rounded border px-3 py-2"
          placeholder="Add a todo..."
        />
        <button
          data-testid={testIds.addButton}
          onClick={handleAdd}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
