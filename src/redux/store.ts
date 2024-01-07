import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import user from './user/slice';
import modals from './modals/slice';
import chats from './chat/slice';
import size from './size/slice';
import languages from './languages/slice';
import categories from './categories/slice';
import allChats from './allChats/allChats';
import filters from './filters/slice';

export const store = configureStore({
  reducer: {
    user,
    modals,
    chats,
    size,
    languages,
    categories,
    allChats,
    filters,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
