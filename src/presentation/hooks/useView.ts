import { useContext } from "react";
import { ViewContext, ViewContextType } from "../contexts";

const useView = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within an ViewProvider");
  }
  return context;
};

export { useView };
