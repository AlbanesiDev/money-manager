import { createContext, ReactNode, useCallback, useState } from "react";

export interface SyncModalContextType {
  SyncModal: boolean;
  openSyncModal: () => void;
  closeSyncModal: () => void;
}

const SyncModalContext = createContext<SyncModalContextType | undefined>(undefined);

const SyncModalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [SyncModal, setSyncModal] = useState(false);

  const openSyncModal = useCallback(() => {
    setSyncModal(true);
  }, []);

  const closeSyncModal = useCallback(() => {
    setSyncModal(false);
  }, []);

  return (
    <SyncModalContext.Provider value={{ SyncModal, openSyncModal, closeSyncModal }}>
      {children}
    </SyncModalContext.Provider>
  );
};

export { SyncModalContext, SyncModalContextProvider };
