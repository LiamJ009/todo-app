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
    <aside className={`bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-0 opacity-0 -translate-x-full' : 'w-64 opacity-100 translate-x-0'
    } ${isAboutPageActive ? 'opacity-50 pointer-events-none' : ''}`}>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Todo Lists</h2>
          <button
            onClick={onToggleCollapse}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? '→' : '←'}
          </button>
      </div>

      {!isCollapsed && (
        <>

          <ul className="space-y-2">
            {todoLists.map((list) => (
              <li
                key={list.id}
                onClick={() => onSelectList(list.id)}
                className={`p-2 cursor-pointer rounded flex justify-between items-center
                  ${activeListId === list.id ? "bg-gray-600" : "bg-gray-700"}
                  hover:bg-gray-600`}
              >
                <span>{list.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditList(list);
                    }}
                    className="text-blue-500 hover:text-blue-700 mr-2"
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
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmitNewList} className="mt-6">
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

          </>
      )}
    </aside>
  );
}

export default TodoListSidebar;