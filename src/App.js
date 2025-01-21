import React, { useState } from 'react';
import './styles/App.css';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', description: 'Understand the fundamentals of React', completed: false },
    { id: 2, text: 'Build a Todo app', description: 'Create a simple app to manage tasks', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() && newDescription.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, description: newDescription, completed: false },
      ]);
      setNewTodo('');
      setNewDescription('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold text-gray-100">Todo App</h1>
      </header>

      <div className="flex flex-1">
        <aside className="bg-gray-800 text-white w-1/4 p-4">
          <h2>Sidebar</h2>
        </aside>

        <main className="flex-1 p-4 bg-white text-black">
          <h2>Todo List</h2>
          <form onSubmit={addTodo} className="mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="p-2 border rounded"
              placeholder="Enter a new todo title"
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="p-2 border rounded ml-2"
              placeholder="Enter a description"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
              Add Todo
            </button>
          </form>
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
