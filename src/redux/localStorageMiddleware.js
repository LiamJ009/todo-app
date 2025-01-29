// redux/localStorageMiddleware.js
const LOCAL_STORAGE_KEY = 'todoAppData';

const localStorageMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState().todos;
  
  // Only persist these specific properties
  const stateToSave = {
    todoLists: state.todoLists,
    activeListId: state.activeListId,
    isSidebarCollapsed: state.isSidebarCollapsed
  };
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  return result;
};

export default localStorageMiddleware;