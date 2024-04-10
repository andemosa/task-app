import { createSlice } from "@reduxjs/toolkit";

import {
  LOGINMODAL,
  ModalDisplayType,
  PROFILEMODAL,
  REGISTERMODAL,
} from "@/utils/constants";

export interface ModalState {
  modalDisplay: ModalDisplayType;
  modalOpen: boolean;
}

const initialState: ModalState = {
  modalDisplay: LOGINMODAL,
  modalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.modalOpen = true;
      state.modalDisplay = LOGINMODAL;
    },
    openRegisterModal: (state) => {
      state.modalOpen = true;
      state.modalDisplay = REGISTERMODAL;
    },
    openProfileModal: (state) => {
      state.modalOpen = true;
      state.modalDisplay = PROFILEMODAL;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
  },
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectModalDisplay: (modal) => modal.modalDisplay,
    selectModalOpen: (modal) => modal.modalOpen,
  },
});

// Action creators are generated for each case reducer function
export const {
  openLoginModal,
  openRegisterModal,
  openProfileModal,
  closeModal,
} = modalSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectModalDisplay, selectModalOpen } = modalSlice.selectors;
