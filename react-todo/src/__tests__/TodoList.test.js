import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../components/TodoList.jsx'

function getTodoItems() {
  return screen.getAllByRole('button', { name: /todo-/i })
}

test('renders initial todos', () => {
  render(<TodoList />)
  expect(screen.getByText('Todo List')).toBeInTheDocument()
  const items = getTodoItems()
  expect(items.length).toBeGreaterThanOrEqual(3)
})

test('adds a new todo', async () => {
  const user = userEvent.setup()
  render(<TodoList />)
  const input = screen.getByLabelText('todo-input')
  const form = screen.getByLabelText('add-todo-form')
  await user.type(input, 'New Task')
  fireEvent.submit(form)
  expect(screen.getByText('New Task')).toBeInTheDocument()
})

test('toggles a todo completed state on click', async () => {
  const user = userEvent.setup()
  render(<TodoList />)
  const first = getTodoItems()[0]
  const before = first.style.textDecoration
  await user.click(first)
  const after = first.style.textDecoration
  expect(before !== after).toBe(true)
})

test('deletes a todo', async () => {
  const user = userEvent.setup()
  render(<TodoList />)
  const initialCount = getTodoItems().length
  const deleteBtn = screen.getByLabelText(/delete-/i)
  await user.click(deleteBtn)
  const countAfter = getTodoItems().length
  expect(countAfter).toBe(initialCount - 1)
})