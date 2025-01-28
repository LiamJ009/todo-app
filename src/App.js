import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import TodoListSidebar from './components/TodoListSidebar';
import TodoInputForm from './components/TodoInputForm';
import TodoItem from './components/TodoItem';
import Modal from './components/Modal';
import About from './components/About';

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

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeListId, setActiveListId] = useState(1);
  const [sortFilter, setSortFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const Layout = () => {
    const location = useLocation();
    const isAboutPage = location.pathname === '/about';

    return (
      <div className="flex flex-col h-screen bg-gray-900">
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-semibold">
            <Link to="/" className="text-gray-100 hover:text-white">Todo App</Link>
          </h1>
          <nav className="flex space-x-2">
            <NavLink to="/" end>Todo</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </header>
        
        <div className="flex flex-1">
          <TodoListSidebar 
            todoLists={todoLists}
            activeListId={activeListId}
            onSelectList={handleSelectList}
            onAddList={handleAddList}
            onEditList={handleEditList}
            onDeleteList={handleDeleteList}
            isAboutPageActive={isAboutPage}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <Outlet />
        </div>
      </div>
    );
  };

  const NavLink = ({ to, children, end }) => (
    <Link
      to={to}
      end={end}
      className={({ isActive }) => 
        `px-4 py-2 rounded-md transition-colors ${
          isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`
      }
    >
      {children}
    </Link>
  );

  // Rest of your existing handler functions remain exactly the same
  // (handleSelectList, handleAddList, handleEditList, handleDeleteList,
  // handleAddTodo, handleToggleComplete, handleDeleteTodo, etc.)

  const handleSelectList = (listId) => {
    setActiveListId(listId);
  };

  const handleAddList = (listName) => {
    const newList = {
      id: Date.now(),
      name: listName,
      todos: [],
    };
    setTodoLists([...todoLists, newList]);
    setActiveListId(newList.id);
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setEditText(list.name);
    setIsModalOpen(true);
  };

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

  const handleDeleteList = (listId) => {
    const updatedLists = todoLists.filter(list => list.id !== listId);
    setTodoLists(updatedLists);
    
    if (updatedLists.length > 0) {
      setActiveListId(updatedLists[0].id);
    } else {
      setActiveListId(null);
    }
  };

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

  const handleOpenTodoEdit = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setEditDescription(todo.description);
    setIsModalOpen(true);
  };

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

  const activeList = todoLists.find(list => list.id === activeListId);

  // eslint-disable-next-line
  const filteredTodos = activeList?.todos.filter(todo => {
    if (sortFilter === 'All') return true;
    if (sortFilter === 'Completed') return todo.completed;
    if (sortFilter === 'Incomplete') return !todo.completed;
    return true;
  }) || [];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingList(null);
    setEditingTodo(null);
    setEditText('');
    setEditDescription('');
  };


  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route 
            path="/" 
            element={
              <TodoMainInterface 
                activeList={todoLists.find(list => list.id === activeListId)}
                sortFilter={sortFilter}
                setSortFilter={setSortFilter}
                handleAddTodo={handleAddTodo}
                handleToggleComplete={handleToggleComplete}
                handleDeleteTodo={handleDeleteTodo}
                handleOpenTodoEdit={handleOpenTodoEdit}
                activeListId={activeListId}
              />
            } 
          />
        </Route>
      </Routes>

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
    </Router>
  );
}

const TodoMainInterface = ({
  activeList,
  sortFilter,
  setSortFilter,
  handleAddTodo,
  handleToggleComplete,
  handleDeleteTodo,
  handleOpenTodoEdit,
  activeListId
}) => {
  const filteredTodos = activeList?.todos.filter(todo => {
    if (sortFilter === 'All') return true;
    if (sortFilter === 'Completed') return todo.completed;
    if (sortFilter === 'Incomplete') return !todo.completed;
    return true;
  }) || [];

  return (
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
  );
};

export default App;