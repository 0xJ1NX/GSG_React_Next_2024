import { useState } from 'react'
import { ITodoItem } from './types';
import Dashboard from './components/dashboard/dashboard-component';
import Form from './components/form/form.component';
import TodoList from './components/todo-list/todo-list.component';


function App() {

  const [todos, setTodos] = useState<ITodoItem[]>([]);

  const handleNewItem = (item: ITodoItem) => {
    setTodos([...todos, item]);
  }

  const handleTaskToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = e.target.dataset["itemId"];
    setTodos(todos.map(item => (item.id === Number(itemId)) ? { ...item, isDone: !item.isDone } : item));
  }

  const handleDelete = (index: number) => {
    // This will delete the item at index!
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1, todos.length)]);
  }

  return (
    <>
      <h1>Todo App - {new Date().toDateString()}</h1>
      <Form onSubmit={handleNewItem} />
      <Dashboard items={todos} />
      <TodoList items={todos} onToggle={handleTaskToggle} onDelete={handleDelete} />
    </>
  )
}

export default App
