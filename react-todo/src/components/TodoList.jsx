import { useState } from 'react'
import AddTodoForm from './AddTodoForm.jsx'

const initialTodos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Write tests', completed: true },
  { id: 3, text: 'Build Todo App', completed: false },
]

function TodoList() {
  const [todos, setTodos] = useState(initialTodos)

  const addTodo = (text) => {
    const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1
    setTodos([...todos, { id: nextId, text, completed: false }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul aria-label="todo-list">
        {todos.map((t) => (
          <li key={t.id}>
            <span
              role="button"
              aria-label={`todo-${t.id}`}
              onClick={() => toggleTodo(t.id)}
              style={{
                textDecoration: t.completed ? 'line-through' : 'none',
                cursor: 'pointer',
                marginRight: 8,
              }}
            >
              {t.text}
            </span>
            <button aria-label={`delete-${t.id}`} onClick={() => deleteTodo(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
