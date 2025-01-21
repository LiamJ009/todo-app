import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo app', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo('');
    }
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
              placeholder="Enter a new todo"
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
              Add Todo
            </button>
          </form>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="p-2 border-b">
                {todo.text}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
