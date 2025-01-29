import { createSlice } from '@reduxjs/toolkit';

// redux/todoSlice.js
const loadInitialState = () => {
    const savedData = localStorage.getItem('todoAppData');
    return savedData ? JSON.parse(savedData) : {
      todoLists: [],
      activeListId: null,
      isSidebarCollapsed: false,
      editingList: null,
      editingTodo: null
    };
  };
  
  const initialState = loadInitialState();

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // List actions
    // In todoSlice.js reducers
    addList: (state, action) => {
        const listName = action.payload.trim();
        if (!listName) return;
        
        const newList = {
        id: Date.now(),
        name: listName,
        todos: []
        };
        state.todoLists.push(newList);
        state.activeListId = newList.id;
    },
    selectList: (state, action) => {
      state.activeListId = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    startEditList: (state, action) => {
      state.editingList = action.payload;
    },
    saveList: (state, action) => {
      const list = state.todoLists.find(l => l.id === action.payload.id);
      if (list) list.name = action.payload.name;
      state.editingList = null;
    },
    deleteList: (state, action) => {
      state.todoLists = state.todoLists.filter(l => l.id !== action.payload);
      if (state.activeListId === action.payload) {
        state.activeListId = state.todoLists[0]?.id || null;
      }
    },

    // Todo actions
    addTodo: (state, action) => {
      const list = state.todoLists.find(l => l.id === state.activeListId);
      if (list) {
        list.todos.push({
          id: Date.now(),
          ...action.payload,
          completed: false
        });
      }
    },
    toggleComplete: (state, action) => {
      const list = state.todoLists.find(l => l.id === state.activeListId);
      const todo = list?.todos.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      const list = state.todoLists.find(l => l.id === state.activeListId);
      if (list) {
        list.todos = list.todos.filter(t => t.id !== action.payload);
      }
    },
    startEditTodo: (state, action) => {
      state.editingTodo = action.payload;
    },
    saveTodo: (state, action) => {
      const list = state.todoLists.find(l => l.id === state.activeListId);
      const todo = list?.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        todo.description = action.payload.description;
      }
      state.editingTodo = null;
    }
  }
});

export const {
  addList,
  selectList,
  toggleSidebar,
  startEditList,
  saveList,
  deleteList,
  addTodo,
  toggleComplete,
  deleteTodo,
  startEditTodo,
  saveTodo
} = todoSlice.actions;

export default todoSlice.reducer;