import { createContext, ReactNode, useCallback, useState } from "react";

export interface ViewContextType {
  viewMode: boolean;
  toggleView: () => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

const ViewContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [viewMode, setView] = useState(false);

  const toggleView = useCallback(() => {
    setView((prevView) => !prevView);
  }, []);

  return <ViewContext.Provider value={{ viewMode, toggleView }}>{children}</ViewContext.Provider>;
};

export { ViewContext, ViewContextProvider };
