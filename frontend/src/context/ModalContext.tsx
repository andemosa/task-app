import { useState, useMemo } from "react";

import { ModalContext } from "./useModalContext";

import {
  LOGINMODAL,
  ModalDisplayType,
  PROFILEMODAL,
  REGISTERMODAL,
} from "@/utils/constants";

type PageProps = {
  children: React.ReactElement;
};

const ModalProvider = ({ children }: PageProps) => {
  const [modalDisplay, setDisplay] = useState<ModalDisplayType>(LOGINMODAL);
  const [modalOpen, setOpen] = useState(false);

  const openLoginModal = () => {
    setDisplay(LOGINMODAL);
    setOpen(true);
  };

  const openRegisterModal = () => {
    setDisplay(REGISTERMODAL);
    setOpen(true);
  };

  const openProfileModal = () => {
    setDisplay(PROFILEMODAL);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const value = useMemo(
    () => ({
      modalDisplay,
      modalOpen,
      openLoginModal,
      openRegisterModal,
      openProfileModal,
      closeModal,
    }),
    [modalDisplay, modalOpen]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
