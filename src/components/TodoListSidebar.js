import React from 'react';

function TodoListSidebar({ 
  todoLists, 
  activeListId, 
  onSelectList, 
  onAddList, 
  onEditList, 
  onDeleteList,
  isAboutPageActive,
  isCollapsed,
  onToggleCollapse,
}) {
  const [newListName, setNewListName] = React.useState('');

  const handleSubmitNewList = (event) => {
    event.preventDefault();
    if (newListName.trim()) {
      onAddList(newListName);
      setNewListName('');
    }
  };

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-12' : 'w-64'
    } ${isAboutPageActive ? 'opacity-50 pointer-events-none' : ''} flex flex-col`}>
      
      {/* Header with toggle button */}
      <div className={`p-2 flex ${isCollapsed ? 'justify-center' : 'justify-between items-center'}`}>
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Todo Lists</h2>
        )}
        <button
          onClick={onToggleCollapse}
          className="text-gray-400 hover:text-white transition-colors text-xl"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Content area */}
      <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <ul className="space-y-2 px-2">
          {todoLists.map((list) => (
            <li
              key={list.id}
              onClick={() => onSelectList(list.id)}
              className={`p-2 cursor-pointer rounded flex justify-between items-center
                ${activeListId === list.id ? "bg-gray-600" : "bg-gray-700"}
                hover:bg-gray-600`}
            >
              <span className="truncate">{list.name}</span>
              {!isCollapsed && (
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditList(list);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ✎
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteList(list.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        
        {!isCollapsed && (
          <form onSubmit={handleSubmitNewList} className="mt-4 px-2">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New list"
              className="p-2 w-full rounded bg-gray-700 text-white mb-2"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Add List
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}

export default TodoListSidebar;