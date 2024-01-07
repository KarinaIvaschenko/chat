import { createSlice } from '@reduxjs/toolkit';

type ModalsItem = {
  welcomeModal: boolean;
  createChatModal: boolean;
  newUserModal: boolean;
};

const initialStates: ModalsItem = {
  welcomeModal: false,
  createChatModal: false,
  newUserModal: false,
};

const modals = createSlice({
  name: 'modals',
  initialState: initialStates,
  reducers: {
    openWelcome(state) {
      state.welcomeModal = true;
    },
    closeWelcome(state) {
      state.welcomeModal = false;
    },
    openCreateChatModal(state) {
      state.createChatModal = true;
    },
    closeCreateChatModal(state) {
      state.createChatModal = false;
    },
    openNewUserModal(state) {
      state.newUserModal = true;
    },
    closeNewUserModal(state) {
      state.newUserModal = false;
    },
  },
});

export const {
  openWelcome,
  closeWelcome,
  openCreateChatModal,
  closeCreateChatModal,
  openNewUserModal,
  closeNewUserModal,
} = modals.actions;

export default modals.reducer;
