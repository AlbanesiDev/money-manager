import { useContext } from "react";
import { ProfileContext, ProfileContextType } from "../contexts";

const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a TransactionModalProvider");
  }
  return context;
};

export { useProfileContext };
