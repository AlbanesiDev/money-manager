import { useContext } from "react";
import { SyncModalContext, SyncModalContextType } from "../contexts";

const useSyncModal = (): SyncModalContextType => {
  const context = useContext(SyncModalContext);
  if (!context) {
    throw new Error("useSyncModal must be used within a SyncModalProvider");
  }
  return context;
};

export { useSyncModal };
