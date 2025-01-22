import React, { useState } from 'react';
import './styles/App.css';
import TodoItem from './components/TodoItem';

function App() {
  const [todoLists, setTodoLists] = useState([
    {
      id: 1,
      name: "Work",
      todos: [
        { id: 1, text: "Finish report", description: "Complete the monthly report", completed: false },
        { id: 2, text: "Email team", description: "Send updates to the team", completed: true },
      ],
    },
    {
      id: 2,
      name: "Personal",
      todos: [
        { id: 3, text: "Buy groceries", description: "Pick up fruits and vegetables", completed: false },
        { id: 4, text: "Workout", description: "Go to the gym", completed: true },
      ],
    },
  ]);

  const [activeListId, setActiveListId] = useState(1);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Select active list
  const selectTodoList = (id) => {
    setActiveListId(id);
  };

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() && newDescription.trim()) {
      const updatedLists = todoLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: [
                ...list.todos,
                { id: Date.now(), text: newTodo, description: newDescription, completed: false },
              ],
            }
          : list
      );
      setTodoLists(updatedLists);
      setNewTodo('');
      setNewDescription('');
    }
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    const updatedLists = todoLists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            todos: list.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          }
        : list
    );
    setTodoLists(updatedLists);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const updatedLists = todoLists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            todos: list.todos.filter((todo) => todo.id !== id),
          }
        : list
    );
    setTodoLists(updatedLists);
  };

  // Get active list
  const activeList = todoLists.find((list) => list.id === activeListId);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold text-gray-100">Todo App</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-1/4 p-4">
          <h2 className="text-lg font-semibold">Todo Lists</h2>
          <ul>
            {todoLists.map((list) => (
              <li
                key={list.id}
                className={`p-2 cursor-pointer rounded ${
                  activeListId === list.id ? "bg-gray-700" : ""
                }`}
                onClick={() => selectTodoList(list.id)}
              >
                {list.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Area */}
        <main className="flex-1 p-4 bg-white text-black">
          <h2>{activeList.name} Todos</h2>
          <form onSubmit={addTodo} className="mb-4 flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="p-2 border rounded w-full mb-0"
                placeholder="Enter a new todo"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="p-2 border rounded w-full mb-0"
                placeholder="Enter a description"
              />
            </div>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded h-10">
              Add Todo
            </button>
          </form>

          <ul>
            {activeList.todos.map((todo) => (
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
