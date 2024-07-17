import React, { createContext, useState, useCallback, ReactNode } from "react";

export interface AuthContextType {
  isModalOpen: boolean;
  modalContent: ModalContent | null;
  titleModal: string;
  openSignInModal: () => void;
  openSignUpModal: () => void;
  openForgotPasswordModal: () => void;
  closeModal: () => void;
}

type ModalContent = "signIn" | "signUp" | "forgotPassword" | null;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProviderModal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [titleModal, setTitleModal] = useState("");

  const openSignInModal = useCallback(() => {
    setIsModalOpen(true);
    setModalContent("signIn");
    setTitleModal("Iniciar Sesión");
  }, []);

  const openSignUpModal = useCallback(() => {
    setIsModalOpen(true);
    setModalContent("signUp");
    setTitleModal("Crear Cuenta");
  }, []);

  const openForgotPasswordModal = useCallback(() => {
    setIsModalOpen(true);
    setModalContent("forgotPassword");
    setTitleModal("Olvidé mi contraseña");
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isModalOpen,
        modalContent,
        titleModal,
        openSignInModal,
        openSignUpModal,
        openForgotPasswordModal,
        closeModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProviderModal, AuthContext };
