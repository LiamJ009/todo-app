import React, { useState } from 'react';
import TodoListSidebar from './components/TodoListSidebar';
import TodoInputForm from './components/TodoInputForm';
import TodoItem from './components/TodoItem';
import Modal from './components/Modal';

function App() {
  // Initial state with two predefined lists
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

  // State for tracking the active list
  const [activeListId, setActiveListId] = useState(1);

  // State for filtering todos
  const [sortFilter, setSortFilter] = useState('All');

  // States for modal management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  // States for edit inputs
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Handler to select a specific todo list
  const handleSelectList = (listId) => {
    setActiveListId(listId);
  };

  // Handler to add a new todo list
  const handleAddList = (listName) => {
    const newList = {
      id: Date.now(),
      name: listName,
      todos: [],
    };
    setTodoLists([...todoLists, newList]);
    setActiveListId(newList.id);
  };

  // Handler to edit a todo list
  const handleEditList = (list) => {
    setEditingList(list);
    setEditText(list.name);
    setIsModalOpen(true);
  };

  // Handler to save list edit
  const handleSaveListEdit = () => {
    if (editText.trim()) {
      const updatedLists = todoLists.map(list => 
        list.id === editingList.id 
          ? { ...list, name: editText }
          : list
      );
      setTodoLists(updatedLists);
      setIsModalOpen(false);
      setEditingList(null);
      setEditText('');
    }
  };

  // Handler to delete a todo list
  const handleDeleteList = (listId) => {
    const updatedLists = todoLists.filter(list => list.id !== listId);
    setTodoLists(updatedLists);
    
    if (updatedLists.length > 0) {
      setActiveListId(updatedLists[0].id);
    } else {
      setActiveListId(null);
    }
  };

  // Handler to add a new todo
  const handleAddTodo = (todoText, todoDescription) => {
    const updatedLists = todoLists.map(list => 
      list.id === activeListId 
        ? {
            ...list,
            todos: [
              ...list.todos, 
              { 
                id: Date.now(), 
                text: todoText, 
                description: todoDescription, 
                completed: false 
              }
            ]
          }
        : list
    );
    setTodoLists(updatedLists);
  };

  // Handler to toggle todo completion
  const handleToggleComplete = (todoId) => {
    const updatedLists = todoLists.map(list => 
      list.id === activeListId
        ? {
            ...list,
            todos: list.todos.map(todo => 
              todo.id === todoId 
                ? { ...todo, completed: !todo.completed }
                : todo
            )
          }
        : list
    );
    setTodoLists(updatedLists);
  };

  // Handler to delete a todo
  const handleDeleteTodo = (todoId) => {
    const updatedLists = todoLists.map(list => 
      list.id === activeListId
        ? {
            ...list,
            todos: list.todos.filter(todo => todo.id !== todoId)
          }
        : list
    );
    setTodoLists(updatedLists);
  };

  // Handler to open todo edit modal
  const handleOpenTodoEdit = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setEditDescription(todo.description);
    setIsModalOpen(true);
  };

  // Handler to save todo edit
  const handleSaveTodoEdit = () => {
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
      setIsModalOpen(false);
      setEditingTodo(null);
      setEditText('');
      setEditDescription('');
    }
  };

  // Find the active list
  const activeList = todoLists.find(list => list.id === activeListId);

  // Filter todos based on sort filter
  const filteredTodos = activeList?.todos.filter(todo => {
    if (sortFilter === 'All') return true;
    if (sortFilter === 'Completed') return todo.completed;
    if (sortFilter === 'Incomplete') return !todo.completed;
    return true;
  }) || [];

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingList(null);
    setEditingTodo(null);
    setEditText('');
    setEditDescription('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold text-gray-100">Todo App</h1>
      </header>

      <div className="flex flex-1">
        <TodoListSidebar 
          todoLists={todoLists}
          activeListId={activeListId}
          onSelectList={handleSelectList}
          onAddList={handleAddList}
          onEditList={handleEditList}
          onDeleteList={handleDeleteList}
        />

        <main className="flex-1 p-4 bg-white text-black">
          <h2 className="text-xl font-semibold mb-4">
            {activeList?.name || "No List Selected"}
          </h2>

          <TodoInputForm 
            activeListId={activeListId}
            onAddTodo={handleAddTodo}
          />

          <div className="mb-4">
            <select
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          <ul>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleComplete={handleToggleComplete}
                  deleteTodo={handleDeleteTodo}
                  onEdit={() => handleOpenTodoEdit(todo)}
                />
              ))
            ) : (
              <p className="text-gray-500">No todos available.</p>
            )}
          </ul>
        </main>
      </div>
      
      {/* Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSave={editingList ? handleSaveListEdit : handleSaveTodoEdit}
      >
        <div className="space-y-4">
          {editingList ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)} // Handle input change for list name
              placeholder="List Name"
              className="w-full p-2 border rounded"
            />
          ) : (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)} // Handle input change for todo text
                placeholder="Todo Title"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)} // Handle input change for todo description
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