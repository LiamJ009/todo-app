import './App.css';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header with bg-gray-900 */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-semibold text-gray-100">Todo App</h1>
      </header>

      <div className="flex flex-1">
        {/* Sidebar with bg-gray-800 */}
        <aside className="bg-gray-800 text-white w-1/4 p-4">
          <h2>Sidebar</h2>
        </aside>

        {/* Todo List Area with White Background */}
        <main className="flex-1 p-4 bg-white text-black">
          <h2>Todo List</h2>
        </main>
      </div>
    </div>
  );
}

export default App;
