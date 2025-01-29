import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import store from './redux/store';
import TodoListSidebar from './components/TodoListSidebar';
import TodoInputForm from './components/TodoInputForm';
import TodoItem from './components/TodoItem';
import Modal from './components/Modal';
import About from './components/About';
import { 
  FaRegCheckSquare, 
  FaHome, 
  FaInfoCircle 
} from 'react-icons/fa';
import {
  addList,
  selectList,
  toggleSidebar,
  startEditList,
  saveList,
  deleteList,
  addTodo,
  toggleComplete,
  deleteTodo,
  startEditTodo,
  saveTodo
} from './redux/todoSlice';

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const App = () => {
  const dispatch = useDispatch();
  const { 
    todoLists,
    activeListId,
    isSidebarCollapsed,
    editingList,
    editingTodo
  } = useSelector(state => state.todos);
  
  const [sortFilter, setSortFilter] = React.useState('All');
  const [editText, setEditText] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');

  const Layout = () => {
    const location = useLocation();
    const isAboutPage = location.pathname === '/about';

    return (
      <div className="flex flex-col h-screen bg-gray-900">
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-semibold flex items-center space-x-2">
              <FaRegCheckSquare className="text-blue-400" />
              <Link to="/" className="text-gray-100 hover:text-white">TODO App</Link>
            </h1>
            <div className="flex items-center space-x-4" style={{ marginLeft: isSidebarCollapsed ? '1rem' : '7rem' }}>
              <div className="h-6 w-px bg-gray-500" />
              <nav className="flex space-x-4">
                <NavLink to="/" end>
                  <FaHome className="mr-2 inline-block" />
                  Lists
                </NavLink>
                <NavLink to="/about">
                  <FaInfoCircle className="mr-2 inline-block" />
                  About
                </NavLink>
              </nav>
            </div>
          </div>
        </header>
        
        <div className="flex flex-1">
          <TodoListSidebar 
            todoLists={todoLists}
            activeListId={activeListId}
            onSelectList={(id) => dispatch(selectList(id))}
            onAddList={(name) => dispatch(addList(name))}
            onEditList={(list) => {
              dispatch(startEditList(list));
              setEditText(list.name);
            }}
            onDeleteList={(id) => dispatch(deleteList(id))}
            isAboutPageActive={isAboutPage}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => dispatch(toggleSidebar())}
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
        `px-3 py-2 rounded-md transition-colors flex items-center text-sm font-medium ${
          isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`
      }
    >
      {children}
    </Link>
  );

  const handleAddTodo = (text, description) => {
    dispatch(addTodo({ text, description }));
  };

  const handleSave = () => {
    if (editingList) {
      dispatch(saveList({ id: editingList.id, name: editText }));
    } else if (editingTodo) {
      dispatch(saveTodo({
        id: editingTodo.id,
        text: editText,
        description: editDescription
      }));
    }
    setEditText('');
    setEditDescription('');
  };

  const activeList = todoLists.find(list => list.id === activeListId);

  const filteredTodos = activeList?.todos.filter(todo => {
    if (sortFilter === 'All') return true;
    if (sortFilter === 'Completed') return todo.completed;
    if (sortFilter === 'Incomplete') return !todo.completed;
    return true;
  }) || [];

  const TodoMainInterface = () => (
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
              toggleComplete={() => dispatch(toggleComplete(todo.id))}
              deleteTodo={() => dispatch(deleteTodo(todo.id))}
              onEdit={() => {
                dispatch(startEditTodo(todo));
                setEditText(todo.text);
                setEditDescription(todo.description);
              }}
            />
          ))
        ) : (
          <p className="text-gray-500">No todos available.</p>
        )}
      </ul>
    </main>
  );

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route 
            path="/" 
            element={<TodoMainInterface />} 
          />
        </Route>
      </Routes>

      <Modal 
        isOpen={!!editingList || !!editingTodo}
        onClose={() => {
          dispatch(startEditList(null));
          dispatch(startEditTodo(null));
        }}
        onSave={handleSave}
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
};

export default AppWrapper;