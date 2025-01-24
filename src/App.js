import React, { useState } from 'react';
import './styles/App.css';
import TodoItem from './components/TodoItem';
import Modal from './components/Modal';

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
  const [newListName, setNewListName] = useState('');
  const [sortBy, setSortBy] = useState('All');

  // New state for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Select active todo list
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

  // Add a new todo list
  const addTodoList = (e) => {
    e.preventDefault();
    if (newListName.trim()) {
      const newList = {
        id: Date.now(),
        name: newListName,
        todos: [],
      };
      setTodoLists([...todoLists, newList]);
      setNewListName('');
      setActiveListId(newList.id); // Automatically select the new list
    }
  };

  // Delete a todo list
  const deleteTodoList = (id) => {
    const updatedLists = todoLists.filter((list) => list.id !== id);
    setTodoLists(updatedLists);

    // If the deleted list was active, select the first available list
    if (id === activeListId && updatedLists.length > 0) {
      setActiveListId(updatedLists[0].id);
    }
  };

  // New method to open list edit modal
  const openListEditModal = (list) => {
    setEditingList(list);
    setEditText(list.name);
    setIsEditModalOpen(true);
  };

  // New method to save list edit
  const saveListEdit = () => {
    if (editText.trim()) {
      const updatedLists = todoLists.map(list => 
        list.id === editingList.id ? { ...list, name: editText } : list
      );
      setTodoLists(updatedLists);
      setIsEditModalOpen(false);
      setEditingList(null);
      setEditText('');
    }
  };

  // New method to open todo edit modal
  const openTodoEditModal = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setEditDescription(todo.description);
    setIsEditModalOpen(true);
  };

  // New method to save todo edit
  const saveTodoEdit = () => {
    if (editText.trim() && editDescription.trim()) {
      const updatedLists = todoLists.map(list => 
        list.id === activeListId 
          ? {
              ...list,
              todos: list.todos.map(todo => 
                todo.id === editingTodo.id 
                  ? { ...todo, text: editText, description: editDescription } 
                  : todo
              )
            } 
          : list
      );
      setTodoLists(updatedLists);
      setIsEditModalOpen(false);
      setEditingTodo(null);
      setEditText('');
      setEditDescription('');
    }
  };

  // Get active list
  const activeList = todoLists.find((list) => list.id === activeListId);

  // Sort todos based on filter
  const sortedTodos = activeList?.todos.filter(todo => {
    if (sortBy === 'All') return true;
    if (sortBy === 'Completed') return todo.completed;
    if (sortBy === 'Incomplete') return !todo.completed;
  });

  // Rest of the component remains the same as in the previous artifact...
  // (The return statement and JSX remain unchanged)

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
          <h2 className="text-lg font-semibold mb-4">Todo Lists</h2>
          <ul className="space-y-2">
            {todoLists.map((list) => (
              <li
                key={list.id}
                onClick={() => selectTodoList(list.id)}
                className={`p-2 cursor-pointer rounded flex justify-between items-center
                  ${activeListId === list.id ? "bg-gray-600" : "bg-gray-700"}
                  hover:bg-gray-600`}
              >
                <span>{list.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openListEditModal(list);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    ✎
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteTodoList(list.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={addTodoList} className="mt-6">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New list name"
              className="p-2 w-full rounded bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="mt-2 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add List
            </button>
          </form>
        </aside>

        {/* Main Area */}
        <main className="flex-1 p-4 bg-white text-black">
          <h2 className="text-xl font-semibold mb-4">{activeList?.name || "No List Selected"}</h2>
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

          {/* Sort By Dropdown */}
          <div className="mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          <ul>
            {sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                onEdit={() => openTodoEditModal(todo)}
              />
            ))}
          </ul>
        </main>
      </div>

      {/* Edit Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingList(null);
          setEditingTodo(null);
          setEditText('');
          setEditDescription('');
        }}
        onSave={editingList ? saveListEdit : saveTodoEdit}
      >
        <div className="space-y-4">
          {editingList ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="List Name"
              className="w-full p-2 border rounded"
            />
          ) : (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Todo Title"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;