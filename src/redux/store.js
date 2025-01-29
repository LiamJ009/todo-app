// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import localStorageMiddleware from './localStorageMiddleware';

const loadPreloadedState = () => {
  try {
    const savedData = localStorage.getItem('todoAppData');
    return savedData ? { todos: JSON.parse(savedData) } : undefined;
  } catch (e) {
    return undefined;
  }
};

export default configureStore({
  reducer: {
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: loadPreloadedState()
});