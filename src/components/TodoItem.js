import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className="flex items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{todo.text}</h3>
        <p className="text-sm text-gray-600">{todo.description}</p>
      </div>
      <div className="flex items-center ml-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="mr-2"
        />
        <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">
          &times;
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
