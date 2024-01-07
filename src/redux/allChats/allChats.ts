import { createSlice } from '@reduxjs/toolkit';

interface Chat {
  authorId: string;
  name: string;
  categoryId: string;
  languageId: string;
  id: string;
  type: string;
  creationDate: string;
}

interface ChatState {
  allChats: Chat[];
  searchingChats: Chat[];
  searchText: string;
}

const initialState: ChatState = {
  allChats: [],
  searchingChats: [],
  searchText: '',
};

const chatSlice = createSlice({
  name: 'allChats',
  initialState,
  reducers: {
    setAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    setFilteredChats: (state, action) => {
      state.searchingChats = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearSearchText: (state) => {
      state.searchText = '';
    },
  },
});

export const { setAllChats, setFilteredChats, setSearchText, clearSearchText } =
  chatSlice.actions;

export default chatSlice.reducer;
