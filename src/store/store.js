import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import langReducer from './slices/langugeSlice';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    lang: langReducer,
  },
});