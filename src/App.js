import React, { useState } from 'react'; // Import React and the useState hook
import './styles/App.css'; // Import the CSS file for styling
import TodoItem from './components/TodoItem'; // Import the TodoItem component to render each todo
import Modal from './components/Modal'; // Import the Modal component for editing todo lists and todos

function App() {
  // State for storing todo lists, with two prefilled lists
  const [todoLists, setTodoLists] = useState([
    {
      id: 1, // Unique identifier for the list
      name: "Work", // Name of the list
      todos: [ // Array of todos within this list
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

  // State for active list ID, used to track which list is selected and 'active'
  const [activeListId, setActiveListId] = useState(1);

  // States for adding new todo and new list
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newListName, setNewListName] = useState('');
  const [sortBy, setSortBy] = useState('All'); // Filter todos by All, Completed, or Incomplete

  // States for modal editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Find the active list based on its ID
  const activeList = todoLists.find((list) => list.id === activeListId);

  // Filter todos based on the selected sort option
  // Make sure activeList is not undefined before accessing its todos
  const sortedTodos = activeList?.todos?.filter(todo => {
    if (sortBy === 'All') return true; // If 'All' is selected, show all todos
    if (sortBy === 'Completed') return todo.completed; // If 'Completed' is selected, show only completed todos
    if (sortBy === 'Incomplete') return !todo.completed; // If 'Incomplete' is selected, show only incomplete todos
  }) || []; // default to empty array if no todos exist or activeList is undefined

  // Handler for selecting a todo list
  const selectTodoList = (id) => {
    setActiveListId(id); // Set the active list to the selected one
  };

  // Handler for adding a new todo list
  const addTodoList = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newListName.trim()) { // Check if the new list name isn't empty
      const newList = {
        id: Date.now(), // Generate a unique ID using current timestamp
        name: newListName,
        todos: [],
      };
      setTodoLists([...todoLists, newList]); // Add the new list to the todoLists state
      setNewListName(''); // Clear the new list name input field
      setActiveListId(newList.id); // Set the new list as the active list
    }
  };

  // Handler for deleting a todo list
  const deleteTodoList = (id) => {
    const updatedLists = todoLists.filter((list) => list.id !== id); // Remove the list with the given ID
    setTodoLists(updatedLists); // Update the state with the remaining lists
  
    if (updatedLists.length === 0) {
      setActiveListId(null); // Reset active list if no lists are left
    } else if (id === activeListId) {
      setActiveListId(updatedLists[0].id); // Set the first list as active if the deleted list was active
    }
  };
  

  // Handler for adding a new todo to the active list
  const addTodo = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newTodo.trim() && newDescription.trim()) { // Check if both fields have content
      const updatedLists = todoLists.map((list) =>
        list.id === activeListId // Find the active list
          ? {
              ...list, // Spread the existing list
              todos: [
                ...list.todos, // Keep the existing todos
                { id: Date.now(), text: newTodo, description: newDescription, completed: false }, // Add the new todo
              ],
            }
          : list
      );
      setTodoLists(updatedLists); // Update the state with the new todo list
      setNewTodo(''); // Clear the new todo input
      setNewDescription(''); // Clear the new description input
    }
  };

  // Handler for toggling the completion status of a todo
  const toggleComplete = (id) => {
    const updatedLists = todoLists.map((list) =>
      list.id === activeListId
        ? {
            ...list, // If it's the active list
            todos: list.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo // Toggle completed status of the todo
            ),
          }
        : list // If it's not the active list, leave it unchanged
    );
    setTodoLists(updatedLists); // Update the state with the toggled completion
  };

  // Handler for deleting a todo from the active list
  const deleteTodo = (id) => {
    const updatedLists = todoLists.map((list) =>
      list.id === activeListId
        ? {
            ...list,
            todos: list.todos.filter((todo) => todo.id !== id), // Remove the selected todo
          }
        : list
    );
    setTodoLists(updatedLists); // Update the state with the remaining todos
  };

  // Handler for opening the edit modal for a list
  const openListEditModal = (list) => {
    setEditingList(list); // Set the list to be edited
    setEditText(list.name); // Set the name of the list as the default value in the input
    setIsEditModalOpen(true); // Open the modal
  };

  // Handler for saving the list name after editing
  const saveListEdit = () => {
    if (editText.trim()) { // Ensure the new name isn't empty
      const updatedLists = todoLists.map(list =>
        list.id === editingList.id ? { ...list, name: editText } : list // Update the name of the editing list
      );
      setTodoLists(updatedLists); // Update the state with the new list name
      setIsEditModalOpen(false); // Close the modal
      setEditingList(null); // Reset the editing list state
      setEditText(''); // Clear the edit text field
    }
  };

  // Handler for opening the edit modal for a todo
  const openTodoEditModal = (todo) => {
    setEditingTodo(todo); // Set the todo to be edited
    setEditText(todo.text); // Set the text of the todo as the default value in the input
    setEditDescription(todo.description); // Set the description of the todo as the default value
    setIsEditModalOpen(true); // Open the modal
  };

  // Handler for saving the edited todo
  const saveTodoEdit = () => {
    if (editText.trim() && editDescription.trim()) { // Ensure both fields have content
      const updatedLists = todoLists.map(list =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map(todo =>
                todo.id === editingTodo.id
                  ? { ...todo, text: editText, description: editDescription } // Update the todo
                  : todo
              ),
            }
          : list
      );
      setTodoLists(updatedLists); // Update the state with the edited todo
      setIsEditModalOpen(false); // Close the modal
      setEditingTodo(null); // Reset the editing todo state
      setEditText(''); // Clear the edit text field
      setEditDescription(''); // Clear the edit description field
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold text-gray-100">Todo App</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar - Displaying all todo lists */}
        <aside className="bg-gray-800 text-white w-1/4 p-4">
          <h2 className="text-lg font-semibold mb-4">Todo Lists</h2>
          <ul className="space-y-2">
            {todoLists.map((list) => (
              <li
                key={list.id}
                onClick={() => selectTodoList(list.id)} // Set the active list when clicked
                className={`p-2 cursor-pointer rounded flex justify-between items-center
                  ${activeListId === list.id ? "bg-gray-600" : "bg-gray-700"}
                  hover:bg-gray-600`}
              >
                <span>{list.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      openListEditModal(list); // Open the list edit modal
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    ✎
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteTodoList(list.id); // Delete the list
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
              onChange={(e) => setNewListName(e.target.value)} // Handle list name input change
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

        {/* Main Area - Display todos of the active list */}
        <main className="flex-1 p-4 bg-white text-black">
          <h2 className="text-xl font-semibold mb-4">{activeList?.name || "No List Selected"}</h2>
          <form onSubmit={addTodo} className="mb-4 flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)} // Handle new todo input change
                className="p-2 border rounded w-full mb-0"
                placeholder="Enter a new todo"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)} // Handle new description input change
                className="p-2 border rounded w-full mb-0"
                placeholder="Enter a description"
              />
            </div>
            <button
              type="submit"
              className={`p-2 bg-blue-500 text-white rounded h-10 ${!activeListId ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button when no list is active
              disabled={!activeListId} // Disable button when there's no active list
            >
              Add Todo
            </button>

          </form>

          {/* Sort By Dropdown */}
          <div className="mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)} // Handle sorting option change
              className="p-2 border rounded"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          {/* Todo Items */}
      <ul>
        {sortedTodos.length > 0 ? (
          sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              onEdit={() => openTodoEditModal(todo)}
            />
          ))
        ) : (
          <p className="text-gray-500">No todos available.</p> // Fallback message if there are no todos
        )}
      </ul>
        </main>
      </div>

      {/* Edit Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false); // Close the modal
          setEditingList(null); // Reset editing states
          setEditingTodo(null);
          setEditText('');
          setEditDescription('');
        }}
      >
        {editingList ? (
          <div>
            <h3 className="text-xl mb-4">Edit Todo List</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)} // Handle input change
              className="p-2 w-full rounded"
            />
            <button
              onClick={saveListEdit} // Save the changes to the list
              className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl mb-4">Edit Todo</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)} // Handle input change
              className="p-2 w-full rounded"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)} // Handle description input change
              className="p-2 w-full rounded mt-2"
              placeholder="Edit description"
            />
            <button
              onClick={saveTodoEdit} // Save the changes to the todo
              className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
