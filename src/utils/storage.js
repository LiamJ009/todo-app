export const validateTodoData = (data) => {
    try {
      if (!data || typeof data !== 'object') return false;
      
      // Validate version
      if (data.version !== 1) return false;
      
      // Validate todoLists structure
      if (!Array.isArray(data.todoLists)) return false;
      const validLists = data.todoLists.every(list => 
        typeof list?.id === 'number' &&
        typeof list?.name === 'string' &&
        Array.isArray(list?.todos)
      );
      
      // Validate activeListId
      const validActiveId = typeof data.activeListId === 'number' || 
                           data.activeListId === null;
      
      // Validate sidebar state
      const validSidebar = typeof data.isSidebarCollapsed === 'boolean';
  
      return validLists && validActiveId && validSidebar;
    } catch {
      return false;
    }
  };