import React, { useState } from 'react';

function TodoInputForm({ 
  activeListId, 
  onAddTodo 
}) {
  const [todoText, setTodoText] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Only add todo if both fields have content and a list is selected
    if (todoText.trim() && todoDescription.trim() && activeListId) {
      onAddTodo(todoText, todoDescription);
      
      // Reset form after submission
      setTodoText('');
      setTodoDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center space-x-4">
      <div className="flex-1">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="p-2 border rounded w-full mb-0"
          placeholder="Enter a new todo"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          className="p-2 border rounded w-full mb-0"
          placeholder="Enter a description"
        />
      </div>
      <button
        type="submit"
        className={`p-2 bg-blue-500 text-white rounded h-10 ${!activeListId ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!activeListId}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoInputForm;