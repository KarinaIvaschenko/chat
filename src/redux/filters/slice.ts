import { createSlice } from '@reduxjs/toolkit';

interface Filters {
  active: boolean;
  currentLanguage: string;
  currentUpdate: string | null;
  hotOrNot: boolean;
  activeCategory: string;
}

const initialState: Filters = {
  active: false,
  currentLanguage: '64b29bb9a268b5150b670003',
  currentUpdate: 'First new',
  hotOrNot: false,
  activeCategory: '64eccc5d2519e44fdf531cf1',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
    // set as well chosen language that will be set during sign up, get it and set here
    setLanguages: (state, action) => {
      state.currentLanguage = action.payload;
    },
    setHotOrNot: (state, action) => {
      state.hotOrNot = action.payload;
    },
    toggleHotOrNot: (state) => {
      state.hotOrNot = !state.hotOrNot;
    },
    setUpdate: (state, action) => {
      state.currentUpdate = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    resetFilters: (state, action) => {
      // or upload to chosen language
      state.currentLanguage = '64b29bb9a268b5150b670003';
      state.hotOrNot = false;
      state.currentUpdate = null;
      state.active = action.payload;
      state.activeCategory = '64eccc5d2519e44fdf531cf1';
    },
  },
});

export const {
  setUpdate,
  setLanguages,
  setHotOrNot,
  toggleHotOrNot,
  setActive,
  setActiveCategory,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
