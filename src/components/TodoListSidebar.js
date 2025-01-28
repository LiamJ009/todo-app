import React from 'react';

function TodoListSidebar({ 
  todoLists, 
  activeListId, 
  onSelectList, 
  onAddList, 
  onEditList, 
  onDeleteList,
  isAboutPageActive
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
    <aside className={`bg-gray-800 text-white w-1/4 p-4 transition-opacity ${
      isAboutPageActive ? 'opacity-50 pointer-events-none' : ''
    }`}>
      <h2 className="text-lg font-semibold mb-4">Todo Lists</h2>
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
    </aside>
  );
}

export default TodoListSidebar;