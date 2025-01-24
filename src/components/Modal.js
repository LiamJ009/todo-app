import React from 'react';

function Modal({ isOpen, onClose, onSave, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Item</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700 text-xl">&times;</button>
        </div>
        <div>{children}</div>

        {/* Footer with buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={onSave} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
