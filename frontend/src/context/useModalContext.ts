import { createContext, useContext } from "react";

import { ModalDisplayType } from "@/utils/constants";

type ModalContextType = {
  modalDisplay: ModalDisplayType;
  modalOpen: boolean;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  openProfileModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      `useModalContext can only be used inside a ModalContextProvider`
    );
  }

  return context;
};
