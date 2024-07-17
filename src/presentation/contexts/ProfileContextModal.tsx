import { createContext, ReactNode, useCallback, useState } from "react";

export interface ProfileContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const value = {
    isModalOpen,
    openModal,
    closeModal,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export { ProfileContext, ProfileContextProvider };
