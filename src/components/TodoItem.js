import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, onEdit }) {
  return (
    <div className={`flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md ${todo.completed ? 'bg-blue-100' : ''}`}>
      {/* Todo Text */}
      <div className="flex-1">
        <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.text}</h3>
        <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>{todo.description}</p>
      </div>

      {/* Inline container for actions */}
      <div className="flex items-center space-x-4">

        {/* Custom checkbox */}
        <div className="round">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            id={`checkbox-${todo.id}`}
            className="hidden"
          />
          <label
            htmlFor={`checkbox-${todo.id}`}
            className={`${
              todo.completed ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-600'
            } flex items-center justify-center w-7 h-7 rounded-full border-2 cursor-pointer transition-colors duration-200`}
          ></label>
        </div>


        {/* Edit button */}
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 mr-2"
        >
          ✎
        </button>

        

        {/* Cross icon */}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 text-2xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default TodoItem;